import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { transporteService } from "@/services/transporteService";
import type { TransporteApi, StatusRequisicao } from "@/types";
import { useTituloPagina } from "@/hooks/useTituloPagina";
import { CardEmissaoDetalhe } from "./components/CardEmissaoDetalhe";
import { InfoTecnicaRota } from "./components/InfoTecnicaRota";
import { FeedbackNaoEncontrado } from "./components/FeedbackNaoEncontrado";

export default function TransporteDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [transporte, setTransporte] = useState<TransporteApi | null>(null);
  const [status, setStatus] = useState<StatusRequisicao>("loading");
  const [erro, setErro] = useState<string | null>(null);

  useTituloPagina(
    transporte ? `${transporte.nome} | Detalhes SoulUp` : "Detalhes do Transporte | SoulUp"
  );

  useEffect(() => {
    async function carregarDetalhe() {
      if (!id || isNaN(Number(id))) {
        setErro("Identificador de transporte inválido na rota.");
        setStatus("error");
        return;
      }

      setStatus("loading");
      setErro(null);

      try {
        const item = await transporteService.buscarPorId(Number(id));
        setTransporte(item);
        setStatus("success");
      } catch (err: unknown) {
        const error = err as Error;
        setErro(error.message || `Transporte #${id} não encontrado na base da API.`);
        setStatus("error");
      }
    }

    carregarDetalhe();
  }, [id]);

  if (status === "loading") {
    return (
      <div className="py-12 bg-slate-900/60 min-h-screen">
        <Container>
          <PageSkeleton />
        </Container>
      </div>
    );
  }

  if (status === "error" || !transporte) {
    return <FeedbackNaoEncontrado erro={erro} />;
  }

  return (
    <div className="py-12 bg-slate-900/60 min-h-screen">
      <Container>
        <div className="mb-6">
          <Link
            to="/transportes"
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            ← Voltar para todos os transportes
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6 mb-6">
              <div>
                <Badge cor="eco">{transporte.tipo}</Badge>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  {transporte.nome}
                </h1>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                  Identificador
                </span>
                <span className="text-lg font-mono font-bold text-emerald-400">
                  ID: #{transporte.id}
                </span>
              </div>
            </div>

            <CardEmissaoDetalhe pontos={transporte.valorPontos} taxa={transporte.taxaCarbono} />
            <InfoTecnicaRota id={id} />

            <div className="flex justify-end gap-3">
              <Button variante="primaria" onClick={() => navigate("/solucao")}>
                Calcular Impacto no Simulador
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}