import { http } from "./api";
import type { PassagemApi, ResgateApi } from "@/types";

const PASSAGENS_MOCK: PassagemApi[] = [
  { id: 1, idTransporte: 1, codigo: "PASS-METRO-01", valor: 4.40, status: "Disponível" },
  { id: 2, idTransporte: 2, codigo: "PASS-TREM-02", valor: 4.40, status: "Disponível" },
  { id: 3, idTransporte: 3, codigo: "PASS-BUS-03", valor: 3.80, status: "Disponível" },
  { id: 4, idTransporte: 4, codigo: "PASS-BIKE-04", valor: 0.00, status: "Disponível" },
];

const RESGATES_MOCK: ResgateApi[] = [
  { id: 1, idCartao: 101, idPassagem: 1, dataResgate: "01/03/2026" },
];

export const passagemService = {
  async listar(status?: string): Promise<PassagemApi[]> {
    try {
      const endpoint = status ? `/passagens?status=${encodeURIComponent(status)}` : "/passagens";
      return await http<PassagemApi[]>(endpoint);
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
      return await http<ResgateApi[]>("/resgates");
    } catch {
      return RESGATES_MOCK;
    }
  },

  async realizarResgate(dados: { idCartao: number; idPassagem: number; dataResgate: string }): Promise<ResgateApi> {
    try {
      return await http<ResgateApi>("/resgates", {
        method: "POST",
        body: JSON.stringify(dados),
      });
    } catch {
      const novo: ResgateApi = {
        id: Date.now(),
        idCartao: dados.idCartao,
        idPassagem: dados.idPassagem,
        dataResgate: dados.dataResgate,
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