import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { useScrollTopo } from "@/hooks/useScrollTopo";
import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * Casca da aplicacao. Header e Footer ficam fora do <Outlet />, entao nao
 * remontam a cada navegacao — o estado do menu e o scroll do header sobrevivem
 * a troca de pagina. Um unico <Suspense> aqui cobre todas as rotas lazy.
 */
export function AppLayout() {
  useScrollTopo();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Camada decorativa de fundo: grade tecnologica e brilhos */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-ink-900"
      >
        <div className="absolute inset-0 bg-grid-tech bg-grid opacity-40" />
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-abyss-600/30 blur-[120px] animate-pulse-glow" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-eco-500/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-neon-500/10 blur-[120px]" />
      </div>

      <Header />

      <main className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
