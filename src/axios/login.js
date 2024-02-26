import axios from "axios";

const loginFetch = axios.create({
  baseURL:
    "https://eddbca39-c238-42d3-a8e1-f6fdd8be6e7f-00-3utxsyflx7txn.worf.replit.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default loginFetch;
