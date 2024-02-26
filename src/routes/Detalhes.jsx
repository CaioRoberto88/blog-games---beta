import React, { useState, useEffect, useContext } from "react";

import { useParams, Link } from "react-router-dom";

import blogFetch from "../axios/config";

import comentarioFetch from "../axios/comentario";

//FORMATA DATA
import { format } from "date-fns";

import pt from "date-fns/esm/locale/pt";

//CONTEXT
import { QtdComentarioContext } from "../context/QtdComentarioContext";

//HOOK
import useAvaliacao from "../hook/useAvalicacao";

import useToast from "../hook/useToastify";

import useValidation from "../hook/useValidationForm";

//ESTILO
import "./Detalhes.css";

const Detalhes = () => {
  const [data, setData] = useState([]);

  const [comentar, setComentar] = useState("");

  const [avaliacao, setAvaliacao] = useState("");

  const [media, setMedia] = useState(0);

  const [comentarios, setComentarios] = useState([]);

  const [loading, setLoading] = useState(false);

  const [avaliacaoDetalhes, setAvaliacaoDetalhes] = useState([]);

  let noticia = useParams();

  //QTD COMENTARIO NO POST
  const { qtdComentario, getQtdComentario } = useContext(QtdComentarioContext);

  getQtdComentario(noticia.id);

  const getData = async () => {
    await blogFetch
      .get(`/detalhes/${noticia.id}`)
      .then((res) => {
        let noticia = res.data.noticia;
        setData(noticia);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComentarios = async () => {
    await blogFetch
      .get("/todoscomentarios")
      .then((res) => {
        let lista = res.data.comentarios;

        let array = [];

        for (let l in lista) {
          if (lista[l].idNoticia == noticia.id) {
            array.push(lista[l]);
            setComentarios(array);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mediaAvaliacao = async () => {
    await blogFetch
      .get(`/mediaavaliacao/${noticia.id}`)
      .then((res) => {
        let mediaUsuario = res.data;
        setMedia(mediaUsuario);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAvaliacaoDetalhes = async () => {
    await blogFetch.get(`/avaliacaodetalhes/${noticia.id}`).then((res) => {
      setAvaliacaoDetalhes(res.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dados = {
      comentario: comentar,
      avaliacao: avaliacao,
    };

    useValidation();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    await comentarioFetch
      .post(`/comentario/${noticia.id}`, dados)
      .then((res) => {
        console.log(res.data.message);
        useToast(res.data.message);
        getComentarios();
        mediaAvaliacao();
        getAvaliacaoDetalhes();
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  let usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    getData();
    getComentarios();
    mediaAvaliacao();
    getAvaliacaoDetalhes();
  }, []);

  return (
    <>
      {data.map((item) => (
        <div className="row container-detalhes" key={item.idNoticia}>
          <h1 className="text-center py-3">{item.titulo}</h1>
          <small>
            Postado por: <span className="noticia-autor">{item.autor}</span> em{" "}
            {format(new Date(item.createdAt), `EEEE - dd/MM/yyyy - HH:mm`, {
              locale: pt,
            })}
          </small>
          <div className="col-12 text-center">
            <img src={item.image} alt={item.titulo} />
          </div>
          <div className="row g-md-3 g-3 compartilhar">
            <h6 className="text-center py-3">
              Compartilhe a noticia em suas redes sociais
              <i className="bi bi-share-fill"></i>
            </h6>
            <div className="col-lg-4 col-12">
              <Link
                to={`https://www.facebook.com/sharer/sharer.php?u=https://blog-games-com-pagination.vercel.app/${item.idNoticia}`}
                target="_blank"
                title={item.titulo}
              >
                <div className="facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-12">
              <Link
                to={`https://x.com/share/?u=https://blog-games-com-pagination.vercel.app/${item.idNoticia}`}
                target="_blank"
                title={item.titulo}
              >
                <div className="twitter">
                  <i className="fa-brands fa-x-twitter"></i>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-12">
              <Link
                to={`https://api.whatsapp.com/send?text=https://blog-games-com-pagination.vercel.app/detalhes/${item.idNoticia}`}
                title={item.titulo}
                target="_blank"
              >
                <div className="whatsapp">
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12">
            <hr />
            <p className="container-noticia">{item.descricao}</p>
            <div className="container-biografia my-5">
              <hr />
              <div className="row">
                <div className="col-2">
                  <img src={item.img_autor} alt={item.autor} />
                </div>
                <div className="col-10 biografia">
                  <p>{item.autor}</p>
                  <p>{item.bio}</p>
                </div>
              </div>
            </div>
            <div className="container-avaliacao">
              <hr />
              <img src="/gamers-lendarios.png" alt="gamers lendarios" />
              <p>Nossa avaliação</p>
              {!item.avaliacao && <p>S/N</p>}
              <p>{useAvaliacao(item.avaliacao)}</p>
              <div className="container-avaliacao-detalhes">
                <i className="fa-solid fa-users"></i>
                <p>Avaliações detalhes</p>
                <li className="avaliacao-lista">
                  5<i className="fa-solid fa-star"></i>
                  <p className="progress progress-personalizada">
                    <span className="progress-bar w-100">
                      {avaliacaoDetalhes.n5}
                    </span>
                  </p>
                </li>
                <li className="avaliacao-lista">
                  4<i className="fa-solid fa-star"></i>
                  <p className="progress progress-personalizada">
                    <span className="progress-bar w-75">
                      {avaliacaoDetalhes.n4}
                    </span>
                  </p>
                </li>
                <li className="avaliacao-lista">
                  3<i className="fa-solid fa-star"></i>
                  <p className="progress progress-personalizada">
                    <span className="progress-bar w-50">
                      {avaliacaoDetalhes.n3}
                    </span>
                  </p>
                </li>
                <li className="avaliacao-lista">
                  2<i className="fa-solid fa-star"></i>
                  <p className="progress progress-personalizada">
                    <span className="progress-bar w-25">
                      {avaliacaoDetalhes.n2}
                    </span>
                  </p>
                </li>
                <li className="avaliacao-lista">
                  1<i className="fa-solid fa-star"></i>
                  <p className="progress progress-personalizada">
                    <span className="progress-bar w-0">
                      {avaliacaoDetalhes.n1}
                    </span>
                  </p>
                </li>
              </div>
              <p>Média usuários</p>
              {!media.media && <p>S/N</p>}
              <p>
                <span className="fs-1 me-1">{media.media}</span>
                {useAvaliacao(media.media)}
              </p>
            </div>
            <hr />
          </div>
          {usuario ? (
            <form
              className="needs-validation"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="row g-3">
                <h6 className="text-center">
                  Deixe sua opinão abaixo e avalie o jogo com uma nota, entre 1
                  a 5!
                </h6>
                <div className="col-12">
                  <label className="form-label" htmlFor="comentario">
                    Comentário:
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="comentario"
                    id="comentario"
                    onChange={(e) => setComentar(e.target.value)}
                    placeholder="Insira algum comentário... no máximo 300 caracteres"
                    required
                  ></textarea>
                </div>
                <div className="col-3">
                  <label htmlFor="avaliacao">
                    Dê a quantidade de
                    <i className="avaliacao-do-site bi bi-star-fill fs-5 ms-3"></i>
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setAvaliacao(e.target.value)}
                    required
                  >
                    <option value="0">Selecione sua nota:</option>
                    <option value="1">1 estrela</option>
                    <option value="2">2 estrela</option>
                    <option value="3">3 estrela</option>
                    <option value="4">4 estrela</option>
                    <option value="5">5 estrela</option>
                  </select>
                </div>
                {!loading ? (
                  <div className="col-12 my-3">
                    <input
                      className="btn-geral"
                      type="submit"
                      value="Comentar"
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
            </form>
          ) : (
            <p className="text-center py-3">
              Para comentar, e avaliar cada jogo, é necessário um cadastro, faça
              isso, <Link to="/Cadastro">clicando aqui!</Link>
            </p>
          )}
          <div className="text-center mb-3">
            Comentários: <i className="fa-solid fa-comment"></i>
            <span className="qtd-comentario fw-bold">{qtdComentario}</span>
          </div>
          {comentarios.map((usuario) => (
            <div
              className="row container-comentarios g-3 pb-3"
              key={usuario.idComentario}
            >
              <>
                <div className="col-2 usuario">
                  <span>
                    <img src={usuario.image} alt={usuario.nome} />
                    <br />
                    <span className="usuario-de-nome">
                      {usuario.nome_de_usuario}
                    </span>
                  </span>
                </div>
                <div className="col-10 comentario rounded-end">
                  <p>
                    {usuario.comentario} <br />
                    <span className="comentario-data">
                      <span className="comentado-em">Comentado - </span>
                      {format(
                        new Date(usuario.createdAt),
                        `EEEE - dd/MM/yyyy - HH:mm`,
                        {
                          locale: pt,
                        }
                      )}
                    </span>
                    <span className="avaliação-usuario">
                      Avaliação - <span>{useAvaliacao(usuario.avaliacao)}</span>
                    </span>
                  </p>
                </div>
              </>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Detalhes;
