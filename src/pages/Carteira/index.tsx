import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { usuarioService } from "@/services/usuarioService";
import { passagemService, resgateService } from "@/services/resgateService";
import type { UsuarioApi, CartaoPontosApi, PassagemApi, ResgateApi, StatusRequisicao } from "@/types";
import { useTituloPagina } from "@/hooks/useTituloPagina";
import { CardUsuario } from "./components/CardUsuario";
import { ListaPassagens } from "./components/ListaPassagens";
import { HistoricoResgates } from "./components/HistoricoResgates";
import { ModalNovoUsuario } from "./components/ModalNovoUsuario";

export default function CarteiraApi() {
  useTituloPagina("Carteira & Resgates Conectados | SoulUp");

  const [usuarios, setUsuarios] = useState<UsuarioApi[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioApi | null>(null);
  const [cartao, setCartao] = useState<CartaoPontosApi | null>(null);
  const [passagens, setPassagens] = useState<PassagemApi[]>([]);
  const [resgates, setResgates] = useState<ResgateApi[]>([]);

  const [status, setStatus] = useState<StatusRequisicao>("loading");
  const [operacaoStatus, setOperacaoStatus] = useState<string | null>(null);
  const [mostrarNovoUser, setMostrarNovoUser] = useState(false);
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

  async function handleCadastrarUsuario(dados: Omit<UsuarioApi, "id">) {
    setSalvandoUser(true);
    try {
      const novo = await usuarioService.cadastrar(dados);
      setUsuarios((prev) => [...prev, novo]);
      setUsuarioSelecionado(novo);
      const card = await usuarioService.buscarCartao(novo.id);
      setCartao(card);
      setMostrarNovoUser(false);
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
    if (!cartao) return;
    try {
      const hoje = new Date().toLocaleDateString("pt-BR");
      const novoResgate = await resgateService.realizarResgate({
        idCartao: cartao.id,
        idPassagem: passagem.id,
        dataResgate: hoje,
      });

      setResgates((prev) => [novoResgate, ...prev]);
      setOperacaoStatus(`Passagem ${passagem.codigo} resgatada com sucesso!`);
      setTimeout(() => setOperacaoStatus(null), 4000);
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Falha no resgate: ${error.message}`);
    }
  }

  async function handleCancelarResgate(id: number) {
    try {
      await resgateService.cancelarResgate(id);
      setResgates((prev) => prev.filter((r) => r.id !== id));
      setOperacaoStatus(`Resgate #${id} cancelado e pontos estornados.`);
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
          <div className="lg:col-span-1">
            <CardUsuario
              usuarios={usuarios}
              usuarioSelecionado={usuarioSelecionado}
              cartao={cartao}
              onSelecionar={handleSelecionarUsuario}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <ListaPassagens passagens={passagens} onResgatar={handleResgatar} />
            <HistoricoResgates resgates={resgates} onCancelar={handleCancelarResgate} />
          </div>
        </div>

        <ModalNovoUsuario
          aberto={mostrarNovoUser}
          onFechar={() => setMostrarNovoUser(false)}
          onSalvar={handleCadastrarUsuario}
          salvando={salvandoUser}
        />
      </Container>
    </div>
  );
}