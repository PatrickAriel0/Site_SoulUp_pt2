import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";

const ANO_ATUAL = new Date().getFullYear();

const LINKS_RAPIDOS = [
  { rotulo: "Início", para: "/" },
  { rotulo: "Sobre", para: "/sobre" },
  { rotulo: "Solução", para: "/solucao" },
  { rotulo: "Integrantes", para: "/integrantes" },
  { rotulo: "FAQ", para: "/faq" },
  { rotulo: "Contato", para: "/contato" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-ink-900/80">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-400 to-eco-500 font-mono text-base font-bold text-ink-900">
                N
              </span>
              <span className="text-base font-bold uppercase tracking-wider text-white">
                NepTune Labs <span className="text-neon-400">×</span> SoulUp
              </span>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Plataforma que converte pontos de ações sustentáveis em saldo real no
              Bilhete Único, incentivando o transporte público e reduzindo a emissão
              de CO₂ nas cidades.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-neon-400">
              Navegação
            </h3>
            <ul className="space-y-2">
              {LINKS_RAPIDOS.map((link) => (
                <li key={link.para}>
                  <Link
                    to={link.para}
                    className="text-sm text-slate-400 transition-colors hover:text-neon-300"
                  >
                    {link.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-neon-400">
              Contato
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>NepTune Labs × SoulUp</li>
              <li>Turma 1TDSPK — FIAP</li>
              <li>Projeto acadêmico</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-slate-500">
            © {ANO_ATUAL} NepTune Labs &amp; SoulUp — Projeto acadêmico FIAP. Todos os
            direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
