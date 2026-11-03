import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { transporteService } from "@/services/transporteService";
import type { TransporteApi, StatusRequisicao } from "@/types";
import { useTituloPagina } from "@/hooks/useTituloPagina";
import { FiltroTransporte } from "./components/FiltroTransporte";
import { TransporteCard } from "./components/TransporteCard";
import { ModalNovoTransporte } from "./components/ModalNovoTransporte";
import { FeedbackEstado } from "./components/FeedbackEstado";

export default function Transportes() {
  useTituloPagina("Rede de Transportes Sustentáveis | SoulUp");

  const [transportes, setTransportes] = useState<TransporteApi[]>([]);
  const [status, setStatus] = useState<StatusRequisicao>("idle");
  const [erro, setErro] = useState<string | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  async function carregarTransportes() {
    setStatus("loading");
    setErro(null);
    try {
      const dados = await transporteService.listar();
      setTransportes(dados);
      setStatus("success");
    } catch (e: unknown) {
      const err = e as Error;
      setErro(err.message || "Erro ao carregar os transportes da API.");
      setStatus("error");
    }
  }

  useEffect(() => {
    carregarTransportes();
  }, []);

  async function handleCadastrar(dados: Omit<TransporteApi, "id">) {
    setSalvando(true);
    try {
      const criado = await transporteService.cadastrar(dados);
      setTransportes((prev) => [criado, ...prev]);
      setMensagemSucesso(`Transporte "${criado.nome}" cadastrado com sucesso!`);
      setMostrarModal(false);
      setTimeout(() => setMensagemSucesso(null), 5000);
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Erro: ${error.message}`);
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir(id: number, nome: string) {
    if (!confirm(`Remover "${nome}"?`)) return;
    try {
      await transporteService.deletar(id);
      setTransportes((prev) => prev.filter((t) => t.id !== id));
      setMensagemSucesso(`Transporte removido com sucesso.`);
      setTimeout(() => setMensagemSucesso(null), 4000);
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Falha ao excluir: ${error.message}`);
    }
  }

  const transportesFiltrados =
    filtroTipo === "todos"
      ? transportes
      : transportes.filter((t) => t.tipo.toLowerCase() === filtroTipo.toLowerCase());

  return (
    <div className="py-12 bg-slate-900/60 min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Badge cor="eco">Integração API Java DDD</Badge>
            <SectionTitle
              titulo="Rede de Transportes Conectada"
              subtitulo="Consumo em tempo real dos endpoints REST desenvolvidos em Spring Boot"
            />
          </div>
          <div className="flex gap-3">
            <Button variante="secundaria" onClick={carregarTransportes}>
              Recarregar API
            </Button>
            <Button variante="primaria" onClick={() => setMostrarModal(true)}>
              + Cadastrar Transporte
            </Button>
          </div>
        </div>

        {mensagemSucesso && (
          <div className="mb-6 p-4 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 rounded-xl flex items-center justify-between">
            <span>{mensagemSucesso}</span>
            <button onClick={() => setMensagemSucesso(null)} className="text-emerald-400 font-bold">✕</button>
          </div>
        )}

        <FiltroTransporte filtroAtual={filtroTipo} onSelecionar={setFiltroTipo} />

        {status === "loading" && <PageSkeleton />}
        {status === "error" && <FeedbackEstado erro={erro} onTentarNovamente={carregarTransportes} />}
        {status === "success" && transportesFiltrados.length === 0 && (
          <FeedbackEstado erro={null} onTentarNovamente={carregarTransportes} />
        )}

        {status === "success" && transportesFiltrados.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transportesFiltrados.map((item) => (
              <TransporteCard key={item.id} item={item} onExcluir={handleExcluir} />
            ))}
          </div>
        )}

        <ModalNovoTransporte
          aberto={mostrarModal}
          onFechar={() => setMostrarModal(false)}
          onSalvar={handleCadastrar}
          salvando={salvando}
        />
      </Container>
    </div>
  );
}