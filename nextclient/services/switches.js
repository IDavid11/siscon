import { instance } from "./axios";
import { apiUrls } from "./urls";

export const obterSwitches = async () => {
  const { data } = await instance.get(apiUrls.urlObterSwitches);
  return data;
};
