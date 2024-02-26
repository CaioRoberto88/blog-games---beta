import React, { useState, useEffect, useContext } from "react";

import blogFetch from "../axios/config";

import { Link, useNavigate } from "react-router-dom";

import useToast from "../hook/useToastify";

import useValidation from "../hook/useValidationForm";

import { format } from "date-fns";

import pt from "date-fns/esm/locale/pt";

import "./PainelAdministrativo.css";

//CONTEXT
import { QtdComentarioContext } from "../context/QtdComentarioContext";

const PainelAdministrativo = () => {
  //QTD COMENTARIO NO POST

  const { qtdComentario, getQtdComentario } = useContext(QtdComentarioContext);

  /*
  function contadorComentarios(id) {
    getQtdComentario(id);
  }
  */

  const [select, setSelect] = useState();

  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [descricao, setDescricao] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let noticia = {
      titulo,
      plataforma,
      descricao,
      image,
    };

    useValidation();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const formData = new FormData();

    Object.keys(noticia).forEach((key) => {
      formData.append(key, noticia[key]);
    });

    await blogFetch
      .post("/noticia", formData)
      .then((res) => {
        useToast(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  function onFileChange(e) {
    setImage(e.target.files[0]);
  }

  //-- TODAS NOTICIAS

  const [data, setData] = useState([]);

  const getNoticias = async () => {
    await blogFetch
      .get("/todasnoticias")
      .then((res) => {
        let dados = res.data.lista;
        setData(dados);
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

  const todasnoticias = data.slice(fistIndex, lastIndex);

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

  const deleteNoticia = async (id) => {
    await blogFetch.delete(`/excluirnoticia/${id}`).then((res) => {
      useToast(res.data.message);
      getNoticias();
    });
  };

  const handleDeleteNoticia = async (id) => {
    deleteNoticia(id);
  };

  //-- TODOS OS COMENTÁRIOS

  const [comentarios, setComentarios] = useState([]);

  const getComentarios = async () => {
    await blogFetch
      .get("/todoscomentarios")
      .then((res) => {
        let dados = res.data.comentarios;
        setComentarios(dados);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // PAGINAÇÃO COMENTÁRIOS

  const [currentPageComments, setCurrentPageComments] = useState(1);

  const recordsPerPageComments = 4;

  const lastIndexComments = currentPageComments * recordsPerPageComments;

  const fistIndexComments = lastIndexComments - recordsPerPageComments;

  const todascomentarios = comentarios.slice(
    fistIndexComments,
    lastIndexComments
  );

  const npageComments = Math.ceil(data.length / recordsPerPageComments);

  const numbersComments = [...Array(npageComments + 1).keys()].slice(1);

  function prevPageComments() {
    if (currentPageComments !== 1) {
      setCurrentPageComments(currentPageComments - 1);
    }
  }

  function changeCPageComments(e) {
    e.preventDefault();
  }

  function nextPageComments() {
    if (currentPageComments !== npageComments) {
      setCurrentPageComments(currentPageComments + 1);
    }
  }

  // PAGINAÇÃO

  const handleDeleteComentario = async (id) => {
    deleteComentario(id);
    getComentarios();
  };

  const deleteComentario = async (id) => {
    await blogFetch.delete(`/excluircomentario/${id}`).then((res) => {
      useToast(res.data.message);
    });
  };

  //ADMINISTRADOR
  const [admin, setAdmin] = useState([]);

  const getAdministrador = async () => {
    await blogFetch
      .get("/checausuario")
      .then((res) => {
        let dados = res.data;
        setAdmin(dados);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //SISTEMA DE BUSCA DE NOTICIAS

  const [search, setSearch] = useState("");

  const filterNoticia = data.filter((noticia) => {
    return noticia.titulo.toLowerCase().includes(search.toLowerCase());
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setData(filterNoticia);
  };

  const handleClear = async () => {
    getNoticias();
    setSearch("");
  };

  //SISTEMA DE BUSCA DE NOTICIAS

  //SISTEMA DE BUSCA DE COMENTARIOS

  const [searchComentario, setSearchComentario] = useState("");

  const filterComentario = comentarios.filter((comentario) => {
    return comentario.comentario
      .toLowerCase()
      .includes(searchComentario.toLowerCase());
  });

  const handleSearchComentario = async (e) => {
    e.preventDefault();
    setComentarios(filterComentario);
  };

  const handleClearComentario = async () => {
    getComentarios();
    setSearch("");
  };

  //SISTEMA DE BUSCA DE COMENTARIOS

  useEffect(() => {
    getNoticias();
    getComentarios();
    getAdministrador();
  }, []);

  return (
    <>
      {admin.length == 0 ? (
        <p className="carregando-dados-api">Carregando...</p>
      ) : (
        <>
          <div className="container-admin">
            <h1 className="text-center py-3">Administração</h1>
            <h6 className="text-start py-3">
              Seja bem vindo(a) -{" "}
              <span className="admin-nome">{admin.nome}</span>
            </h6>
            <p>
              <img src={admin.image} alt={admin.nome} />
            </p>
            <p className="d-flex align-middle align-items-center">
              <i className="bi bi-person-badge fs-2"></i> Nível - {admin.tipo}
            </p>
          </div>
          <h4 className="text-center">Painel de gerenciamento</h4>
          <select
            className="form-select categoria"
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="">Selecione uma das opções:</option>
            <option value="postarnoticia">Postar noticia</option>
            <option value="todasnoticias">Todas noticias</option>
            <option value="todoscomentarios">Todos comentários</option>
          </select>
          {select == "postarnoticia" ? (
            <form
              className="painel-admin needs-validation"
              onSubmit={handleSubmit}
              noValidate
            >
              <h2 className="text-center pt-3">Postar notícia</h2>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label" htmlFor="titulo">
                    Titulo
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="Insira o título da notícia"
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="plataforma">
                    Plataforma
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setPlataforma(e.target.value)}
                    required
                  >
                    <option value="">Selecione a plataforma</option>
                    <option value="pc">Computador</option>
                    <option value="playstation">Playstation</option>
                    <option value="xbox">X-box</option>
                    <option value="nintendo switch">Nintendo Switch</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="image">
                    Imagem
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    id="image"
                    onChange={onFileChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="descricao">
                    Descrição
                  </label>
                  <textarea
                    className="form-control"
                    name="descricao"
                    id="descricao"
                    placeholder="Insira descrição da noticia..."
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="col-12 my-3">
                  <input
                    className="btn-geral"
                    type="submit"
                    value="Enviar post"
                  />
                </div>
              </div>
            </form>
          ) : (
            <></>
          )}
          {select == "todasnoticias" ? (
            <div className="col-12 text-center py-3">
              <h4>Todas as notícias:</h4>
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
              {data.length != 0 && (
                <>
                  {todasnoticias.map((item) => (
                    <div
                      className="row todasnoticias my-3"
                      key={item.idNoticia}
                    >
                      <div className="col-12 text-start my-3">
                        <span className="noticias-titulo">Titulo: </span>
                        {item.titulo}
                      </div>
                      {/* {qtdComentario} {contadorComentarios(item.idNoticia)} */}
                      <div className="col-6 text-start my-3">
                        <span className="noticias-autor">Autor: </span>
                        {item.autor}
                      </div>
                      <div className="col-6 text-start my-3">
                        <span className="noticias-postado"> Postado</span> em{" "}
                        {""}
                        {format(
                          new Date(item.createdAt),
                          `EEEE - dd/MM/yyyy - HH:mm`,
                          {
                            locale: pt,
                          }
                        )}
                      </div>
                      <div className="col-2 my-3">
                        <Link
                          className="btn-geral"
                          to={`/editanoticia/${item.idNoticia}`}
                        >
                          Editar
                        </Link>
                      </div>
                      <div className="col-2 my-3">
                        <Link
                          className="btn-geral"
                          to={"#"}
                          onClick={() => handleDeleteNoticia(item.idNoticia)}
                        >
                          Excluir
                        </Link>
                      </div>
                    </div>
                  ))}
                  {todasnoticias.length == 4 || todasnoticias.length > -1 ? (
                    <nav className="">
                      <ul className="page-bar">
                        {currentPage == 1 ? (
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              onClick={prevPage}
                            >
                              {""} Primeira página
                            </Link>
                          </li>
                        ) : (
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              onClick={prevPage}
                            >
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
                            <Link
                              className="page-item"
                              to="#"
                              onClick={changeCPage}
                            >
                              <span className="number-page">{n}</span>
                            </Link>
                          </li>
                        ))}
                        {currentPage == npage ? (
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              onClick={nextPage}
                            >
                              {""} Última página
                            </Link>
                          </li>
                        ) : (
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              onClick={nextPage}
                            >
                              {""} Próxima página
                            </Link>
                          </li>
                        )}
                      </ul>
                    </nav>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          ) : (
            <></>
          )}
          {select == "todoscomentarios" ? (
            <div className="col-12 text-center py-3">
              <h4>Todas os comentários:</h4>
              <div className="row py-3 my-3">
                <form className="input-group" onSubmit={handleSearchComentario}>
                  <div className="col-lg-8 col-12 input-mobile">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Buscar pela noticia aqui..."
                      value={searchComentario}
                      onChange={(e) => setSearchComentario(e.target.value)}
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
                      onClick={handleClearComentario}
                    />
                  </div>
                </form>
              </div>
              <hr />
              {comentarios.length == 0 && (
                <p className="text-center fs-3">
                  Nada encontrado: {searchComentario}
                </p>
              )}
              {comentarios.length != 0 && (
                <>
                  {todascomentarios.map((item) => (
                    <div
                      className="row todoscomentarios my-3"
                      key={item.idNoticia}
                    >
                      <div className="col-12 text-start my-5">
                        {item.idComentario} <i className="bi bi-hash"></i>
                        <span className="comentarios-comentario">
                          Comentário :
                        </span>
                        {item.comentario}
                      </div>
                      <div className="col=2">
                        <span className="comentarios-idUsuario">
                          IdUsuário :
                        </span>
                        {item.idUsuario}
                        <span className="comentarios-usuario">Usuário :</span>
                        {item.nome_de_usuario}
                      </div>
                      <div className="col-2">
                        <Link
                          className="btn-geral"
                          to={"#"}
                          onClick={() =>
                            handleDeleteComentario(item.idComentario)
                          }
                        >
                          Excluir
                        </Link>
                      </div>
                    </div>
                  ))}
                  {todascomentarios.length == 4 ||
                  todascomentarios.length > -1 ? (
                    <nav className="">
                      <ul className="page-bar">
                        {currentPageComments == 1 ? (
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              onClick={prevPageComments}
                            >
                              {""} Primeira página
                            </Link>
                          </li>
                        ) : (
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              onClick={prevPageComments}
                            >
                              {""} Página Anterior
                            </Link>
                          </li>
                        )}
                        {numbersComments.map((n, i) => (
                          <li
                            className={`page-item ${
                              currentPageComments === n ? "active-page" : ""
                            }`}
                            key={i}
                          >
                            <Link
                              className="page-item"
                              to="#"
                              onClick={changeCPageComments}
                            >
                              <span className="number-page">{n}</span>
                            </Link>
                          </li>
                        ))}
                        {currentPageComments == npageComments ? (
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              onClick={nextPageComments}
                            >
                              {""} Última página
                            </Link>
                          </li>
                        ) : (
                          <li className="page-item">
                            <Link
                              className="page-link"
                              to="#"
                              onClick={nextPageComments}
                            >
                              {""} Próxima página
                            </Link>
                          </li>
                        )}
                      </ul>
                    </nav>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default PainelAdministrativo;
