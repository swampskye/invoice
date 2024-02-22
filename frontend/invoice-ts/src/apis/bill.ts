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

export { getAllBillsAPI, addOneBillAPI, acceptOneBillAPI, rejectOneBillAPI };
