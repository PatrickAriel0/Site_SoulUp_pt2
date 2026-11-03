interface InfoProps {
  id: string | undefined;
}

export function InfoTecnicaRota({ id }: InfoProps) {
  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8 space-y-3">
      <h3 className="text-sm font-bold text-white uppercase tracking-wide">
        Informações da Integração REST (DDD)
      </h3>
      <p className="text-sm text-slate-300 leading-relaxed">
        Este registro foi capturado através da rota dinâmica paramétrica{" "}
        <code className="bg-white/10 px-2 py-0.5 rounded border border-white/15 text-emerald-300 font-mono text-xs">
          /transportes/{id}
        </code>{" "}
        utilizando o hook <code>useParams</code> do React Router e consumido via requisição{" "}
        <code>GET /transportes/{id}</code> na API Java Spring Boot.
      </p>
    </div>
  );
}