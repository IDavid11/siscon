import { instance } from "./axios";

export const buscarCentros = async () => {
  const { data } = await instance.get("http://127.0.0.1:8000/centros/");
  return data;
};
