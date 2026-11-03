import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { PassagemApi } from "@/types";

interface ListaPassagensProps {
  passagens: PassagemApi[];
  onResgatar: (passagem: PassagemApi) => void;
}

export function ListaPassagens({ passagens, onResgatar }: ListaPassagensProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-white mb-2">Passagens Disponíveis para Resgate</h3>
      <p className="text-xs text-slate-400 mb-6">
        Endpoint <code>GET /passagens</code> conectado ao backend. Clique para resgatar via <code>POST /resgates</code>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {passagens.map((p) => (
          <div
            key={p.id}
            className="p-4 border border-white/10 bg-white/5 rounded-xl hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-300">{p.codigo}</span>
                <Badge cor="eco">{p.status}</Badge>
              </div>
              <p className="text-xl font-bold text-white">
                {p.valor > 0 ? `R$ ${p.valor.toFixed(2)}` : "Gratuito"}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
              <Button variante="primaria" tamanho="sm" onClick={() => onResgatar(p)}>
                Resgatar Bilhete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}