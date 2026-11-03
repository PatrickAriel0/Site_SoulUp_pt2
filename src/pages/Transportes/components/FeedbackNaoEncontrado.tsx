import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface FeedbackProps {
  erro: string | null;
}

export function FeedbackNaoEncontrado({ erro }: FeedbackProps) {
  const navigate = useNavigate();

  return (
    <div className="py-16 bg-slate-900/60 min-h-screen">
      <Container>
        <div className="max-w-md mx-auto p-8 bg-slate-900 border border-rose-500/30 rounded-2xl shadow-sm text-center">
          <span className="text-4xl mb-4 block"></span>
          <h2 className="text-xl font-bold text-white mb-2">Transporte não localizado</h2>
          <p className="text-sm text-slate-400 mb-6">{erro}</p>
          <div className="flex justify-center gap-3">
            <Button variante="secundaria" onClick={() => navigate("/transportes")}>
              Voltar à Lista
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}