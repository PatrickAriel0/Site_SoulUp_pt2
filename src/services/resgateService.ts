import { http } from "./api";
import type { PassagemApi, ResgateApi } from "@/types";

const PASSAGENS_MOCK: PassagemApi[] = [
  {
    id: 1,
    origem: "Estação Sé",
    destino: "Estação Tucuruvi",
    dataViagem: "10/12/2026",
    valorEmPontos: 100,
    status: "Disponível",
    transporte: {
      id: 1,
      tipo: "Metrô",
      nome: "Metrô Linha 1-Azul",
      valorPontos: 100,
      taxaCarbono: 0.03,
    },
  },
  {
    id: 2,
    origem: "Estação Osasco",
    destino: "Estação Pinheiros",
    dataViagem: "11/12/2026",
    valorEmPontos: 120,
    status: "Disponível",
    transporte: {
      id: 2,
      tipo: "Trem",
      nome: "CPTM Linha 9-Esmeralda",
      valorPontos: 120,
      taxaCarbono: 0.04,
    },
  },
  {
    id: 3,
    origem: "Terminal Lapa",
    destino: "Praça Ramos",
    dataViagem: "12/12/2026",
    valorEmPontos: 80,
    status: "Disponível",
    transporte: {
      id: 3,
      tipo: "Ônibus",
      nome: "Ônibus Elétrico Municipal",
      valorPontos: 80,
      taxaCarbono: 0.04,
    },
  },
  {
    id: 4,
    origem: "Ciclovia Faria Lima",
    destino: "Parque do Ibirapuera",
    dataViagem: "15/12/2026",
    valorEmPontos: 40,
    status: "Disponível",
    transporte: {
      id: 4,
      tipo: "Bicicleta",
      nome: "Bike Compartilhada",
      valorPontos: 40,
      taxaCarbono: 0.0,
    },
  },
];

const RESGATES_MOCK: ResgateApi[] = [
  {
    id: 1,
    dataResgate: "01/03/2026",
    pontosUtilizados: 100,
    cartaoPontos: {
      numeroCartao: "CP-1",
      saldoPontos: 220,
    },
    passagem: PASSAGENS_MOCK[0],
  },
];

export const passagemService = {
  async listar(status?: string): Promise<PassagemApi[]> {
    try {
      const endpoint = status ? `/passagens?status=${encodeURIComponent(status)}` : "/passagens";
      const dados = await http<PassagemApi[]>(endpoint);
      if (Array.isArray(dados) && dados.length > 0) {
        return dados;
      }
      return status ? PASSAGENS_MOCK.filter((p) => p.status === status) : PASSAGENS_MOCK;
    } catch {
      return status ? PASSAGENS_MOCK.filter((p) => p.status === status) : PASSAGENS_MOCK;
    }
  },

  async buscarPorId(id: number): Promise<PassagemApi> {
    return await http<PassagemApi>(`/passagens/${id}`);
  },

  async cadastrar(dados: Omit<PassagemApi, "id">): Promise<PassagemApi> {
    return await http<PassagemApi>("/passagens", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  },
};

export const resgateService = {
  async listar(): Promise<ResgateApi[]> {
    try {
      const dados = await http<ResgateApi[]>("/resgates");
      if (Array.isArray(dados) && dados.length > 0) {
        return dados;
      }
      return RESGATES_MOCK;
    } catch {
      return RESGATES_MOCK;
    }
  },

  async realizarResgate(dados: {
    numeroCartao: string;
    passagemId: number;
    dataResgate?: string;
  }): Promise<ResgateApi> {
    try {
      return await http<ResgateApi>("/resgates", {
        method: "POST",
        body: JSON.stringify({
          numeroCartao: dados.numeroCartao,
          passagemId: dados.passagemId,
          dataResgate: dados.dataResgate || new Date().toLocaleDateString("pt-BR"),
        }),
      });
    } catch {
      const novo: ResgateApi = {
        id: Date.now(),
        dataResgate: dados.dataResgate || new Date().toLocaleDateString("pt-BR"),
        pontosUtilizados: 100,
        cartaoPontos: {
          numeroCartao: dados.numeroCartao,
          saldoPontos: 0,
        },
      };
      RESGATES_MOCK.push(novo);
      return novo;
    }
  },

  async cancelarResgate(id: number): Promise<void> {
    try {
      await http<void>(`/resgates/${id}`, {
        method: "DELETE",
      });
    } catch {
      const idx = RESGATES_MOCK.findIndex((r) => r.id === id);
      if (idx !== -1) RESGATES_MOCK.splice(idx, 1);
    }
  },
};