import React, { useContext } from "react";

import "./Navbar.css";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { UsuarioContext } from "../context/UsuarioContext";

const Navbar = () => {
  const usuarioContext = useContext(UsuarioContext);

  const navigate = useNavigate();

  let usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <span className="navbar-brand text-white">
        <Link to="/">
          <img src="/vite.svg" alt="Games Lendários" />
        </Link>
      </span>
      <button
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target=".navbar-collapse"
      >
        <span>Menu</span> <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse">
        <ul className="navbar-nav me-auto categoria-lista">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <i className="bi bi-controller"></i> Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/pc">
              <i className="bi bi-pc-display"></i> PC
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/playstation">
              <i className="bi bi-playstation"></i> Playstation
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/xbox">
              <i className="bi bi-xbox"></i> X-box
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/nintendoswitch">
              <i className="bi bi-nintendo-switch"></i> Nintendo Switch
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/mobile">
              <i className="bi bi-phone-fill"></i> Mobile
            </NavLink>
          </li>
        </ul>
        <div className="dropdown me-3">
          <button
            className="btn-painel-usuario dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Painel do Usuário
          </button>
          <ul className="usuario-lista dropdown-menu">
            {usuario ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link dropdown-item"
                    to={`/perfil/${usuario.idUsuario}`}
                  >
                    {usuarioContext.nome_de_usuario}
                  </NavLink>
                </li>
                {usuario.idUsuario == 1 ? (
                  <li>
                    <NavLink
                      className="nav-link dropdown-item text-white"
                      to="/paineladministrativo"
                    >
                      Painel Admin
                    </NavLink>
                  </li>
                ) : (
                  <></>
                )}
                <li className="nav-item">
                  <NavLink
                    onClick={logout}
                    className="nav-link dropdown-item"
                    to="/login"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cadastro">
                    Cadastro
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
