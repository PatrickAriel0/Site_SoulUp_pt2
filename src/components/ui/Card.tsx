import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  comHover?: boolean;
}


export function Card({ children, className = "", comHover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6 ${
        comHover
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-neon-400/40 hover:bg-white/[0.07]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
