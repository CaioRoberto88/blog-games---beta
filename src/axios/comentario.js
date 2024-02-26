import axios from "axios";

let usuario = JSON.parse(localStorage.getItem("usuario"));

if (usuario == undefined) {
  usuario = {};
}

const token = usuario.token;

const comentarioFetch = axios.create({
  baseURL:
    "https://eddbca39-c238-42d3-a8e1-f6fdd8be6e7f-00-3utxsyflx7txn.worf.replit.dev",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default comentarioFetch;
