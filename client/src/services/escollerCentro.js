import { instance } from "./axios";

export const escollerCentro = async (index) => {
  const { data } = await instance.post(
    "http://127.0.0.1:8000/centros/escoller-centro",
    {
      index: index,
    }
  );

  return data;
};
