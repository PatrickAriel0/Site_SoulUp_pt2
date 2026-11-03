import { Button } from "@/components/ui/Button";

interface FeedbackProps {
  erro: string | null;
  onTentarNovamente: () => void;
}

export function FeedbackEstado({ erro, onTentarNovamente }: FeedbackProps) {
  if (erro) {
    return (
      <div className="p-8 bg-rose-950/40 border border-rose-500/30 rounded-2xl text-center">
        <p className="text-rose-300 font-medium mb-3">{erro}</p>
        <p className="text-xs text-rose-400/80 mb-4">Verifique a conexão com a API no Render.</p>
        <Button variante="primaria" onClick={onTentarNovamente}>
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="p-12 text-center bg-white/5 rounded-2xl border border-white/10">
      <p className="text-slate-300 font-medium text-lg">Nenhum transporte encontrado.</p>
      <p className="text-sm text-slate-400 mt-1">Selecione outro filtro ou cadastre um novo transporte.</p>
    </div>
  );
}