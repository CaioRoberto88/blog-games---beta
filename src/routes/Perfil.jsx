import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import blogFetch from "../axios/config";

//HOOK
import useAvaliacao from "../hook/useAvalicacao";

import useToast from "../hook/useToastify";

import useValidation from "../hook/useValidationForm";

import "./Perfil.css";

const Perfil = () => {
  const [usuario, setUsuario] = useState([]);

  const [comentarios, setComentarios] = useState([]);

  const [perfil, setPerfil] = useState([]);

  const [loading, setLoading] = useState(false);

  const id = useParams();

  const getData = async () => {
    await blogFetch
      .get("/checausuario")
      .then((res) => {
        let dados = res.data;
        setUsuario(dados);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComentarios = async () => {
    await blogFetch
      .get(`/meuscomentarios/${id.id}`)
      .then((res) => {
        let comenta = res.data.comentarios;
        setComentarios(comenta);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const excluirComentario = async (idComentario) => {
    await blogFetch
      .delete(`/excluircomentario/${idComentario}`)
      .then((res) => {
        useToast(res.data.message);
        getComentarios();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPerfil = async () => {
    blogFetch
      .get("/checausuario")
      .then((res) => {
        let perfilInfo = res.data;
        setPerfil(perfilInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [nome, setNome] = useState("");
  const [nome_de_usuario, setNome_de_usuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [image, setImage] = useState("");

  const onFileChange = async (e) => {

    setImage(e.target.files[0]);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const updatePerfil = {
      nome,
      nome_de_usuario,
      email,
      senha,
      confirmaSenha,
      image: image,
    };

    useValidation();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    await blogFetch
      .patch(`/perfilusuario/${id.id}`, updatePerfil)
      .then((res) => {
        useToast(res.data.message);
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
    getData();
  };

  // PAGINAÇÃO

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 4;

  const lastIndex = currentPage * recordsPerPage;

  const fistIndex = lastIndex - recordsPerPage;

  const records = comentarios.slice(fistIndex, lastIndex);

  const npage = Math.ceil(comentarios.length / recordsPerPage);

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

  useEffect(() => {
    getData();
    getComentarios();
    getPerfil();
  }, []);

  return (
    <>
      {usuario.length == 0 ? (
        <p className="carregando-dados-api">Carregando...</p>
      ) : (
        <div className="row container-perfil">
          <div className="col-12">
            <img
              className="perfil-image"
              src={usuario.image}
              alt={usuario.nome}
            />
          </div>
          <hr />
          <h5 className="text-center">Informações:</h5>
          <div className="col-12">
            <p>Nome: {usuario.nome}</p>
            <p>Usuário: {usuario.nome_de_usuario}</p>
            <p>E-mail: {usuario.email}</p>
          </div>
          <hr />
          <div className="col-12">
            <h5 className="text-center py-3">Editar perfil</h5>
            <form
              className="needs-validation"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="row g-3">
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="nome">
                    Nome completo
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="nome"
                    id="nome"
                    value={nome || perfil.nome || ""}
                    onChange={(e) => {
                      setNome(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="nome_de_usuario">
                    Nome de usuário
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="nome_de_usuario"
                    id="nome_de_usuario"
                    value={nome_de_usuario || perfil.nome_de_usuario || ""}
                    onChange={(e) => {
                      setNome_de_usuario(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    value={email || perfil.email || ""}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="senha">
                    Senha
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="senha"
                    id="senha"
                    onChange={(e) => {
                      setSenha(e.target.value);
                    }}
                    placeholder="Deseja trocar a senha?"
                    required
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="confirmaSenha">
                    Confirma senha
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmaSenha"
                    id="confirmaSenha"
                    onChange={(e) => {
                      setConfirmaSenha(e.target.value);
                    }}
                    placeholder="Confirma a nova senha"
                    required
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="image">
                    Imagem de perfil
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    id="image"
                    onChange={onFileChange}
                  />
                </div>

                <div>
                  {!loading ? (
                    <div className="col-12 my-3">
                      <input
                        className="btn-geral"
                        type="submit"
                        value="Editar perfil"
                      />
                    </div>
                  ) : (
                    <div className="col-12 my-3">
                      <input
                        className="btn-geral"
                        type="submit"
                        value="Aguarde.."
                        disabled
                      />
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <hr />
          <div className="col-12">
            <h5 className="text-center py-3">Meus comentários: {comentarios.length}</h5>
            {comentarios.length === 0 && (
              <p className="text-center">Você não possui comentários</p>
            )}
            {records.map((comentario) => (
              <div className="row" key={comentario.idComentario}>
                <hr />
                <div className="col-12">
                  <h6 className="fw-bold text-decoration-underline">Tilulo</h6>
                  <p>{comentario.titulo}</p>
                  <h6 className="fw-bold text-decoration-underline">
                    Comentário
                  </h6>
                  <p>{comentario.comentario}</p>
                  <h6 className="fw-bold text-decoration-underline">
                    Avaliação
                  </h6>
                  <p>{useAvaliacao(comentario.avaliacao)}</p>
                  <input
                    onClick={() => excluirComentario(comentario.idComentario)}
                    className="btn-geral my-3"
                    type="submit"
                    value="exluir"
                  />
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
      {records.length == 4 || records.length > 1 ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Perfil;
