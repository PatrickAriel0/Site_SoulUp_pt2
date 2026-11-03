import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";

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
      { path: "/", element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/contato", element: <Contato /> },

      { path: "/solucao", element: <Solucao /> },
      { path: "/transportes", element: <Transportes /> },
      { path: "/carteira", element: <CarteiraApi /> },

      { path: "/solucao/:slug", element: <SolucaoDetalhe /> },
      { path: "/transportes/:id", element: <TransporteDetalhe /> },
      { path: "/integrantes/:rm", element: <IntegranteDetalhe /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);