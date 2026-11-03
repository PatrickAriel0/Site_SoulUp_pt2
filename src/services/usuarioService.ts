import { http, ApiError } from "./api";
import type { UsuarioApi, CartaoPontosApi, UsuarioComCartao } from "@/types";

const USUARIOS_MOCK: UsuarioApi[] = [
  { id: 1, nome: "Patrick Ariel", email: "patrick@soulup.org", cpf: "123.456.789-01", dataCadastro: "2026-03-01" },
  { id: 2, nome: "Mariana Souza", email: "mariana.souza@gmail.com", cpf: "987.654.321-09", dataCadastro: "2026-03-05" },
];

const CARTOES_MOCK: Record<number, CartaoPontosApi> = {
  1: { id: 101, idUsuario: 1, numeroCartao: "CP-1", saldoPontos: 320 },
  2: { id: 102, idUsuario: 2, numeroCartao: "CP-2", saldoPontos: 150 },
};

export const usuarioService = {
  async listar(): Promise<UsuarioApi[]> {
    try {
      return await http<UsuarioApi[]>("/usuarios");
    } catch {
      return USUARIOS_MOCK;
    }
  },

  async buscarPorId(id: number): Promise<UsuarioApi> {
    try {
      return await http<UsuarioApi>(`/usuarios/${id}`);
    } catch {
      const u = USUARIOS_MOCK.find((item) => item.id === id);
      if (u) return u;
      throw new ApiError("Usuário não encontrado", 404);
    }
  },

  async buscarCartao(idUsuario: number): Promise<CartaoPontosApi> {
    try {
      return await http<CartaoPontosApi>(`/usuarios/${idUsuario}/cartao`);
    } catch {
      return CARTOES_MOCK[idUsuario] || {
        id: idUsuario + 100,
        idUsuario,
        numeroCartao: `CP-${idUsuario}`,
        saldoPontos: 0,
      };
    }
  },

  async buscarComCartao(idUsuario: number): Promise<UsuarioComCartao> {
    const usuario = await this.buscarPorId(idUsuario);
    const cartao = await this.buscarCartao(idUsuario);
    return { ...usuario, cartao };
  },

  async cadastrar(dados: Omit<UsuarioApi, "id">): Promise<UsuarioApi> {
    try {
      return await http<UsuarioApi>("/usuarios", {
        method: "POST",
        body: JSON.stringify(dados),
      });
    } catch {
      const novo: UsuarioApi = {
        id: Date.now(),
        ...dados,
        dataCadastro: new Date().toISOString().split("T")[0],
      };
      USUARIOS_MOCK.push(novo);
      CARTOES_MOCK[novo.id] = {
        id: novo.id + 100,
        idUsuario: novo.id,
        numeroCartao: `CP-${novo.id}`,
        saldoPontos: 0,
      };
      return novo;
    }
  },

  async deletar(id: number): Promise<void> {
    try {
      await http<void>(`/usuarios/${id}`, { method: "DELETE" });
    } catch {
      const idx = USUARIOS_MOCK.findIndex((u) => u.id === id);
      if (idx !== -1) USUARIOS_MOCK.splice(idx, 1);
    }
  },
};