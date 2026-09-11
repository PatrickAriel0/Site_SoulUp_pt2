import { Card } from "@/components/ui/Card";
import type { EtapaProcesso } from "@/types";

interface EtapaCardProps {
  etapa: EtapaProcesso;
}

/*Cartao de uma etapa do processo de resgate.*/

export function EtapaCard({ etapa }: EtapaCardProps) {
  return (
    <Card comHover className="relative">
      <span className="absolute -top-3 left-5 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-400 to-eco-500 font-mono text-sm font-bold text-ink-900">
        {etapa.numero}
      </span>

      <h3 className="mt-4 text-base font-semibold leading-snug text-white">
        {etapa.titulo}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {etapa.descricao}
      </p>
    </Card>
  );
}
