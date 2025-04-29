import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";

export const getApiRequestHeader = async () => {
  /**Will get token from reducers */
  const authtoken = JSON.parse((await localStorage.getItem("token")) as any);
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: authtoken ? `Bearer ${authtoken}` : "",
  };
};
let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
}) as any;

export const updateHeaders = async () => {
  const header = await getApiRequestHeader();
  instance.defaults.headers = header as any;
};

export const request = async ({ method, url, data, headers }: any) => {
  if (headers === undefined) {
    await updateHeaders();
  } else {
    if (headers["Content-Type"] === "multipart/form-data") {
      instance.defaults.headers = {
        ...instance.defaults.headers,
        "Content-Type": headers["Content-Type"],
      };
    }
  }

  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error: any) {
    return error.response?.data;
  }

  return {data: response?.data, status:response?.status};
};

export const get = (url: string, permission_name: string, config: any) => {
  return request({
    method: "get",
    url,
    data: {},
    ...config,
  });
};

export const post = (
  url: string,
  data: any,
  permission_name: string,
  config: any
) => {
  return request({
    method: "post",
    url,
    data,
    ...config,
  });
};

export const patch = (
  url: string,
  data: any,
  permission_name: string,
  config: any
) => {
  return request({
    method: "patch",
    url,
    data,
    ...config,
  });
};
