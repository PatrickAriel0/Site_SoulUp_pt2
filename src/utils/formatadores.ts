/** Formata um numero como moeda brasileira. */
export function formatarReal(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Formata massa de CO2: acima de 1000 kg passa a exibir em toneladas. */
export function formatarKg(valor: number): string {
  if (valor >= 1000) {
    return `${(valor / 1000).toFixed(2)} toneladas`;
  }
  return `${Math.round(valor)} kg`;
}

/** Formata um numero com separador de milhar. */
export function formatarNumero(valor: number): string {
  return Math.round(valor).toLocaleString("pt-BR");
}
