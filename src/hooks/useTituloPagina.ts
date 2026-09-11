import { useEffect } from "react";

/**
 * Atualiza o title do documento a cada troca de rota.
 * Em uma SPA o navegador nao recarrega a pagina, entao o titulo
 * precisa ser ajustado manualmente a cada navegacao.
 */
export function useTituloPagina(titulo: string): void {
  useEffect(() => {
    document.title = `${titulo} | NepTune Labs & SoulUp`;
  }, [titulo]);
}
