import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { etapasProcesso, modulosSolucao } from "@/data/conteudo";
import { useTituloPagina } from "@/hooks/useTituloPagina";

export default function Solucao() {
  useTituloPagina("Solução do Projeto");

  return (
    <>
      <section className="pb-10 pt-12 sm:pt-20">
        <Container>
          <Badge>Solução</Badge>
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            A plataforma que converte sustentabilidade em mobilidade
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            Três módulos integrados cobrem todo o caminho: o acúmulo de pontos, a
            medição do impacto ambiental e a entrega do saldo na catraca. Escolha um
            módulo abaixo para abrir a demonstração.
          </p>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {modulosSolucao.map((modulo) => (
              <Card key={modulo.slug} comHover className="flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-400/20 to-eco-400/20 text-2xl text-neon-300">
                    {modulo.icone}
                  </span>
                  <Badge cor="eco">{modulo.destaque}</Badge>
                </div>

                <h2 className="mt-5 text-lg font-semibold text-white sm:text-xl">
                  {modulo.nome}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {modulo.chamada}
                </p>

                <ul className="mt-4 flex-1 space-y-2">
                  {modulo.recursos.slice(0, 3).map((recurso) => (
                    <li
                      key={recurso}
                      className="flex items-start gap-2 text-xs leading-relaxed text-slate-500"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neon-400" />
                      {recurso}
                    </li>
                  ))}
                </ul>

                <LinkButton
                  to={`/solucao/${modulo.slug}`}
                  tamanho="sm"
                  className="mt-5"
                >
                  Abrir módulo
                </LinkButton>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-16">
        <Container>
          <SectionTitle
            etiqueta="Fluxo completo"
            titulo="Do hábito verde até a catraca"
            centralizado
          />

          <ol className="relative space-y-4 border-l border-white/10 pl-6 sm:pl-8">
            {etapasProcesso.map((etapa) => (
              <li key={etapa.numero} className="relative">
                <span className="absolute -left-[34px] flex h-6 w-6 items-center justify-center rounded-full border border-neon-400/40 bg-ink-800 font-mono text-xs text-neon-300 sm:-left-[42px]">
                  {etapa.numero}
                </span>
                <Card>
                  <h3 className="text-base font-semibold text-white">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {etapa.descricao}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
