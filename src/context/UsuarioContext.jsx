import React, { createContext, useState, useEffect } from "react";

import blogFetch from "../axios/config";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario) {
    const getUsuario = async () => {
      await blogFetch
        .get("/checausuario")
        .then((res) => {
          let usuario = res.data;
          setData(usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      getUsuario();
    }, []);
  }

  const [data, setData] = useState([]);

  const algumContext = data;

  return (
    <UsuarioContext.Provider value={algumContext}>
      {children}
    </UsuarioContext.Provider>
  );
};
