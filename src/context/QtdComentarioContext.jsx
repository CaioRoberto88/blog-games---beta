import React, { createContext, useState, useEffect } from "react";

import blogFetch from "../axios/config";

export const QtdComentarioContext = createContext();

export const QtdProvider = ({ children }) => {

  const getQtdComentario = async (id) => {

    await blogFetch
      .get(`/qtdcomentario/${id}`)
      .then((res) => {

        let qtdComentario = res.data.qtdComentario;

        let quantidade = qtdComentario.length;

        setData(quantidade);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQtdComentario();
  }, []);

  const [data, setData] = useState([]);

  const qtdComentario = data;

  return (
    <QtdComentarioContext.Provider value={{ qtdComentario, getQtdComentario }}>
      {children}
    </QtdComentarioContext.Provider>
  );
};
