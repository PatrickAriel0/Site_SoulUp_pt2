import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import "./index.css";

const elementoRaiz = document.getElementById("root");

if (!elementoRaiz) {
  throw new Error("Elemento #root nao encontrado no index.html");
}

createRoot(elementoRaiz).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
