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

export { getAllBillsAPI, addOneBillAPI };
