import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import useToast from "../hook/useToastify";

import useValidation from "../hook/useValidationForm";

import blogFetch from "../axios/config";

import "./NovaSenha.css";

const NovaSenha = () => {
  const [senha, setSenha] = useState("");

  const [confirmaSenha, setConfirmaSenha] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let novasenha = {
      senha,
      confirmaSenha,
    };

    useValidation();

    await blogFetch
      .patch("/novasenha", novasenha)
      .then((res) => {
        let msg = res.data.message;
        useToast(msg);
        navigate("/login");
      })
      .catch((err) => {
        let msg = err.response.data.message;
        useToast(msg, "error");
      });
  };

  return (
    <>
      <h1 className="text-center py-3">Recuperar Senha</h1>
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>
        <div className="row g-3 nova_senha">
          <div className="col-12">
            <label htmlFor="senha">Insira uma nova senha</label>
            <input
              className="form-control"
              type="password"
              name="senha"
              id="senha"
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="confirmaSenha">Insira a confirmação de senha</label>
            <input
              className="form-control"
              type="password"
              name="confirmaSenha"
              id="confirmaSenha"
              onChange={(e) => setConfirmaSenha(e.target.value)}
              required
            />
            <small className="dica">
              <span>*Dica:</span> A senha deve conter no mínimo 6 caracteres,
              pelo menos um caractere especial, uma letra e um número!
            </small>
          </div>
          <div className="col-6 my-3">
            <input className="btn-geral" type="submit" value="Recuperar" />
          </div>
        </div>
      </form>
    </>
  );
};

export default NovaSenha;
