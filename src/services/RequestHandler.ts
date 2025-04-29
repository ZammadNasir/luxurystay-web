import { get, patch, post } from "./HttpProvider";

const getFromApi = (url: any, permission_name: any) =>
  get(url, permission_name, null);

const postFromApi = (url: any, data: any, permission_name: any) =>
  post(url, data, permission_name, null);

const patchFromApi = (url: any, data: any, permission_name: any) =>
  patch(url, data, permission_name, null);

  const postFromImage = (url: any, data: any, permission_name: any, config: any) =>
    post(url, data, permission_name, config);

export const apiServices = {
  getFromApi,
  postFromApi,
  patchFromApi,
  postFromImage
};
export default apiServices;
