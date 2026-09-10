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

export interface Passagem {
  tipo: "onibus" | "metro";
  nome: string;
  custoPontos: number;
  valorReais: number;
  icone: string;
}