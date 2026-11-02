export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://transporte-sustentavel-api.onrender.com";

export class ApiError extends Error {
  status: number;
  detalhe?: unknown;

  constructor(mensagem: string, status: number, detalhe?: unknown) {
    super(mensagem);
    this.name = "ApiError";
    this.status = status;
    this.detalhe = detalhe;
  }
}

export async function http<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, "")}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 204) {
      return null as unknown as T;
    }

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const body = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const mensagemErro =
        (typeof body === "object" && body !== null && (body as { mensagem?: string }).mensagem) ||
        (typeof body === "object" && body !== null && (body as { erro?: string }).erro) ||
        `Erro ${response.status}: falha na comunicação com a API.`;
      throw new ApiError(mensagemErro, response.status, body);
    }

    return body as T;
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof ApiError) {
      throw err;
    }

    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("Tempo limite de conexão excedido. A API pode estar iniciando no Render.", 408);
    }

    const error = err as Error;
    throw new ApiError(
      error.message || "Não foi possível conectar ao servidor da API.",
      500
    );
  }
}