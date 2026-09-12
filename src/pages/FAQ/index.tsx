import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { categoriasFaq, perguntasFrequentes } from "@/data/conteudo";
import { useTituloPagina } from "@/hooks/useTituloPagina";
import { ItemFaq } from "./components/ItemFaq";

type Categoria = (typeof categoriasFaq)[number];

export default function FAQ() {
  useTituloPagina("Perguntas Frequentes");

  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria>("Todas");
  const [abertaId, setAbertaId] = useState<number | null>(null);

  const listaFiltrada =
    categoriaAtiva === "Todas"
      ? perguntasFrequentes
      : perguntasFrequentes.filter((item) => item.categoria === categoriaAtiva);

  /** Clicar na pergunta ja aberta fecha o acordeao. */
  function alternar(id: number) {
    setAbertaId((atual) => (atual === id ? null : id));
  }

  return (
    <>
      <section className="pb-10 pt-12 sm:pt-20">
        <Container>
          <Badge>FAQ</Badge>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Perguntas frequentes
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            Reunimos as dúvidas mais comuns sobre a plataforma, a conversão de pontos
            e o impacto ambiental do projeto.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {categoriasFaq.map((categoria) => {
              const ativa = categoria === categoriaAtiva;

              return (
                <button
                  key={categoria}
                  type="button"
                  onClick={() => {
                    setCategoriaAtiva(categoria);
                    setAbertaId(null);
                  }}
                  aria-pressed={ativa}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                    ativa
                      ? "border-neon-400/60 bg-neon-400/10 text-neon-300"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {categoria}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-20">
        <Container>
          <div className="space-y-3">
            {listaFiltrada.map((item) => (
              <ItemFaq
                key={item.id}
                item={item}
                aberta={abertaId === item.id}
                aoAlternar={() => alternar(item.id)}
              />
            ))}
          </div>

          <Card className="mt-10 flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Não encontrou o que procurava?
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Envie sua dúvida direto para a equipe do projeto.
              </p>
            </div>
            <LinkButton to="/contato" className="shrink-0">
              Falar com a equipe
            </LinkButton>
          </Card>
        </Container>
      </section>
    </>
  );
}
