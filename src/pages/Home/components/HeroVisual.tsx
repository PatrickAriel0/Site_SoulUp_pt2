/**
 * Painel ilustrativo do hero, nao carrega dado real.
 * Apenas representa a conversao de pontos em saldo de transporte.
 */
export function HeroVisual() {
  return (
    <div className="relative animate-fade-up" aria-hidden="true">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-500/20 to-eco-500/20 blur-3xl" />

      <div className="relative animate-float rounded-3xl border border-white/10 bg-ink-800/80 p-5 backdrop-blur-xl sm:p-7">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neon-400">
            Carteira SoulUp
          </span>
          <span className="flex items-center gap-1.5 text-xs text-eco-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-eco-400" />
            Sincronizada
          </span>
        </div>

        <div className="py-6">
          <p className="text-xs text-slate-500">Saldo disponível</p>
          <p className="mt-1 font-mono text-3xl font-bold text-white sm:text-4xl">
            2.480{" "}
            <span className="text-base font-normal text-slate-500">pontos</span>
          </p>
          <p className="mt-1 font-mono text-sm text-eco-300">= R$ 24,80</p>
        </div>

        <div className="space-y-3">
          {[
            { rotulo: "Ônibus", valor: "530 pts", icone: "🚌", pct: "72%" },
            { rotulo: "Metrô", valor: "540 pts", icone: "🚇", pct: "58%" },
          ].map((item) => (
            <div
              key={item.rotulo}
              className="rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <span>{item.icone}</span>
                  {item.rotulo}
                </span>
                <span className="font-mono text-xs text-neon-300">
                  {item.valor}
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full animate-grow-bar rounded-full bg-gradient-to-r from-neon-400 to-eco-400"
                  style={{ width: item.pct }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-eco-400/20 bg-eco-500/10 p-3 text-center">
          <p className="font-mono text-xs text-eco-300">
            CO₂ evitado no mês: 84 kg
          </p>
        </div>
      </div>
    </div>
  );
}
