import { Card } from "@/components/ui/Card";
import type { ResgateApi } from "@/types";

interface HistoricoProps {
  resgates: ResgateApi[];
  onCancelar: (id: number) => void;
}

export function HistoricoResgates({ resgates, onCancelar }: HistoricoProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-white mb-2">Histórico de Resgates</h3>
      <p className="text-xs text-slate-400 mb-4">
        Permite cancelamento através do método <code>DELETE /resgates/:id</code>.
      </p>

      {resgates.length === 0 ? (
        <p className="text-sm text-slate-400 py-4 text-center">Nenhum resgate efetuado até o momento.</p>
      ) : (
        <div className="divide-y divide-white/10">
          {resgates.map((r) => (
            <div key={r.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Resgate #{r.id} · Cartão ID #{r.idCartao}</p>
                <p className="text-xs text-slate-400">Data: {r.dataResgate}</p>
              </div>
              <button
                onClick={() => onCancelar(r.id)}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
              >
                Cancelar Resgate ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}