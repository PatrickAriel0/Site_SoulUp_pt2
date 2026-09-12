import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { buscarModuloPorSlug, modulosSolucao } from "@/data/conteudo";
import { useTituloPagina } from "@/hooks/useTituloPagina";
import { CalculadoraImpacto } from "./components/CalculadoraImpacto";
import { CarteiraPontos } from "./components/CarteiraPontos";

/**
 * Rota dinamica /solucao/:slug.
 * O slug decide qual demonstracao interativa e renderizada abaixo do conteudo
 * descritivo do modulo.
 */
export default function SolucaoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const modulo = slug ? buscarModuloPorSlug(slug) : undefined;

  useTituloPagina(modulo ? modulo.nome : "Módulo não encontrado");

  if (!modulo) {
    return (
      <Container className="py-20">
        <Card className="mx-auto max-w-lg text-center">
          <p className="font-mono text-5xl text-neon-400">404</p>
          <h1 className="mt-4 text-xl font-bold text-white sm:text-2xl">
            Módulo não encontrado
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Não existe módulo com o endereço{" "}
            <span className="font-mono text-white">{slug}</span>.
          </p>
          <LinkButton to="/solucao" className="mt-6">
            Ver todos os módulos
          </LinkButton>
        </Card>
      </Container>
    );
  }

  const outrosModulos = modulosSolucao.filter((item) => item.slug !== modulo.slug);

  return (
    <Container className="py-12 sm:py-20">
      <Button
        variante="fantasma"
        tamanho="sm"
        onClick={() => navigate("/solucao")}
        className="mb-8 px-0"
      >
        ← Voltar para a solução
      </Button>

      <header className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-400/20 to-eco-400/20 text-2xl text-neon-300">
            {modulo.icone}
          </span>
          <Badge cor="eco">{modulo.destaque}</Badge>
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
          {modulo.nome}
        </h1>
        <p className="mt-3 text-lg text-neon-300">{modulo.chamada}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          {modulo.descricao}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-neon-400">
          O que este módulo entrega
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {modulo.recursos.map((recurso) => (
            <li
              key={recurso}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-neon-400 to-eco-400" />
              {recurso}
            </li>
          ))}
        </ul>
      </section>

      {/* Demonstracao interativa: o slug da rota decide o que aparece aqui */}
      <section className="mt-12">
        <h2 className="mb-5 text-xl font-bold text-white sm:text-2xl">
          Demonstração interativa
        </h2>

        {modulo.slug === "carteira-de-pontos" && <CarteiraPontos />}
        {modulo.slug === "calculadora-de-impacto" && <CalculadoraImpacto />}
        {modulo.slug === "integracao-bilhete-unico" && <IntegracaoBilhete />}
      </section>

      <section className="mt-14">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-neon-400">
          Outros módulos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {outrosModulos.map((outro) => (
            <Card key={outro.slug} comHover className="flex flex-col">
              <span className="text-2xl text-neon-300">{outro.icone}</span>
              <h3 className="mt-3 font-semibold text-white">{outro.nome}</h3>
              <p className="mt-1 flex-1 text-sm text-slate-400">{outro.chamada}</p>
              <Button
                variante="secundaria"
                tamanho="sm"
                onClick={() => navigate(`/solucao/${outro.slug}`)}
                className="mt-4 self-start"
              >
                Abrir
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}

/** Painel estatico que ilustra a etapa de integracao com o Bilhete Unico. */
function IntegracaoBilhete() {
  const etapas = [
    {
      titulo: "Sincronização do perfil",
      texto: "A plataforma consulta o saldo de pontos vinculado ao perfil SoulUp.",
      estado: "Concluído",
    },
    {
      titulo: "Validação da operação",
      texto:
        "Cada conversão gera um registro interno para monitoramento e auditoria.",
      estado: "Concluído",
    },
    {
      titulo: "Envio para a rede de recarga",
      texto:
        "O saldo é transmitido aos postos e validadores de ônibus, metrô e terminais.",
      estado: "Em processamento",
    },
    {
      titulo: "Confirmação na catraca",
      texto:
        "Ao aproximar o cartão de um validador, a recarga é confirmada e a viagem liberada.",
      estado: "Aguardando",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {etapas.map((etapa, indice) => (
        <Card key={etapa.titulo}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-500">
              0{indice + 1}
            </span>
            <Badge cor={etapa.estado === "Concluído" ? "eco" : "neutra"}>
              {etapa.estado}
            </Badge>
          </div>
          <h3 className="mt-3 font-semibold text-white">{etapa.titulo}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            {etapa.texto}
          </p>
        </Card>
      ))}
    </div>
  );
}
