import { request } from "../utils";

const loginApi = (credential: any) => {
  return request({
    url: "/user/login",
    method: "POST",
    data: credential,
  });
};

const registerApi = (credential: any) => {
  return request({
    url: "/user/register",
    method: "POST",
    data: credential,
  });
};

const getProfileAPI = () => {
  return request({
    url: "/user/profile",
    method: "GET",
  });
};

const getAllUsersAPI = () => {
  return request({
    url: "/user/all",
    method: "GET",
  });
};

export { loginApi, registerApi, getProfileAPI, getAllUsersAPI };
