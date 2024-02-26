import React from "react";

import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import "./App.css";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="container container-principal">
        <ToastContainer />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
