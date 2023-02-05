import { instance } from "./axios";

export const fetchListado = async (listado) => {
  const { data } = await instance.get(
    `http://127.0.0.1:8000/listados/${listado}`
  );

  return data;
};
