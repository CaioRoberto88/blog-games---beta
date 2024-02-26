import React, { useState } from "react";

import blogFetch from "../axios/config";

import { useNavigate, Link } from "react-router-dom";

import useToast from "../hook/useToastify";

import useValidation from "../hook/useValidationForm";

import "./Cadastro.css";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [nome_de_usuario, setNome_de_usuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [image, setImage] = useState("");
  const [palavraSecreta, setPalavraSecreta] = useState("");

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let usuario = {
      nome,
      nome_de_usuario,
      email,
      senha,
      confirmaSenha,
      image,
      palavraSecreta,
    };

    useValidation();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const formData = new FormData();

    Object.keys(usuario).forEach((key) => {
      formData.append(key, usuario[key]);
    });

    await blogFetch
      .post("/cadastro", formData)
      .then((res) => {
        let msg = "Cadastro efetuado com sucesso!";
        useToast(msg);
        navigate("/");
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  function onFileChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <>
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>
        <h1 className="text-center py-3">Cadastro</h1>
        <div className="row g-3">
          <div className="col-lg-6 col-12">
            <label className="form-label" htmlFor="nome">
              Nome
            </label>
            <input
              className="form-control"
              type="text"
              name="nome"
              id="nome"
              placeholder="Insira o seu nome"
              onChange={(e) => setNome(e.target.value)}
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
              placeholder="Insira o nome de usuário"
              onChange={(e) => setNome_de_usuario(e.target.value)}
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
              placeholder="Insira o seu email"
              onChange={(e) => setEmail(e.target.value)}
              required
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
              placeholder="Insira a sua senha"
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <small className="dica">
              <span>*Dica:</span> A senha deve ter pelo menos um caractere
              especial, uma letra e um número.
            </small>
          </div>
          <div className="col-lg-6 col-12">
            <label className="form-label" htmlFor="confirmaSenha">
              Confirma Senha
            </label>
            <input
              className="form-control"
              type="password"
              name="confirmaSenha"
              id="confirmaSenha"
              placeholder="Insira a confirmação de senha"
              onChange={(e) => setConfirmaSenha(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-6 col-12">
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
            <small className="dica">
              <span>*Dica:</span> A imagem deve ter tamanho máximo de 10 mb.
            </small>
          </div>
          <div className="col-lg-6 col-12">
            <label className="form-label" htmlFor="palavraSecreta">
              Palavra Secreta
            </label>
            <input
              className="form-control"
              type="text"
              name="palavraSecreta"
              id="palavraSecreta"
              placeholder="Insira uma palavra secreta, para recuperar a senha!"
              onChange={(e) => setPalavraSecreta(e.target.value)}
              required
            />
            <small className="dica">
              <span>*Atenção:</span> Mantenha em um local seguro, em caso de
              esquecer a senha acesso, use essa palavra para ter acesso a sua
              conta.
            </small>
          </div>
          {!loading ? (
            <div className="col-12 my-3">
              <input className="btn-geral" type="submit" value="Cadastrar" />
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
          <p>
            Já possui conta?<Link to="/login"> Clique aqui!</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Cadastro;
