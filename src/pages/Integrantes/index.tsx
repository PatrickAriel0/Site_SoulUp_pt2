import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { integrantes } from "@/data/integrantes";
import { useTituloPagina } from "@/hooks/useTituloPagina";
import { IntegranteCard } from "./components/IntegranteCard";

export default function Integrantes() {
  useTituloPagina("Integrantes");

  const [busca, setBusca] = useState<string>("");

  const termo = busca.trim().toLowerCase();
  const listaFiltrada = termo
    ? integrantes.filter(
        (integrante) =>
          integrante.nome.toLowerCase().includes(termo) ||
          integrante.rm.includes(termo) ||
          integrante.funcao.toLowerCase().includes(termo),
      )
    : integrantes;

  return (
    <>
      <section className="pb-10 pt-12 sm:pt-20">
        <Container>
          <Badge>Equipe</Badge>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Quem somos
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            Somos uma equipe dedicada ao desenvolvimento de soluções tecnológicas
            voltadas para inovação e mobilidade urbana. Trabalhamos de forma
            colaborativa em cada etapa do projeto, da prototipação à entrega.
          </p>

          <div className="mt-8 max-w-md">
            <label htmlFor="busca-integrante" className="sr-only">
              Buscar integrante
            </label>
            <input
              id="busca-integrante"
              type="search"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              placeholder="Buscar por nome, RM ou função..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-neon-400/50"
            />
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-20">
        <Container>
          {listaFiltrada.length === 0 ? (
            <Card className="text-center">
              <p className="text-sm text-slate-400">
                Nenhum integrante encontrado para{" "}
                <span className="font-medium text-white">“{busca}”</span>.
              </p>
            </Card>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {listaFiltrada.map((integrante) => (
                <IntegranteCard key={integrante.rm} integrante={integrante} />
              ))}
            </div>
          )}

          <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            {listaFiltrada.length} de {integrantes.length} integrantes — Turma 1TDSPK
          </p>
        </Container>
      </section>
    </>
  );
}
