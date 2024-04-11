import axios from "axios";
import { request } from "../utils";

const getAllBillsAPI = () => {
  return request({
    url: "/bill/all",
    method: "GET",
  });
};
const addOneBillAPI = (data: any) => {
  return request({
    url: "/bill/add",
    method: "POST",
    data,
  });
};

const acceptOneBillAPI = (id: string) => {
  return request({
    url: "/bill/accept",
    method: "PUT",
    // data: id,
    params: { id: id },
  });
};

const rejectOneBillAPI = (id: string) => {
  return request({
    url: "/bill/reject",
    method: "PUT",
    params: { id: id },
    // query: { id: id },
  });
};

const luanchAPI = (img: any) => {
  return axios.post(
    "https://aip.baidubce.com/rest/2.0/ocr/v1/vat_invoice",
    {
      image: img,
      access_token:
        "Bearer 24.96f24d5d73c93a8737aa33b01f7170ef.2592000.1714789874.282335-48129502",
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

export {
  getAllBillsAPI,
  addOneBillAPI,
  acceptOneBillAPI,
  rejectOneBillAPI,
  luanchAPI,
};
