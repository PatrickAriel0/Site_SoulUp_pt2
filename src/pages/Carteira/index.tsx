import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { usuarioService } from "@/services/usuarioService";
import { passagemService, resgateService } from "@/services/resgateService";
import type { UsuarioApi, CartaoPontosApi, PassagemApi, ResgateApi, StatusRequisicao } from "@/types";
import { useTituloPagina } from "@/hooks/useTituloPagina";

export default function CarteiraApi() {
  useTituloPagina("Carteira & Resgates Conectados | SoulUp");

  const [usuarios, setUsuarios] = useState<UsuarioApi[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioApi | null>(null);
  const [cartao, setCartao] = useState<CartaoPontosApi | null>(null);
  const [passagens, setPassagens] = useState<PassagemApi[]>([]);
  const [resgates, setResgates] = useState<ResgateApi[]>([]);

  const [status, setStatus] = useState<StatusRequisicao>("loading");
  const [operacaoStatus, setOperacaoStatus] = useState<string | null>(null);

  // Form novo usuário (POST /usuarios)
  const [mostrarNovoUser, setMostrarNovoUser] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [salvandoUser, setSalvandoUser] = useState(false);

  async function carregarDadosIniciais() {
    setStatus("loading");
    try {
      const [listaUsers, listaPassagens, listaResgates] = await Promise.all([
        usuarioService.listar(),
        passagemService.listar(),
        resgateService.listar(),
      ]);

      setUsuarios(listaUsers);
      setPassagens(listaPassagens);
      setResgates(listaResgates);

      if (listaUsers.length > 0) {
        const primeiro = listaUsers[0];
        setUsuarioSelecionado(primeiro);
        const card = await usuarioService.buscarCartao(primeiro.id);
        setCartao(card);
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  async function handleSelecionarUsuario(u: UsuarioApi) {
    setUsuarioSelecionado(u);
    try {
      const card = await usuarioService.buscarCartao(u.id);
      setCartao(card);
    } catch {
      setCartao(null);
    }
  }

  async function handleCadastrarUsuario(e: React.FormEvent) {
    e.preventDefault();
    setSalvandoUser(true);
    try {
      const novo = await usuarioService.cadastrar({
        nome: nome.trim(),
        email: email.trim(),
        cpf: cpf.trim(),
      });

      setUsuarios((prev) => [...prev, novo]);
      setUsuarioSelecionado(novo);
      const card = await usuarioService.buscarCartao(novo.id);
      setCartao(card);

      setMostrarNovoUser(false);
      setNome("");
      setEmail("");
      setCpf("");
      setOperacaoStatus(`Usuário ${novo.nome} criado com sucesso e bilhete ativado!`);
      setTimeout(() => setOperacaoStatus(null), 4000);
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Erro ao cadastrar usuário: ${error.message}`);
    } finally {
      setSalvandoUser(false);
    }
  }

  async function handleResgatar(passagem: PassagemApi) {
    if (!cartao) {
      alert("Selecione um usuário com bilhete ativo para resgatar.");
      return;
    }

    const pontosNecessarios = passagem.valorEmPontos ?? (passagem.valor ? Math.round(passagem.valor * 25) : 100);
    if ((cartao.saldoPontos || 0) < pontosNecessarios) {
      alert(`Saldo insuficiente! O bilhete possui ${cartao.saldoPontos} pontos e são necessários ${pontosNecessarios} pontos.`);
      return;
    }

    try {
      const hoje = new Date().toLocaleDateString("pt-BR");
      const novoResgate = await resgateService.realizarResgate({
        numeroCartao: cartao.numeroCartao,
        passagemId: passagem.id,
        dataResgate: hoje,
      });

      setResgates((prev) => [novoResgate, ...prev]);
      // Atualiza saldo localmente
      setCartao((prev) => prev ? { ...prev, saldoPontos: Math.max(0, prev.saldoPontos - pontosNecessarios) } : null);

      const identificador = passagem.origem && passagem.destino
        ? `${passagem.origem} → ${passagem.destino}`
        : (passagem.codigo || `Passagem #${passagem.id}`);

      setOperacaoStatus(`Passagem "${identificador}" resgatada com sucesso utilizando ${pontosNecessarios} pontos!`);
      setTimeout(() => setOperacaoStatus(null), 4000);
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Falha no resgate: ${error.message}`);
    }
  }

  async function handleCancelarResgate(id: number, pontosDevolvidos: number = 100) {
    try {
      await resgateService.cancelarResgate(id);
      setResgates((prev) => prev.filter((r) => r.id !== id));
      setCartao((prev) => prev ? { ...prev, saldoPontos: prev.saldoPontos + pontosDevolvidos } : null);
      setOperacaoStatus(`Resgate #${id} cancelado e ${pontosDevolvidos} pontos estornados.`);
      setTimeout(() => setOperacaoStatus(null), 4000);
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Falha ao cancelar: ${error.message}`);
    }
  }

  if (status === "loading") {
    return (
      <div className="py-12 bg-slate-900/60 min-h-screen">
        <Container>
          <PageSkeleton />
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-900/60 min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Badge cor="eco">Operações HTTP: GET, POST, DELETE</Badge>
            <SectionTitle
              titulo="Carteira & Resgate de Benefícios"
              subtitulo="Simulação conectada aos endpoints Java de Usuários, Cartão de Pontos e Resgates"
            />
          </div>
          <Button variante="primaria" onClick={() => setMostrarNovoUser(true)}>
            + Novo Usuário
          </Button>
        </div>

        {operacaoStatus && (
          <div className="mb-6 p-4 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 rounded-xl">
            {operacaoStatus}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Card do Usuário e Saldo */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h3 className="text-base font-bold text-white mb-3">Usuário Ativo</h3>
              <div className="space-y-2 mb-4">
                <label className="text-xs text-slate-400 font-semibold uppercase">
                  Selecione o Usuário
                </label>
                <select
                  value={usuarioSelecionado?.id || ""}
                  onChange={(e) => {
                    const u = usuarios.find((user) => user.id === Number(e.target.value));
                    if (u) handleSelecionarUsuario(u);
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
                >
                  {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nome} ({u.cpf})
                    </option>
                  ))}
                </select>
              </div>

              {usuarioSelecionado && (
                <div className="pt-4 border-t border-white/10 text-sm space-y-1 text-slate-300">
                  <p>
                    <span className="font-semibold text-white">E-mail:</span>{" "}
                    {usuarioSelecionado.email}
                  </p>
                  <p>
                    <span className="font-semibold text-white">CPF:</span>{" "}
                    {usuarioSelecionado.cpf}
                  </p>
                </div>
              )}
            </Card>

            {/* Bilhete / Cartão */}
            <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl shadow-lg border border-emerald-400/30">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold">
                    Bilhete Integrado SoulUp
                  </span>
                  <p className="text-lg font-mono font-bold mt-1">
                    {cartao?.numeroCartao || "CP-000"}
                  </p>
                </div>
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <span className="text-xs text-emerald-100">Saldo Disponível</span>
                <p className="text-3xl font-black mt-1">{cartao?.saldoPontos || 0} pts</p>
              </div>
            </div>
          </div>

          {/* Passagens para Resgatar (POST) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Passagens Disponíveis para Resgate
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Endpoint <code>GET /passagens</code> conectado ao backend. Clique para resgatar via{" "}
                <code>POST /resgates</code>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {passagens.map((p) => {
                  const custoPontos = p.valorEmPontos ?? (p.valor ? Math.round(p.valor * 25) : 100);
                  const nomePassagem = p.origem && p.destino
                    ? `${p.origem} → ${p.destino}`
                    : (p.codigo || `Passagem #${p.id}`);
                  const modalNome = p.transporte?.nome || p.transporte?.tipo || "Transporte Público";

                  return (
                    <div
                      key={p.id}
                      className="p-4 border border-white/10 bg-white/5 rounded-xl hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-slate-300">
                            {p.codigo || `ID #${p.id}`}
                          </span>
                          <Badge cor="eco">{p.status}</Badge>
                        </div>
                        <h4 className="text-base font-bold text-white mb-1">{nomePassagem}</h4>
                        <p className="text-xs text-slate-400 mb-2">{modalNome}</p>
                        <p className="text-xl font-bold text-emerald-400">
                          {custoPontos} <span className="text-sm font-normal text-slate-300">pontos</span>
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                        <Button
                          variante="primaria"
                          tamanho="sm"
                          onClick={() => handleResgatar(p)}
                        >
                          Resgatar Bilhete
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Histórico de Resgates (DELETE) */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">Histórico de Resgates</h3>
              <p className="text-xs text-slate-400 mb-4">
                Permite cancelamento através do método <code>DELETE /resgates/:id</code>.
              </p>

              {resgates.length === 0 ? (
                <p className="text-sm text-slate-400 py-4 text-center">
                  Nenhum resgate efetuado até o momento.
                </p>
              ) : (
                <div className="divide-y divide-white/10">
                  {resgates.map((r) => {
                    const numeroCartao = r.cartaoPontos?.numeroCartao || r.idCartao || "CP";
                    const pontos = r.pontosUtilizados || 100;
                    const descricao = r.passagem?.origem && r.passagem?.destino
                      ? `${r.passagem.origem} → ${r.passagem.destino}`
                      : (r.passagem?.codigo || `Passagem #${r.idPassagem || r.id}`);

                    return (
                      <div key={r.id} className="py-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Resgate #{r.id} · Bilhete {numeroCartao}
                          </p>
                          <p className="text-xs text-slate-300">
                            {descricao} ({pontos} pts) · Data: {r.dataResgate}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCancelarResgate(r.id, pontos)}
                          className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                        >
                          Cancelar Resgate ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Modal Novo Usuário (POST) */}
        {mostrarNovoUser && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-white/15">
              <h3 className="text-xl font-bold text-white mb-2">Cadastrar Novo Usuário</h3>
              <p className="text-sm text-slate-400 mb-6">
                Envia requisição <code>POST /usuarios</code> para a API em Java.
              </p>

              <form onSubmit={handleCadastrarUsuario} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Carlos Oliveira"
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: carlos@email.com"
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CPF</label>
                  <input
                    type="text"
                    required
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Ex: 123.456.789-00"
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <Button
                    type="button"
                    variante="secundaria"
                    onClick={() => setMostrarNovoUser(false)}
                    disabled={salvandoUser}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variante="primaria" disabled={salvandoUser}>
                    {salvandoUser ? "Salvando..." : "Cadastrar"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}