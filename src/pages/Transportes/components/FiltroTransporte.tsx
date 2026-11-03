interface FiltroProps {
  filtroAtual: string;
  onSelecionar: (tipo: string) => void;
}

const TIPOS = ["todos", "ônibus", "metrô", "trem", "bicicleta", "vlt"];

export function FiltroTransporte({ filtroAtual, onSelecionar }: FiltroProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {TIPOS.map((tipo) => (
        <button
          key={tipo}
          onClick={() => onSelecionar(tipo)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
            filtroAtual === tipo
              ? "bg-emerald-500 text-slate-950 shadow-sm font-bold"
              : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
          }`}
        >
          {tipo}
        </button>
      ))}
    </div>
  );
}