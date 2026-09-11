interface SectionTitleProps {
  titulo: string;
  subtitulo?: string;
  etiqueta?: string;
  centralizado?: boolean;
}

/** Cabecalho padrao de secao, usado em todas as paginas do projeto. */
export function SectionTitle({
  titulo,
  subtitulo,
  etiqueta,
  centralizado = false,
}: SectionTitleProps) {
  return (
    <header className={`mb-8 sm:mb-12 ${centralizado ? "text-center" : ""}`}>
      {etiqueta && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-neon-400">
          {etiqueta}
        </p>
      )}

      <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
        {titulo}
      </h2>

      {subtitulo && (
        <p
          className={`mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base ${
            centralizado ? "mx-auto" : ""
          }`}
        >
          {subtitulo}
        </p>
      )}
    </header>
  );
}
