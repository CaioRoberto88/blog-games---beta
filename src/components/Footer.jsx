import React from "react";

import { Link } from "react-router-dom";

import "./Footer.css";
const Footer = () => {
  return (
    <footer className="text-bg-dark">
      <p className="text-center mb-0 mt-5 pt-5">Gamers Lendários - 2023 </p>
      <p className="text-center mb-0">&copy; Todos os direitos reservados </p>
      <p className="text-center mb-0">
        Desenvolvido por{" "}
        <Link to="https://www.linkedin.com/in/caio-roberto-844a3324a/">
          <span>Caio Roberto</span>
        </Link>{" "}
      </p>
    </footer>
  );
};

export default Footer;
