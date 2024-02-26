import React, { useState } from "react";

import loginFetch from "../axios/login";

import { useNavigate, Link } from "react-router-dom";

import useToast from "../hook/useToastify";

import useValidation from "../hook/useValidationForm";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = {
      email,
      senha,
    };

    useValidation();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    await loginFetch
      .post("/login", usuario)
      .then((res) => {
        let usuario = res.data;

        localStorage.setItem("usuario", JSON.stringify(usuario));

        window.location.replace("/");

        useToast(usuario.message);

        navigate("/");
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  return (
    <>
      <form className="needs-validation" onSubmit={handleSubmit} noValidate>
        <h1 className="text-center py-3">Login</h1>
        <div className="row g-3 login">
          <div className="col-12">
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
          <div className="col-12">
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
            <small>
              <Link to="/recuperasenha" className="esqueceu-senha">
                Esqueceu a senha?
              </Link>
            </small>
          </div>
          {!loading ? (
            <div className="col-12 my-3">
              <input className="btn-geral" type="submit" value="Login" />
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
            Não possui conta?<Link to="/cadastro"> Clique aqui!</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
