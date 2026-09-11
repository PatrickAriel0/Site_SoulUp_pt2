import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { ResultadoImpacto, TipoVeiculo } from "@/types";
import { ROTULOS_VEICULO, calcularImpacto } from "@/utils/calculoImpacto";
import { formatarKg, formatarNumero, formatarReal } from "@/utils/formatadores";

/** Dados do formulario da calculadora, tipados e reaproveitados no submit. */
interface FormularioImpacto {
  distancia: number;
  diasUteis: number;
  tipoCarro: TipoVeiculo;
  consumo: number;
  precoCombustivel: number;
}

const TIPOS_VEICULO = Object.keys(ROTULOS_VEICULO) as TipoVeiculo[];

export function CalculadoraImpacto() {
  const [resultado, setResultado] = useState<ResultadoImpacto | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormularioImpacto>({
    defaultValues: {
      distancia: undefined,
      diasUteis: undefined,
      tipoCarro: "flex",
      consumo: undefined,
      precoCombustivel: undefined,
    },
  });

  function aoCalcular(dados: FormularioImpacto) {
    setResultado(calcularImpacto(dados));
  }

  function aoLimpar() {
    reset();
    setResultado(null);
  }

  /** Classe compartilhada pelos campos, com destaque visual quando ha erro. */
  const classeCampo = (temErro: boolean): string =>
    `w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors ${
      temErro
        ? "border-red-400/60 focus:border-red-400"
        : "border-white/10 focus:border-neon-400/50"
    }`;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <Card>
        <h3 className="text-lg font-semibold text-white">
          Seus hábitos de transporte
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Preencha os dados e veja o impacto real de trocar o carro pelo transporte
          público.
        </p>

        {/* noValidate desliga o balao nativo do navegador, que ignoraria
            as mensagens do React Hook Form. */}
        <form
          onSubmit={handleSubmit(aoCalcular)}
          noValidate
          className="mt-6 space-y-4"
        >
          <div>
            <label
              htmlFor="distancia"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Distância percorrida por dia (km)
            </label>
            <input
              id="distancia"
              type="number"
              step="0.1"
              placeholder="Ex: 30"
              aria-invalid={Boolean(errors.distancia)}
              aria-describedby={errors.distancia ? "erro-distancia" : undefined}
              className={classeCampo(Boolean(errors.distancia))}
              {...register("distancia", {
                required: "Informe a distância percorrida por dia.",
                valueAsNumber: true,
                min: { value: 0.1, message: "A distância precisa ser maior que zero." },
              })}
            />
            {errors.distancia && (
              <span
                id="erro-distancia"
                role="alert"
                className="mt-1.5 block text-xs text-red-400"
              >
                {errors.distancia.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="diasUteis"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Dias que usa o carro por mês
            </label>
            <input
              id="diasUteis"
              type="number"
              placeholder="Ex: 22"
              aria-invalid={Boolean(errors.diasUteis)}
              aria-describedby={errors.diasUteis ? "erro-dias" : undefined}
              className={classeCampo(Boolean(errors.diasUteis))}
              {...register("diasUteis", {
                required: "Informe quantos dias por mês você usa o carro.",
                valueAsNumber: true,
                min: { value: 1, message: "Informe ao menos 1 dia." },
                max: { value: 31, message: "O mês tem no máximo 31 dias." },
              })}
            />
            {errors.diasUteis && (
              <span
                id="erro-dias"
                role="alert"
                className="mt-1.5 block text-xs text-red-400"
              >
                {errors.diasUteis.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="tipoCarro"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Tipo do veículo
            </label>
            <select
              id="tipoCarro"
              className="w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-white transition-colors focus:border-neon-400/50"
              {...register("tipoCarro", { required: true })}
            >
              {TIPOS_VEICULO.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {ROTULOS_VEICULO[tipo]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="consumo"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Consumo médio (km/L)
            </label>
            <input
              id="consumo"
              type="number"
              step="0.1"
              placeholder="Ex: 12"
              aria-invalid={Boolean(errors.consumo)}
              aria-describedby={errors.consumo ? "erro-consumo" : undefined}
              className={classeCampo(Boolean(errors.consumo))}
              {...register("consumo", {
                required: "Informe o consumo médio do veículo.",
                valueAsNumber: true,
                min: { value: 0.1, message: "O consumo precisa ser maior que zero." },
              })}
            />
            {errors.consumo && (
              <span
                id="erro-consumo"
                role="alert"
                className="mt-1.5 block text-xs text-red-400"
              >
                {errors.consumo.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="precoCombustivel"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Preço do combustível (R$/L)
            </label>
            <input
              id="precoCombustivel"
              type="number"
              step="0.01"
              placeholder="Ex: 6.20"
              aria-invalid={Boolean(errors.precoCombustivel)}
              aria-describedby={errors.precoCombustivel ? "erro-preco" : undefined}
              className={classeCampo(Boolean(errors.precoCombustivel))}
              {...register("precoCombustivel", {
                required: "Informe o preço do combustível.",
                valueAsNumber: true,
                min: { value: 0.01, message: "O preço precisa ser maior que zero." },
              })}
            />
            {errors.precoCombustivel && (
              <span
                id="erro-preco"
                role="alert"
                className="mt-1.5 block text-xs text-red-400"
              >
                {errors.precoCombustivel.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              Calcular impacto
            </Button>
            <Button type="button" variante="secundaria" onClick={aoLimpar}>
              Limpar
            </Button>
          </div>
        </form>
      </Card>

      <div>
        {resultado ? (
          <ResultadoImpactoPainel resultado={resultado} />
        ) : (
          <Card className="flex h-full flex-col items-center justify-center py-12 text-center">
            <span className="text-4xl">◉</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Preencha os campos ao lado para ver quanto de CO₂ e de dinheiro você
              deixa de gastar por mês.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

interface ResultadoImpactoPainelProps {
  resultado: ResultadoImpacto;
}

/** Painel de resultados. Recebe o calculo pronto por prop, sem estado proprio. */
function ResultadoImpactoPainel({ resultado }: ResultadoImpactoPainelProps) {
  const cards = [
    {
      icone: "🌿",
      titulo: "CO₂ evitado por mês",
      valor: formatarKg(resultado.co2Mes),
      descricao: `Você percorre cerca de ${formatarNumero(resultado.kmMes)} km por mês de carro. Trocando pelo transporte público, deixaria de emitir essa quantidade de CO₂.`,
      percentual: Math.min((resultado.co2Mes / 300) * 100, 100),
    },
    {
      icone: "💰",
      titulo: "Economia por mês",
      valor: formatarReal(resultado.gastoMes),
      descricao:
        "Apenas com combustível. Esse valor não inclui estacionamento, manutenção nem seguro.",
      percentual: Math.min((resultado.gastoMes / 1500) * 100, 100),
    },
    {
      icone: "🌳",
      titulo: "Equivalente em árvores",
      valor: `${formatarNumero(resultado.arvores)} árvores`,
      descricao:
        "O CO₂ economizado equivale ao que essa quantidade de árvores adultas absorve em um mês.",
      percentual: Math.min((resultado.arvores / 15) * 100, 100),
    },
    {
      icone: "📅",
      titulo: "Economia anual estimada",
      valor: formatarReal(resultado.economiaAnual),
      descricao: "Projeção da economia acumulada em doze meses de uso.",
      percentual: 100,
    },
  ];

  return (
    <div className="animate-fade-up space-y-4">
      {cards.map((card) => (
        <Card key={card.titulo}>
          <div className="flex items-start gap-4">
            <span className="text-2xl">{card.icone}</span>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-400">{card.titulo}</p>
              <p className="mt-0.5 bg-gradient-to-r from-neon-300 to-eco-300 bg-clip-text font-mono text-xl font-bold text-transparent sm:text-2xl">
                {card.valor}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {card.descricao}
              </p>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full animate-grow-bar rounded-full bg-gradient-to-r from-neon-400 to-eco-400"
                  style={{ width: `${card.percentual}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
