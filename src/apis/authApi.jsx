import axios from "../configs/axios";

export const register = input =>
  axios.post("/auth/register", input);

export const login = input =>
  axios.post("/auth/login", input);
