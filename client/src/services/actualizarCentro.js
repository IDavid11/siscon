import { instance } from "./axios";
import { apiUrls } from "./urls";

export const actualizarCentro = async (centro) => {
  const { data } = await instance.post(apiUrls.urlActualizarCentro, {
    centro: centro,
  });

  return data;
};
