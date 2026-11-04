import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";

/**
 * Rotas da Aplicação SoulUp - Sprint 04
 * Inclui rotas estáticas obrigatórias, rotas da solução e rotas dinâmicas com parâmetros
 */
const Sobre = lazy(() => import("@/pages/Sobre"));
const Solucao = lazy(() => import("@/pages/Solucao"));
const SolucaoDetalhe = lazy(() => import("@/pages/Solucao/SolucaoDetalhe"));
const Transportes = lazy(() => import("@/pages/Transportes"));
const TransporteDetalhe = lazy(() => import("@/pages/Transportes/TransporteDetalhe"));
const CarteiraApi = lazy(() => import("@/pages/Carteira"));
const Integrantes = lazy(() => import("@/pages/Integrantes"));
const IntegranteDetalhe = lazy(() => import("@/pages/Integrantes/IntegranteDetalhe"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contato = lazy(() => import("@/pages/Contato"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Rotas estáticas obrigatórias
      { path: "/", element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/contato", element: <Contato /> },

      // Rotas da Solução e Integração com API (mínimo de 2 páginas da solução)
      { path: "/solucao", element: <Solucao /> },
      { path: "/transportes", element: <Transportes /> },
      { path: "/carteira", element: <CarteiraApi /> },

      // Rotas dinâmicas com parâmetros (useParams) exigidas com pontuação específica
      { path: "/solucao/:slug", element: <SolucaoDetalhe /> },
      { path: "/transportes/:id", element: <TransporteDetalhe /> },
      { path: "/integrantes/:rm", element: <IntegranteDetalhe /> },

      // Curinga 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);