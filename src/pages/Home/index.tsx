import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatCard } from "@/components/ui/StatCard";
import { etapasProcesso, indicadores, modulosSolucao } from "@/data/conteudo";
import { useTituloPagina } from "@/hooks/useTituloPagina";
import { EtapaCard } from "./components/EtapaCard";
import { HeroVisual } from "./components/HeroVisual";

export default function Home() {
  useTituloPagina("Mobilidade Urbana Sustentável");

  return (
    <>
      {/* Hero */}
      <section className="relative pb-16 pt-12 sm:pb-24 sm:pt-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up">
              <Badge cor="eco">
                <span className="h-1.5 w-1.5 rounded-full bg-eco-400" />
                Mobilidade urbana sustentável
              </Badge>

              <h1 className="mt-6 text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                Transforme suas ações{" "}
                <span className="bg-gradient-to-r from-neon-300 via-neon-400 to-eco-400 bg-clip-text text-transparent">
                  sustentáveis
                </span>{" "}
                em passagens
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                A NepTune Labs, em parceria com a SoulUp, converte os pontos que você
                acumula com hábitos ecológicos em saldo real no Bilhete Único. Menos
                carro na rua, menos CO₂ no ar e mais dinheiro no seu bolso.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LinkButton to="/solucao" tamanho="lg">
                  Conhecer a solução
                </LinkButton>
                <LinkButton to="/solucao/calculadora-de-impacto" variante="secundaria" tamanho="lg">
                  Calcular meu impacto
                </LinkButton>
              </div>
            </div>

            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* Indicadores */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {indicadores.map((indicador) => (
              <StatCard key={indicador.rotulo} indicador={indicador} />
            ))}
          </div>
        </Container>
      </section>

      {/* Problema e solucao */}
      <section className="py-12 sm:py-20">
        <Container>
          <SectionTitle
            etiqueta="O contexto"
            titulo="O problema dos transportes"
            subtitulo="O transporte individual é um dos principais emissores de carbono do planeta. A pergunta é: existe saída que seja viável para o bolso e correta para o meio ambiente?"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-red-400/20 bg-red-500/[0.04]">
              <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                O desafio global das emissões
              </h3>
              <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                Existe pelo menos 1 bilhão de veículos em circulação no mundo. Esse
                fluxo imenso de automóveis particulares gera congestionamentos
                severos, poluição sonora, degradação da qualidade do ar e acelera as
                mudanças climáticas. Retirar os transportes de circulação não é uma
                opção realista para o funcionamento das cidades.
              </p>
            </Card>

            <Card className="border-eco-400/20 bg-eco-500/[0.04]">
              <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                Sustentabilidade recompensada
              </h3>
              <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                A solução de impacto imediato é estimular o uso do transporte público
                em lugar do carro particular. A SoulUp já permite usar os pontos de
                ações ecológicas para abater a conta de energia. A plataforma da
                NepTune Labs estende essa vantagem para a mobilidade urbana: os pontos
                viram saldo real no Bilhete Único.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Como funciona */}
      <section className="py-12 sm:py-20">
        <Container>
          <SectionTitle
            etiqueta="Passo a passo"
            titulo="Como funciona o resgate"
            subtitulo="Da ação sustentável até a catraca do ônibus e do metrô, em quatro etapas."
            centralizado
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {etapasProcesso.map((etapa) => (
              <EtapaCard key={etapa.numero} etapa={etapa} />
            ))}
          </div>
        </Container>
      </section>

      {/* Modulos */}
      <section className="py-12 sm:py-20">
        <Container>
          <SectionTitle
            etiqueta="A plataforma"
            titulo="Três módulos integrados"
            subtitulo="Cada módulo resolve uma parte do caminho entre o hábito sustentável e a passagem no bolso."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {modulosSolucao.map((modulo) => (
              <Card key={modulo.slug} comHover className="flex flex-col">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-400/20 to-eco-400/20 text-2xl text-neon-300">
                  {modulo.icone}
                </span>

                <h3 className="text-lg font-semibold text-white">{modulo.nome}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {modulo.chamada}
                </p>

                <LinkButton
                  to={`/solucao/${modulo.slug}`}
                  variante="fantasma"
                  tamanho="sm"
                  className="mt-4 self-start px-0 text-neon-300 hover:text-neon-200"
                >
                  Abrir módulo →
                </LinkButton>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Chamada final */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-abyss-950 via-abyss-900/60 to-ink-800 p-8 text-center sm:p-12 lg:p-16">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-grid-tech bg-grid opacity-30"
            />

            <div className="relative">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Impacto real para o cidadão e para a cidade
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                A proposta alivia o custo de transporte de trabalhadores e estudantes
                todos os meses e reduz a frota nas ruas, diminuindo a pegada de
                carbono urbana e ajudando a limpar o ar que respiramos.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <LinkButton to="/sobre" tamanho="lg">
                  Sobre o projeto
                </LinkButton>
                <LinkButton to="/contato" variante="secundaria" tamanho="lg">
                  Falar com a equipe
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
