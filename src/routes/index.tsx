import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";

/**
 * A Home entra no bundle principal: ela e a primeira tela e nao deve pagar
 * um carregamento extra. As demais paginas usam lazy() e viram chunks
 * separados, carregados quando o usuario navega ate elas.
 *
 * O <Suspense> que cobre esses chunks fica no AppLayout, acima do <Outlet />.
 */
const Sobre = lazy(() => import("@/pages/Sobre"));
const Solucao = lazy(() => import("@/pages/Solucao"));
const SolucaoDetalhe = lazy(() => import("@/pages/Solucao/SolucaoDetalhe"));
const Integrantes = lazy(() => import("@/pages/Integrantes"));
const IntegranteDetalhe = lazy(
  () => import("@/pages/Integrantes/IntegranteDetalhe"),
);
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contato = lazy(() => import("@/pages/Contato"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Rotas estaticas
      { path: "/", element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/solucao", element: <Solucao /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/contato", element: <Contato /> },

      // Rotas dinamicas: o parametro e lido com useParams na propria pagina
      { path: "/solucao/:slug", element: <SolucaoDetalhe /> },
      { path: "/integrantes/:rm", element: <IntegranteDetalhe /> },

      // Curinga por ultimo: se vier antes, engole as rotas validas
      { path: "*", element: <NotFound /> },
    ],
  },
]);
