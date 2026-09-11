import type { ReactNode } from "react";

type Cor = "neon" | "eco" | "neutra";

const CORES: Record<Cor, string> = {
  neon: "border-neon-400/30 bg-neon-400/10 text-neon-300",
  eco: "border-eco-400/30 bg-eco-400/10 text-eco-300",
  neutra: "border-white/15 bg-white/5 text-slate-300",
};

interface BadgeProps {
  children: ReactNode;
  cor?: Cor;
  className?: string;
}

export function Badge({ children, cor = "neon", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${CORES[cor]} ${className}`}
    >
      {children}
    </span>
  );
}
