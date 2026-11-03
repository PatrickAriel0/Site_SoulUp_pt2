import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import type { TransporteApi } from "@/types";

interface TransporteCardProps {
  item: TransporteApi;
  onExcluir: (id: number, nome: string) => void;
}

export function TransporteCard({ item, onExcluir }: TransporteCardProps) {
  return (
    <Card className="p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white/10 text-slate-200">
            {item.tipo}
          </span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
            ID: #{item.id}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{item.nome}</h3>
        <div className="space-y-1 text-sm text-slate-300 mb-6">
          <p>
            Recompensa:{" "}
            <span className="font-semibold text-emerald-400">
              +{item.valorPontos} pontos
            </span>
          </p>
          <p>
            Emissão:{" "}
            <span className="font-semibold text-slate-200">
              {item.taxaCarbono} kg CO₂/km
            </span>
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <Link
          to={`/transportes/${item.id}`}
          className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
        >
          Ver Detalhes →
        </Link>
        <button
          onClick={() => onExcluir(item.id, item.nome)}
          className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
        >
          Remover
        </button>
      </div>
    </Card>
  );
}