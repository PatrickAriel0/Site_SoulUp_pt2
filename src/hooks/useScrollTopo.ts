import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Leva a janela para o topo a cada mudanca de rota.
 * Sem isso a SPA mantem a posicao do scroll anterior e o usuario
 * cai no meio da pagina nova.
 */
export function useScrollTopo(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
}
