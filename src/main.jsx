import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//PAGINAS
import PainelAdministrativo from "./routes/PainelAdministrativo.jsx";
import EditaNoticia from "./routes/EditaNoticia.jsx";

import Cadastro from "./routes/Cadastro";
import Login from "./routes/Login.jsx";
import Perfil from "./routes/Perfil.jsx";
import RecuperaSenha from "./routes/RecuperaSenha";
import NovaSenha from "./routes/NovaSenha.jsx";

import Home from "./routes/Home.jsx";

import PC from "./routes/PC";
import Playstation from "./routes/Playstation";
import Xbox from "./routes/Xbox";
import NintendoSwitch from "./routes/NintendoSwitch";
import Mobile from "./routes/Mobile";

import Detalhes from "./routes/Detalhes.jsx";

//CONTEXT
import { UsuarioProvider } from "./context/UsuarioContext.jsx";
import { QtdProvider } from "./context/QtdComentarioContext.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/paineladministrativo",
        element: <PainelAdministrativo />,
      },
      {
        path: "/editanoticia/:id",
        element: <EditaNoticia />,
      },

      {
        path: "/cadastro",
        element: <Cadastro />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/recuperasenha",
        element: <RecuperaSenha />,
      },
      {
        path: "/novasenha",
        element: <NovaSenha />,
      },
      {
        path: "/perfil/:id",
        element: <Perfil />,
      },
      {
        path: "/pc",
        element: <PC />,
      },
      {
        path: "/playstation",
        element: <Playstation />,
      },
      {
        path: "/xbox",
        element: <Xbox />,
      },
      {
        path: "/nintendoswitch",
        element: <NintendoSwitch />,
      },
      {
        path: "/mobile",
        element: <Mobile />,
      },
      {
        path: "/detalhes/:id",
        element: <Detalhes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QtdProvider>
      <UsuarioProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </UsuarioProvider>
    </QtdProvider>
  </React.StrictMode>
);
