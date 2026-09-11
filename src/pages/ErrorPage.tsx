import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

/**
 * Tela exibida quando uma rota lanca erro. Sem ela o React Router mostra
 * a pagina de erro padrao, sem a identidade visual do projeto.
 */
export default function ErrorPage() {
  const erro = useRouteError();

  const descricao = isRouteErrorResponse(erro)
    ? `${erro.status} — ${erro.statusText}`
    : "Ocorreu um erro inesperado na aplicação.";

  return (
    <div className="flex min-h-screen items-center bg-ink-900">
      <Container>
        <Card className="mx-auto max-w-lg text-center">
          <p className="font-mono text-5xl text-neon-400">Ops</p>
          <h1 className="mt-4 text-xl font-bold text-white sm:text-2xl">
            Algo deu errado
          </h1>
          <p className="mt-3 font-mono text-sm text-slate-400">{descricao}</p>
          <LinkButton to="/" className="mt-6">
            Voltar ao início
          </LinkButton>
        </Card>
      </Container>
    </div>
  );
}
