import React, { useState, useEffect, useRef } from "react";

import blogFetch from "../axios/config";

import { Link } from "react-router-dom";

import { format } from "date-fns";

import pt from "date-fns/esm/locale/pt";

//SWIPER

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";

// register Swiper custom elements
register();

import "./Home.css";

const Home = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    swiperElRef.current?.addEventListener("progress", (e) => {});

    swiperElRef.current?.addEventListener("slidechange", (e) => {});
  }, []);

  const [data, setData] = useState([]);

  const [slide, setSlide] = useState([]);

  const getData = async () => {
    await blogFetch
      .get("/todasnoticias")
      .then((res) => {
        let noticia = res.data.lista;
        setData(noticia);
        slideShow();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const slideShow = async () => {
    await blogFetch
      .get("/slidenoticias")
      .then((res) => {
        let slides = res.data.ultimosSlides;
        setSlide(slides);
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
    await blogFetch.get(`/todasnoticias?q=${search}`).then((res) => {
      setNoticia(res.data.lista);
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
    getData();
    setSearch("");
  };
  //SISTEMA DE BUSCA

  useEffect(() => {
    getData();
    getNoticias();
  }, []);

  return (
    <>
      <h1 className="text-center py-3">Últimas notícias</h1>
      <div className="text-center icones">
        <span>
          <Link to="/pc">
            <img src="pc.png" alt="pc" />
          </Link>
        </span>
        <span>
          <Link to="/playstation">
            <img src="play.png" alt="play" />
          </Link>
        </span>
        <span>
          <Link to="/xbox">
            <img className="xbox" src="x-box.png" alt="x-box" />
          </Link>
        </span>
        <span>
          <Link to="/nintendoswitch">
            <img src="switch.png" alt="nintendo switch" />
          </Link>
        </span>
        <span>
          <Link to="/mobile">
            <img src="mobile.png" alt="mobile" />
          </Link>
        </span>
      </div>
      {slide.length == 0 ? (
        <p className="carregando-dados-api">Carregando...</p>
      ) : (
        <>
          <swiper-container
            ref={swiperElRef}
            slides-per-view="1"
            navigation="true"
            pagination="true"
          >
            {slide.map((item) => (
              <swiper-slide key={item.idNoticia}>
                <img
                  className="img-carousel-slide"
                  src={item.image}
                  alt={item.titulo}
                />
                <div className="carousel-caption">
                  <Link to={`/detalhes/${item.idNoticia}`}>
                    <h5>{item.titulo}</h5>
                  </Link>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>

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
              {records.map((noticia) => (
                <div className="row" key={noticia.idNoticia}>
                  <h2 className="text-start">{noticia.titulo}</h2>
                  <small>
                    Postado por :{" "}
                    <span className="noticia-autor">{noticia.autor}</span> em{" "}
                    {format(
                      new Date(noticia.createdAt),
                      `EEEE - dd/MM/yyyy - HH:mm`,
                      {
                        locale: pt,
                      }
                    )}
                  </small>
                  <div className="col-md-6 col-12">
                    <img
                      className="post-img"
                      src={noticia.image}
                      alt={noticia.titulo}
                    />
                  </div>
                  <div className="col-md-6 col-12">
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
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
