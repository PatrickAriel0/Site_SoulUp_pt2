interface DetalheEmissaoProps {
  pontos: number;
  taxa: number;
}

export function CardEmissaoDetalhe({ pontos, taxa }: DetalheEmissaoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/20">
        <span className="text-xs font-semibold uppercase text-emerald-400">Recompensa em Pontos</span>
        <p className="text-3xl font-black text-emerald-300 mt-1">+{pontos} pts</p>
        <p className="text-xs text-emerald-400/80 mt-1">Creditados na sua carteira a cada validação</p>
      </div>

      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
        <span className="text-xs font-semibold uppercase text-slate-400">Fator de Emissão</span>
        <p className="text-3xl font-black text-white mt-1">
          {taxa} <span className="text-base font-normal">kg CO₂/km</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">Redução sustentável comparada a veículos individuais</p>
      </div>
    </div>
  );
}