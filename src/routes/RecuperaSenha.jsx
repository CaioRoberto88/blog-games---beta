import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import loginFetch from "../axios/login";

import useToast from "../hook/useToastify";

import useValidation from "../hook/useValidationForm";

import "./RecuperaSenha.css";

const RecuperaSenha = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [palavraSecreta, setPalavraSecreta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let usuario = {
      email,
      palavraSecreta,
    };

    useValidation();

    await loginFetch
      .post("/recuperasenha", usuario)
      .then((res) => {
        let usuario = res.data;

        localStorage.setItem("usuario", JSON.stringify(usuario));

        //window.location.replace("/novasenha");

        navigate("/novasenha");
      })
      .catch((err) => {
        let msg = err.response.data.message;
        useToast(msg, "error");
      });
  };

  return (
    <>
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>
        <h1 className="text-center py-3">Recuperar Senha</h1>
        <div className="row g-3 recuperar_senha">
          <div className="col-12">
            <label htmlFor="email">Insira email de cadastro</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="palavraSecreta">Insira a palavra secreta</label>
            <input
              className="form-control"
              type="text"
              name="palavraSecreta"
              id="palavraSecreta"
              onChange={(e) => setPalavraSecreta(e.target.value)}
              required
            />
          </div>
          <div className="col-6 my-3">
            <input className="btn-geral" type="submit" value="Recuperar" />
          </div>
        </div>
      </form>
    </>
  );
};

export default RecuperaSenha;
