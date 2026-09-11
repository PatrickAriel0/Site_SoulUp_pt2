import type { ResultadoImpacto, TipoVeiculo } from "@/types";

export const EMISSAO_CO2: Record<TipoVeiculo, number> = {
  flex: 2.27,
  gasolina: 2.31,
  diesel: 2.68,
  moto: 2.2,
};

export const CO2_POR_ARVORE = 21;

export const ROTULOS_VEICULO: Record<TipoVeiculo, string> = {
  flex: "Carro Flex (gasolina/etanol)",
  gasolina: "Carro a Gasolina",
  diesel: "Carro a Diesel",
  moto: "Moto",
};

interface DadosImpacto {
  distancia: number;
  diasUteis: number;
  tipoCarro: TipoVeiculo;
  consumo: number;
  precoCombustivel: number;
}

export function calcularImpacto({
  distancia,
  diasUteis,
  tipoCarro,
  consumo,
  precoCombustivel,
}: DadosImpacto): ResultadoImpacto {
  const kmMes = distancia * diasUteis;
  const litrosMes = kmMes / consumo;
  const co2Mes = litrosMes * EMISSAO_CO2[tipoCarro];
  const gastoMes = litrosMes * precoCombustivel;

  return {
    kmMes,
    litrosMes,
    co2Mes,
    gastoMes,
    arvores: co2Mes / CO2_POR_ARVORE,
    economiaAnual: gastoMes * 12,
  };
}
