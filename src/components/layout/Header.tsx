import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "@/components/ui/Container";

interface ItemMenu {
  rotulo: string;
  para: string;
}

const ITENS_MENU: ItemMenu[] = [
  { rotulo: "Início", para: "/" },
  { rotulo: "Sobre", para: "/sobre" },
  { rotulo: "Solução", para: "/solucao" },
  { rotulo: "Integrantes", para: "/integrantes" },
  { rotulo: "FAQ", para: "/faq" },
  { rotulo: "Contato", para: "/contato" },
];

export function Header() {
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const [rolou, setRolou] = useState<boolean>(false);

  
  useEffect(() => {
    function aoRolar() {
      setRolou(window.scrollY > 20);
    }

    window.addEventListener("scroll", aoRolar);
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const classeLink = ({ isActive }: { isActive: boolean }): string =>
    `relative px-1 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-neon-300" : "text-slate-300 hover:text-white"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        rolou
          ? "border-white/10 bg-ink-900/90 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <NavLink to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-400 to-eco-500 font-mono text-base font-bold text-ink-900">
              N
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold uppercase tracking-wider text-white sm:text-base">
                NepTune Labs
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-400">
                × SoulUp
              </span>
            </span>
          </NavLink>

          
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
            {ITENS_MENU.map((item) => (
              <NavLink key={item.para} to={item.para} className={classeLink} end={item.para === "/"}>
                {({ isActive }) => (
                  <>
                    {item.rotulo}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-neon-400 to-eco-400" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          
          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 lg:hidden"
          >
            <span
              className={`h-0.5 w-5 rounded bg-white transition-transform duration-300 ${
                menuAberto ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded bg-white transition-opacity duration-300 ${
                menuAberto ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded bg-white transition-transform duration-300 ${
                menuAberto ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </Container>

      
      <nav
        id="menu-mobile"
        aria-label="Principal (mobile)"
        className={`overflow-hidden border-t border-white/5 bg-ink-850/95 backdrop-blur-lg transition-all duration-300 lg:hidden ${
          menuAberto ? "max-h-96" : "max-h-0"
        }`}
      >
        <Container>
          <ul className="flex flex-col py-2">
            {ITENS_MENU.map((item) => (
              <li key={item.para}>
                <NavLink
                  to={item.para}
                  end={item.para === "/"}
                  onClick={() => setMenuAberto(false)}
                  className={({ isActive }) =>
                    `block border-l-2 py-3 pl-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-neon-400 text-neon-300"
                        : "border-transparent text-slate-300 hover:border-white/20 hover:text-white"
                    }`
                  }
                >
                  {item.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
