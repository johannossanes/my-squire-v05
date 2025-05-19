import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import Cadastro from "./Cadastro.jsx";
import Login from "./Login.jsx";
import Atributos from "./Atributos.jsx";
import Equipamentos from "./Equipamentos.jsx";
import Magias from "./Magias.jsx";
import Combate from "./Combate.jsx";
import Mapa from "./Mapa.jsx";
import Anotacoes from "./Anotacoes.jsx";
import Grupo from "./Grupo.jsx";
import Inicio from "./Inicio.jsx";
import { Entrada } from "./Entrada.jsx";
import { PersonagemProvider } from "./components/PersonagemContext.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "cadastro",
    element: <Cadastro />,
  },
  {
   path: "inicio",
   element: <Inicio />,
  },
  {
    path: "login",
    element: <Login />,
   },
   {
    path: "atributos",
    element: <Atributos />,
   },
   {
    path: "equipamentos",
    element: <Equipamentos />,
   },
   {
    path: "magias",
    element: <Magias />,
   },
   {
    path: "combate",
    element: <Combate />,
   },
   {
    path: "mapa",
    element: <Mapa />,
   },
   {
    path: "anotacoes",
    element: <Anotacoes />,
   },
   {
    path: "grupo",
    element: <Grupo />,
   },
   {
    path: "entrada",
    element: <Entrada />,
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersonagemProvider>
    <RouterProvider router={router} /> 
    </PersonagemProvider>
  </React.StrictMode>
);