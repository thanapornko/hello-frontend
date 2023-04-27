import axios from "../configs/axios";

export const addUserInfo = input =>
  axios.patch("/user/info", input);

export const addUserPhysical = input =>
  axios.post("/user/physical", input);
