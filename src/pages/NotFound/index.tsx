import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { useTituloPagina } from "@/hooks/useTituloPagina";

export default function NotFound() {
  useTituloPagina("Página não encontrada");

  return (
    <Container className="py-20 sm:py-28">
      <Card className="mx-auto max-w-lg text-center">
        <p className="bg-gradient-to-r from-neon-300 to-eco-300 bg-clip-text font-mono text-6xl font-bold text-transparent sm:text-7xl">
          404
        </p>

        <h1 className="mt-5 text-xl font-bold text-white sm:text-2xl">
          Página não encontrada
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          O endereço acessado não existe nesta aplicação. Use o menu para voltar à
          navegação normal.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton to="/">Voltar ao início</LinkButton>
          <LinkButton to="/solucao" variante="secundaria">
            Ver a solução
          </LinkButton>
        </div>
      </Card>
    </Container>
  );
}
