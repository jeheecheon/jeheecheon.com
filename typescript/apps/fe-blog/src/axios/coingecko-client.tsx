import axios from "axios";

export const coingeckoClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  withCredentials: false,
});
