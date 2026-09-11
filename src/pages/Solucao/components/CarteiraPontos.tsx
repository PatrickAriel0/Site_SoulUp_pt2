import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { passagens, useCarteiraPontos } from "@/hooks/useCarteiraPontos";
import { formatarNumero, formatarReal } from "@/utils/formatadores";

/**
 * Simulador da carteira SoulUp. Toda a regra vive no hook useCarteiraPontos;
 * aqui fica apenas a interface e o estado do proprio campo de digitacao.
 */
export function CarteiraPontos() {
  const {
    saldoPontos,
    saldoReais,
    historico,
    mensagem,
    adicionarPontos,
    comprarPassagem,
    limparCarteira,
  } = useCarteiraPontos();

  const [entrada, setEntrada] = useState<string>("");

  function aoAdicionar() {
    adicionarPontos(Number(entrada));
    setEntrada("");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <Card className="bg-gradient-to-br from-abyss-950/80 to-ink-800/80">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neon-400">
            Carteira SoulUp
          </span>
          <span className="flex items-center gap-1.5 text-xs text-eco-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-eco-400" />
            Sincronizada
          </span>
        </div>

        <div className="py-6">
          <p className="text-xs text-slate-500">Saldo disponível</p>
          <p className="mt-1 font-mono text-3xl font-bold text-white sm:text-4xl">
            {formatarNumero(saldoPontos)}{" "}
            <span className="text-base font-normal text-slate-500">pontos</span>
          </p>
          <p className="mt-1 font-mono text-sm text-eco-300">
            = {formatarReal(saldoReais)}
          </p>
        </div>

        <div>
          <label
            htmlFor="pontos-entrada"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Adicionar pontos ganhos com ações sustentáveis
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="pontos-entrada"
              type="number"
              min={1}
              inputMode="numeric"
              value={entrada}
              onChange={(evento) => setEntrada(evento.target.value)}
              onKeyDown={(evento) => {
                if (evento.key === "Enter") aoAdicionar();
              }}
              placeholder="Ex: 500"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-neon-400/50"
            />
            <Button onClick={aoAdicionar} className="sm:w-auto">
              Adicionar
            </Button>
          </div>

          <p className="mt-2 font-mono text-xs text-slate-500">
            Taxa de conversão: 100 pontos = R$ 1,00
          </p>
        </div>

        {mensagem && (
          <p
            role="status"
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
              mensagem.sucesso
                ? "border-eco-400/30 bg-eco-500/10 text-eco-300"
                : "border-red-400/30 bg-red-500/10 text-red-300"
            }`}
          >
            {mensagem.texto}
          </p>
        )}
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white">
          Converter em passagem
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Escolha a modalidade e envie o crédito para o Bilhete Único.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {passagens.map((passagem) => {
            const temSaldo = saldoPontos >= passagem.custoPontos;

            return (
              <button
                key={passagem.tipo}
                type="button"
                onClick={() => comprarPassagem(passagem)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  temSaldo
                    ? "border-eco-400/30 bg-eco-500/5 hover:-translate-y-0.5 hover:border-eco-400/60"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-2xl">{passagem.icone}</span>
                <p className="mt-2 font-medium text-white">{passagem.nome}</p>
                <p className="mt-1 font-mono text-xs text-slate-400">
                  {passagem.custoPontos} pts ={" "}
                  {formatarReal(passagem.valorReais)}
                </p>
                <p
                  className={`mt-2 text-xs ${
                    temSaldo ? "text-eco-300" : "text-slate-500"
                  }`}
                >
                  {temSaldo
                    ? "Saldo suficiente"
                    : `Faltam ${passagem.custoPontos - saldoPontos} pts`}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-neon-400">
            Últimas movimentações
          </h4>

          {historico.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              Nenhuma movimentação nesta sessão.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {historico.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-2 text-sm text-slate-400"
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      item.sucesso ? "bg-eco-400" : "bg-red-400"
                    }`}
                  />
                  {item.texto}
                </li>
              ))}
            </ul>
          )}
        </div>

        {saldoPontos > 0 && (
          <Button
            variante="fantasma"
            tamanho="sm"
            onClick={limparCarteira}
            className="mt-5 px-0"
          >
            Limpar carteira
          </Button>
        )}
      </Card>
    </div>
  );
}
