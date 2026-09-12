import { Badge } from "@/components/ui/Badge";
import type { PerguntaFrequente } from "@/types";

interface ItemFaqProps {
  item: PerguntaFrequente;
  aberta: boolean;
  aoAlternar: () => void;
}

/**
 * Item do acordeao. O estado de aberto/fechado fica na pagina, nao aqui:
 * assim so uma pergunta pode ficar aberta por vez.
 */
export function ItemFaq({ item, aberta, aoAlternar }: ItemFaqProps) {
  const idResposta = `resposta-${item.id}`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors ${
        aberta
          ? "border-neon-400/40 bg-white/[0.07]"
          : "border-white/10 bg-white/5"
      }`}
    >
      <button
        type="button"
        onClick={aoAlternar}
        aria-expanded={aberta}
        aria-controls={idResposta}
        className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
      >
        <div className="min-w-0 flex-1">
          <Badge cor="neutra" className="mb-3">
            {item.categoria}
          </Badge>
          <h3 className="text-base font-semibold text-white sm:text-lg">
            {item.pergunta}
          </h3>
          <p className="mt-1 text-xs text-neon-400 sm:text-sm">{item.subtitulo}</p>
        </div>

        <span
          aria-hidden="true"
          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-neon-300 transition-transform duration-300 ${
            aberta ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* A altura maxima anima a abertura sem precisar medir o conteudo */}
      <div
        id={idResposta}
        className={`overflow-hidden transition-all duration-300 ${
          aberta ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="border-t border-white/10 px-5 py-5 text-sm leading-relaxed text-slate-400 sm:px-6">
          {item.resposta}
        </p>
      </div>
    </div>
  );
}
