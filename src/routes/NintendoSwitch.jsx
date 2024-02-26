import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import blogFetch from "../axios/config";

import { format } from "date-fns";

import pt from "date-fns/esm/locale/pt";

import "./NintendoSwitch.css";

const NintendoSwitch = () => {
  const [data, setData] = useState([]);

  const listNS = async () => {
    await blogFetch
      .get("/nsnoticias")
      .then((res) => {
        let ns = res.data.ns;
        setData(ns);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // PAGINAÇÃO

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 4;

  const lastIndex = currentPage * recordsPerPage;

  const fistIndex = lastIndex - recordsPerPage;

  const records = data.slice(fistIndex, lastIndex);

  const npage = Math.ceil(data.length / recordsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(e) {
    e.preventDefault();
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  // PAGINAÇÃO

  //SISTEMA DE BUSCA
  const [noticia, setNoticia] = useState([]);

  const [search, setSearch] = useState("");

  const getNoticias = async () => {
    await blogFetch.get(`/nsnoticias?q=${search}`).then((res) => {
      setNoticia(res.data.ns);
    });
  };

  const filterNoticia = noticia.filter((noticia) => {
    return noticia.titulo.toLowerCase().includes(search.toLowerCase());
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    getNoticias();

    setData(filterNoticia);
  };

  const handleClear = async () => {
    listNS();
    setSearch("");
  };

  //SISTEMA DE BUSCA

  useEffect(() => {
    listNS();
  }, []);

  return (
    <>
      <h1 className="text-center py-3">Últimas notícias</h1>
      <div className="text-center icones mb-5">
        <span>
          <img src="switch.png" alt="nintendo switch" />
        </span>
      </div>
      <div className="row py-3 my-3">
        <form className="input-group" onSubmit={handleSearch}>
          <div className="col-lg-8 col-12 input-mobile">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar pela noticia aqui..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-lg-4 col-12 btn-mobile-container">
            <input
              className="btn-geral btn-buscar"
              type="submit"
              value="Buscar"
            />
            <input
              className="btn-geral btn-limpar"
              type="submit"
              value="Limpar"
              onClick={handleClear}
            />
          </div>
        </form>
      </div>
      <hr />
      {data.length == 0 && (
        <p className="text-center fs-3">Nada encontrado: {search}</p>
      )}
      {data.length !== 0 && (
        <>
          {records.length == 0 && (
            <p className="carregando-dados-api">Carregando...</p>
          )}
          {records.map((noticia) => (
            <div className="row" key={noticia.idNoticia}>
              <h2 className="text-start">{noticia.titulo}</h2>
              <small>
                Postado por: {noticia.autor} em{" "}
                {format(
                  new Date(noticia.createdAt),
                  `EEEE - dd/MM/yyyy - HH:mm`,
                  {
                    locale: pt,
                  }
                )}
              </small>
              <div className="col-lg-6 col-12">
                <img
                  className="post-img"
                  src={noticia.image}
                  alt={noticia.titulo}
                />
              </div>
              <div className="col-lg-6 col-12">
                <p className="text-post">{noticia.descricao}</p>
                <Link
                  className="btn-geral"
                  to={`/detalhes/${noticia.idNoticia}`}
                >
                  Saiba mais...
                </Link>
              </div>
              <span>
                <hr />
              </span>
            </div>
          ))}
          {records.length == 4 || records.length == 1 ? (
            <p>
              {" "}
              <nav className="">
                <ul className="page-bar">
                  {currentPage == 1 ? (
                    <li className="page-item">
                      <Link className="page-link" to="#" onClick={prevPage}>
                        {""} Primeira página
                      </Link>
                    </li>
                  ) : (
                    <li className="page-item">
                      <Link className="page-link" to="#" onClick={prevPage}>
                        {""} Página Anterior
                      </Link>
                    </li>
                  )}
                  {numbers.map((n, i) => (
                    <li
                      className={`page-item ${
                        currentPage === n ? "active-page" : ""
                      }`}
                      key={i}
                    >
                      <Link className="page-item" to="#" onClick={changeCPage}>
                        <span className="number-page">{n}</span>
                      </Link>
                    </li>
                  ))}
                  {currentPage == npage ? (
                    <li className="page-item">
                      <Link className="page-link" to="#" onClick={nextPage}>
                        {""} Última página
                      </Link>
                    </li>
                  ) : (
                    <li className="page-item">
                      <Link className="page-link" to="#" onClick={nextPage}>
                        {""} Próxima página
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </p>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default NintendoSwitch;
