import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { getProfileAPI, loginApi, registerApi } from "../../apis/user";
import {
  getToken as _getToken,
  setToken as _setToken,
  removeToken,
} from "../../utils/token";
const userStore = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    token: _getToken() || "",
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    clearToken(state) {
      state.userInfo = {};
      state.token = "";
      removeToken();
    },
  },
});

const { setUserInfo, setToken, clearToken } = userStore.actions;

const fetchLogin: any = (credential: any) => {
  return async (dispatch: Dispatch) => {
    console.log(credential);
    const res = (await loginApi(credential)) as any;
    console.log("generate a token", res);
    dispatch(setToken(res.token));
  };
};

const fetchRegister: any = (credential: any) => {
  return async (dispatch: Dispatch) => {
    console.log(credential);
    const res = (await registerApi(credential)) as any;
    // console.log("generate a token", res);
    // dispatch(setToken(res.token));
  };
};

const fetchUserInfo: any = () => {
  return async (dispatch: Dispatch) => {
    const res = (await getProfileAPI()) as any;
    dispatch(setUserInfo(res));
  };
};

export { setUserInfo, fetchLogin, fetchRegister, clearToken, fetchUserInfo };
export default userStore.reducer;
