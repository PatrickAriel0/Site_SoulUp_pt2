import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variante = "primaria" | "secundaria" | "fantasma";
type Tamanho = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTES: Record<Variante, string> = {
  primaria:
    "bg-gradient-to-r from-neon-500 to-eco-500 text-ink-900 font-semibold shadow-lg shadow-neon-500/20 hover:shadow-neon-500/40 hover:brightness-110",
  secundaria:
    "border border-neon-400/40 bg-white/5 text-neon-300 hover:border-neon-400 hover:bg-neon-400/10",
  fantasma: "text-slate-300 hover:bg-white/5 hover:text-white",
};

const TAMANHOS: Record<Tamanho, string> = {
  sm: "px-3 py-1.5 text-xs sm:px-4 sm:text-sm",
  md: "px-4 py-2.5 text-sm sm:px-6 sm:text-base",
  lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: Variante;
  tamanho?: Tamanho;
  larguraTotal?: boolean;
}

export function Button({
  children,
  variante = "primaria",
  tamanho = "md",
  larguraTotal = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTES[variante]} ${TAMANHOS[tamanho]} ${
        larguraTotal ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps {
  children: ReactNode;
  to: string;
  variante?: Variante;
  tamanho?: Tamanho;
  className?: string;
}


export function LinkButton({
  children,
  to,
  variante = "primaria",
  tamanho = "md",
  className = "",
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={`${BASE} ${VARIANTES[variante]} ${TAMANHOS[tamanho]} ${className}`}
    >
      {children}
    </Link>
  );
}
