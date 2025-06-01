import axios from "axios";

export const coingeckoClient = (() => {
  const client = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
    withCredentials: false,
  });

  return client;
})();
