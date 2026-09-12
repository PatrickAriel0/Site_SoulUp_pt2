import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatCard } from "@/components/ui/StatCard";
import { indicadores } from "@/data/conteudo";
import { useTituloPagina } from "@/hooks/useTituloPagina";
import { CarteiraPontos } from "@/pages/Solucao/components/CarteiraPontos";

interface Pilar {
  titulo: string;
  texto: string;
  icone: string;
}

const PILARES: Pilar[] = [
  {
    titulo: "Nossa missão",
    icone: "◆",
    texto:
      "Transformar hábitos verdes em passagens gratuitas, aliviando o bolso do cidadão e o meio ambiente ao mesmo tempo. A NepTune Labs é um grupo de desenvolvedores comprometidos com soluções tecnológicas de impacto social.",
  },
  {
    titulo: "Nossa visão",
    icone: "◇",
    texto:
      "Ser a principal plataforma de incentivo ao transporte público no Brasil, integrando sustentabilidade, tecnologia e acessibilidade financeira em uma única solução acessível para todos.",
  },
  {
    titulo: "Nossos valores",
    icone: "◈",
    texto:
      "Transparência, inovação, responsabilidade ambiental e compromisso com o impacto social positivo. Acreditamos que tecnologia e sustentabilidade devem caminhar juntas.",
  },
  {
    titulo: "Nosso impacto",
    icone: "◉",
    texto:
      "A meta é beneficiar ao menos 50.000 usuários e evitar a emissão de 1 milhão de toneladas de CO₂, reduzindo congestionamentos e poluição nas cidades brasileiras.",
  },
];

export default function Sobre() {
  useTituloPagina("Sobre o Projeto");

  return (
    <>
      <section className="pb-12 pt-12 sm:pt-20">
        <Container>
          <Badge>Sobre</Badge>
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Uma ponte entre ações ecológicas e mobilidade urbana
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            A NepTune Labs desenvolveu, em parceria com a SoulUp, uma plataforma
            integrada que permite ao usuário converter pontos acumulados por ações
            ecológicas do dia a dia em saldo real no Bilhete Único.
          </p>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {PILARES.map((pilar) => (
              <Card key={pilar.titulo} comHover>
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neon-400/20 to-eco-400/20 text-xl text-neon-300">
                  {pilar.icone}
                </span>
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  {pilar.titulo}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {pilar.texto}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <SectionTitle
            etiqueta="Números"
            titulo="O impacto pretendido"
            centralizado
          />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {indicadores.map((indicador) => (
              <StatCard key={indicador.rotulo} indicador={indicador} />
            ))}
          </div>
        </Container>
      </section>

      {/* A carteira e o mesmo componente usado na pagina da Solucao:
          escrito uma vez, reaproveitado em duas rotas diferentes. */}
      <section className="py-10 sm:py-14">
        <Container>
          <SectionTitle
            etiqueta="Demonstração"
            titulo="Simule sua carteira de pontos"
            subtitulo="Adicione pontos e veja como funciona a conversão para saldo de transporte público."
          />
          <CarteiraPontos />
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <Card className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Quer ver a plataforma funcionando?
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Explore os três módulos que compõem a solução.
              </p>
            </div>
            <LinkButton to="/solucao" tamanho="md" className="shrink-0">
              Ver a solução
            </LinkButton>
          </Card>
        </Container>
      </section>
    </>
  );
}
