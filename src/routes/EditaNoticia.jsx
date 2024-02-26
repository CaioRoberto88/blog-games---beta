import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import blogFetch from "../axios/config";

import useToast from "../hook/useToastify";

import useValidation from "../hook/useValidationForm";

const EditaNoticia = () => {
  let params = useParams();

  const [data, setData] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [image, setImage] = useState("");
  const [descricao, setDescricao] = useState("");

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    await blogFetch
      .get(`/detalhes/${params.id}`)
      .then((res) => {
        let dados = res.data.noticia;
        console.log(dados);
        setData(dados);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFileChange = async (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const update = {
      titulo,
      plataforma,
      image: image,
      descricao,
    };

    useValidation();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    await blogFetch
      .patch(`/editanoticia/${params.id}`, update)
      .then((res) => {
        useToast(res.data.message);
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });

    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <form
      className="painel-admin needs-validation"
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className="text-center py-3">Editar noticia</h1>
      {data.map((item) => (
        <div className="row g-3" key={item.idNoticia}>
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
              value={titulo || item.titulo}
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
              value={plataforma || item.plataforma}
              required
            >
              <option value="">Selecione a plataforma</option>
              <option value="PC">Computador</option>
              <option value="playstation">Playstation</option>
              <option value="nintendo switch">Nintendo Switch</option>
              <option value="xbox">X-box</option>
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
              value={descricao || item.descricao}
              required
            ></textarea>
          </div>
          <div className="col-12 my-3">
            <input className="btn-geral" type="submit" value="Editar post" />
          </div>
        </div>
      ))}
    </form>
  );
};

export default EditaNoticia;
