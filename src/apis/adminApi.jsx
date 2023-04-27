import axios from "../configs/axios";

export const getAllUser = () => axios.get("/admin");

export const deleteUser = id =>
  axios.delete(`/admin/${id}`);

export const editUser = (id, updatedUser) =>
  axios.patch(`/admin/${id}`, updatedUser);

export const getAllRecord = () =>
  axios.get("/admin/record");
