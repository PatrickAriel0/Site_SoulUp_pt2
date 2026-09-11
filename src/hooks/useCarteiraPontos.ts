import { useCallback, useEffect, useState } from "react";
import { passagens } from "@/data/conteudo";
import type { Passagem } from "@/types";

/** 100 pontos SoulUp equivalem a R$ 1,00 no Bilhete Unico. */
export const TAXA_CONVERSAO = 100;

export interface Movimentacao {
  id: number;
  texto: string;
  sucesso: boolean;
}

interface RetornoCarteira {
  saldoPontos: number;
  saldoReais: number;
  historico: Movimentacao[];
  mensagem: Movimentacao | null;
  adicionarPontos: (pontos: number) => void;
  comprarPassagem: (passagem: Passagem) => void;
  limparCarteira: () => void;
}

/**
 * Concentra a regra da carteira de pontos, migrada do sobre.js da Sprint 02.
 * Deixar o estado no hook permite que a pagina Sobre e a pagina da Solucao
 * usem a mesma logica sem duplicar codigo.
 */
export function useCarteiraPontos(): RetornoCarteira {
  const [saldoPontos, setSaldoPontos] = useState<number>(0);
  const [historico, setHistorico] = useState<Movimentacao[]>([]);
  const [mensagem, setMensagem] = useState<Movimentacao | null>(null);

  /**
   * A mensagem de retorno some sozinha depois de alguns segundos.
   * O timer e limpo no retorno do efeito para nao disparar em um
   * componente ja desmontado.
   */
  useEffect(() => {
    if (!mensagem) return;

    const timer = window.setTimeout(() => setMensagem(null), 4000);
    return () => window.clearTimeout(timer);
  }, [mensagem]);

  const registrar = useCallback((texto: string, sucesso: boolean) => {
    const movimentacao: Movimentacao = { id: Date.now(), texto, sucesso };
    setMensagem(movimentacao);
    setHistorico((anterior) => [movimentacao, ...anterior].slice(0, 5));
  }, []);

  const adicionarPontos = useCallback(
    (pontos: number) => {
      if (!Number.isFinite(pontos) || pontos <= 0) {
        registrar("Informe uma quantidade de pontos maior que zero.", false);
        return;
      }

      setSaldoPontos((anterior) => anterior + pontos);
      registrar(`${pontos} pontos adicionados à carteira.`, true);
    },
    [registrar],
  );

  const comprarPassagem = useCallback(
    (passagem: Passagem) => {
      if (saldoPontos < passagem.custoPontos) {
        const faltam = passagem.custoPontos - saldoPontos;
        registrar(
          `Saldo insuficiente. Faltam ${faltam} pontos para a passagem de ${passagem.nome.toLowerCase()}.`,
          false,
        );
        return;
      }

      setSaldoPontos((anterior) => anterior - passagem.custoPontos);
      registrar(
        `Passagem de ${passagem.nome.toLowerCase()} enviada para o Bilhete Único.`,
        true,
      );
    },
    [registrar, saldoPontos],
  );

  const limparCarteira = useCallback(() => {
    setSaldoPontos(0);
    setHistorico([]);
    setMensagem(null);
  }, []);

  return {
    saldoPontos,
    saldoReais: saldoPontos / TAXA_CONVERSAO,
    historico,
    mensagem,
    adicionarPontos,
    comprarPassagem,
    limparCarteira,
  };
}

/** Reexporta as modalidades para quem consome o hook. */
export { passagens };
