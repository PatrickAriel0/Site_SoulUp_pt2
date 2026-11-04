export interface Integrante {
  rm: string;
  nome: string;
  turma: string;
  funcao: string;
  bio: string;
  foto: string;
  github: string;
  linkedin: string;
  habilidades: string[];
}

export interface PerguntaFrequente {
  id: number;
  categoria: CategoriaFaq;
  pergunta: string;
  subtitulo: string;
  resposta: string;
}

export type CategoriaFaq = "Plataforma" | "Pontos" | "Segurança" | "Impacto";

export interface ModuloSolucao {
  slug: string;
  nome: string;
  chamada: string;
  descricao: string;
  icone: string;
  destaque: string;
  recursos: string[];
}

export interface EtapaProcesso {
  numero: number;
  titulo: string;
  descricao: string;
}

export interface Indicador {
  valor: string;
  rotulo: string;
  detalhe: string;
}

export type TipoVeiculo = "flex" | "gasolina" | "diesel" | "moto";

export interface ResultadoImpacto {
  kmMes: number;
  litrosMes: number;
  co2Mes: number;
  gastoMes: number;
  arvores: number;
  economiaAnual: number;
}

// ==========================================
// TIPOS DA API REST JAVA (DDD)
// ==========================================

export type TipoTransporte = "Ônibus" | "Metrô" | "Trem" | "Bicicleta" | "VLT" | "Caminhada";
export type StatusPassagem = "Disponível" | "Resgatada" | "Cancelada";
export type StatusRequisicao = "idle" | "loading" | "success" | "error";

// Union Types exigidos nos critérios
export type CategoriaEmissao = "Baixa" | "Média" | "Alta" | "Zero";

export interface UsuarioApi {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataCadastro?: string;
}

export interface TransporteApi {
  id: number;
  tipo: TipoTransporte;
  nome: string;
  valorPontos: number;
  taxaCarbono: number; // kg CO2/km
}

export interface CartaoPontosApi {
  numeroCartao: string;
  saldoPontos: number;
  dataValidade?: string;
  usuario?: UsuarioApi;
  id?: number;
  idUsuario?: number;
}

export interface PassagemApi {
  id: number;
  origem?: string;
  destino?: string;
  dataViagem?: string;
  transporte?: TransporteApi;
  valorEmPontos?: number;
  status: StatusPassagem | string;
  codigo?: string;
  valor?: number;
  idTransporte?: number;
}

export interface ResgateApi {
  id: number;
  dataResgate: string;
  pontosUtilizados?: number;
  cartaoPontos?: CartaoPontosApi;
  passagem?: PassagemApi;
  idCartao?: number | string;
  idPassagem?: number;
}

// Intersection Types exigidos nos critérios
export type PassagemComTransporte = PassagemApi & {
  transporte?: TransporteApi;
};

export type ResgateDetalhado = ResgateApi & {
  usuario?: UsuarioApi;
  passagem?: PassagemApi;
  transporte?: TransporteApi;
};

export type UsuarioComCartao = UsuarioApi & {
  cartao?: CartaoPontosApi;
};

export interface EstadoRequisicao<T> {
  dados: T | null;
  status: StatusRequisicao;
  erro: string | null;
}

export interface Passagem {
  tipo: "onibus" | "metro";
  nome: string;
  custoPontos: number;
  valorReais: number;
  icone: string;
}