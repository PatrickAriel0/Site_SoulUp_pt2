import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatarRmIntegrante } from "@/data/integrantes";
import type { Integrante } from "@/types";

interface IntegranteCardProps {
  integrante: Integrante;
}

/*Cartao de um integrante.*/

export function IntegranteCard({ integrante }: IntegranteCardProps) {
  const navigate = useNavigate();

  return (
    <Card comHover className="flex flex-col items-center text-center">
      <img
        src={integrante.foto}
        alt={`Foto de ${integrante.nome}`}
        loading="lazy"
        className="h-24 w-24 rounded-full border-2 border-neon-400/30 object-cover sm:h-28 sm:w-28"
      />

      <h3 className="mt-4 text-lg font-semibold text-white">{integrante.nome}</h3>
      <p className="mt-1 font-mono text-xs text-neon-400">
        {formatarRmIntegrante(integrante.rm)}
      </p>

      <Badge cor="neutra" className="mt-3">
        {integrante.funcao}
      </Badge>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {integrante.bio}
      </p>

      <div className="mt-5 flex w-full flex-col gap-2">
        <Button
          onClick={() => navigate(`/integrantes/${integrante.rm}`)}
          tamanho="sm"
          larguraTotal
        >
          Ver perfil completo
        </Button>

        <div className="flex gap-2">
          <a
            href={integrante.github}
            target="_blank"
            rel="noreferrer noopener"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-neon-400/40 hover:text-neon-300"
          >
            GitHub
          </a>
          <a
            href={integrante.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-neon-400/40 hover:text-neon-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </Card>
  );
}
