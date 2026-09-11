import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { buscarIntegrantePorRm, formatarRmIntegrante, integrantes } from "@/data/integrantes";
import { useTituloPagina } from "@/hooks/useTituloPagina";


export default function IntegranteDetalhe() {
  const { rm } = useParams<{ rm: string }>();
  const navigate = useNavigate();

  const integrante = rm ? buscarIntegrantePorRm(rm) : undefined;

  useTituloPagina(integrante ? integrante.nome : "Integrante não encontrado");

  if (!integrante) {
    return (
      <Container className="py-20">
        <Card className="mx-auto max-w-lg text-center">
          <p className="font-mono text-5xl text-neon-400">404</p>
          <h1 className="mt-4 text-xl font-bold text-white sm:text-2xl">
            Integrante não encontrado
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Não existe nenhum integrante com o identificador{" "}
            <span className="font-mono text-white">{rm}</span> na equipe.
          </p>
          <LinkButton to="/integrantes" className="mt-6">
            Voltar para a equipe
          </LinkButton>
        </Card>
      </Container>
    );
  }

  const indiceAtual = integrantes.findIndex((item) => item.rm === integrante.rm);
  const anterior = integrantes[indiceAtual - 1];
  const proximo = integrantes[indiceAtual + 1];

  return (
    <Container className="py-12 sm:py-20">
      <Button
        variante="fantasma"
        tamanho="sm"
        onClick={() => navigate("/integrantes")}
        className="mb-8 px-0"
      >
        ← Voltar para a equipe
      </Button>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit text-center">
          <img
            src={integrante.foto}
            alt={`Foto de ${integrante.nome}`}
            className="mx-auto h-36 w-36 rounded-2xl border-2 border-neon-400/30 object-cover sm:h-44 sm:w-44"
          />

          <h1 className="mt-5 text-xl font-bold text-white sm:text-2xl">
            {integrante.nome}
          </h1>
          <p className="mt-1 font-mono text-sm text-neon-400">
            {formatarRmIntegrante(integrante.rm)}
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
            Turma {integrante.turma}
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <a
              href={integrante.github}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-neon-400/40 hover:text-neon-300"
            >
              GitHub
            </a>
            <a
              href={integrante.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-neon-400/40 hover:text-neon-300"
            >
              LinkedIn
            </a>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <Badge cor="eco">{integrante.funcao}</Badge>
            <h2 className="mt-4 text-lg font-semibold text-white sm:text-xl">
              Atuação no projeto
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              {integrante.bio}
            </p>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Habilidades aplicadas
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {integrante.habilidades.map((habilidade) => (
                <li key={habilidade}>
                  <Badge cor="neutra">{habilidade}</Badge>
                </li>
              ))}
            </ul>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row">
            {anterior && (
              <Button
                variante="secundaria"
                onClick={() => navigate(`/integrantes/${anterior.rm}`)}
                className="flex-1"
              >
                ← {anterior.nome}
              </Button>
            )}
            {proximo && (
              <Button
                variante="secundaria"
                onClick={() => navigate(`/integrantes/${proximo.rm}`)}
                className="flex-1"
              >
                {proximo.nome} →
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
