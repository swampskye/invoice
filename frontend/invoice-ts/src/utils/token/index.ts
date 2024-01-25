const TOKENKEY = "token";

const setToken = (token: string) => {
  console.log("setToken");
  console.log(token);
  localStorage.setItem(TOKENKEY, token);
};
const getToken = () => {
  return localStorage.getItem(TOKENKEY);
};
const removeToken = () => {
  localStorage.removeItem(TOKENKEY);
};

export { setToken, getToken, removeToken };
