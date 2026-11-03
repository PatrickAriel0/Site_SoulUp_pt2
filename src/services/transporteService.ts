import { http, ApiError } from "./api";
import type { TransporteApi } from "@/types";

const TRANSPORTES_MOCK: TransporteApi[] = [
  { id: 1, tipo: "Metrô", nome: "Linha 1-Azul (Jabaquara - Tucuruvi)", valorPontos: 120, taxaCarbono: 0.02 },
  { id: 2, tipo: "Trem", nome: "Linha 9-Esmeralda (Osasco - Bruno Covas)", valorPontos: 110, taxaCarbono: 0.03 },
  { id: 3, tipo: "Ônibus", nome: "Linha Elétrica 8000 (Lapa - Praça Ramos)", valorPontos: 90, taxaCarbono: 0.04 },
  { id: 4, tipo: "Bicicleta", nome: "Rede Cicloviária BikeSampa", valorPontos: 50, taxaCarbono: 0.0 },
  { id: 5, tipo: "VLT", nome: "VLT Linha Carioca Integrada", valorPontos: 80, taxaCarbono: 0.015 },
];

export const transporteService = {
  async listar(): Promise<TransporteApi[]> {
    try {
      return await http<TransporteApi[]>("/transportes");
    } catch {
      console.warn("API remota indisponível, usando fallback de transportes.");
      return TRANSPORTES_MOCK;
    }
  },

  async buscarPorId(id: number): Promise<TransporteApi> {
    try {
      return await http<TransporteApi>(`/transportes/${id}`);
    } catch {
      const encontrado = TRANSPORTES_MOCK.find((t) => t.id === id);
      if (encontrado) return encontrado;
      throw new ApiError("Transporte não encontrado", 404);
    }
  },

  async cadastrar(dados: Omit<TransporteApi, "id">): Promise<TransporteApi> {
    try {
      return await http<TransporteApi>("/transportes", {
        method: "POST",
        body: JSON.stringify(dados),
      });
    } catch {
      const novo: TransporteApi = { id: Date.now(), ...dados };
      TRANSPORTES_MOCK.push(novo);
      return novo;
    }
  },

  async atualizar(id: number, dados: Partial<TransporteApi>): Promise<TransporteApi> {
    return await http<TransporteApi>(`/transportes/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  },

  async deletar(id: number): Promise<void> {
    try {
      await http<void>(`/transportes/${id}`, { method: "DELETE" });
    } catch {
      const idx = TRANSPORTES_MOCK.findIndex((t) => t.id === id);
      if (idx !== -1) TRANSPORTES_MOCK.splice(idx, 1);
    }
  },
};