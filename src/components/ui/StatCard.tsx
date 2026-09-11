import type { Indicador } from "@/types";
import { Card } from "./Card";

interface StatCardProps {
  indicador: Indicador;
}


export function StatCard({ indicador }: StatCardProps) {
  return (
    <Card comHover className="text-center">
      <p className="bg-gradient-to-r from-neon-300 to-eco-300 bg-clip-text font-mono text-2xl font-bold text-transparent sm:text-3xl">
        {indicador.valor}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{indicador.rotulo}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">
        {indicador.detalhe}
      </p>
    </Card>
  );
}
