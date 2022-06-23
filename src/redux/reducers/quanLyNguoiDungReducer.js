import { ACCESSTOKEN, USER_LOGIN } from "../../util/setting";
import {
  GET_USER_HISTORY,
  GET_USER_INFO,
  GET_USER_LIST,
  GET_USER_TYPE,
  LOGIN,
  LOGOUT,
} from "../actions/types/quanLyNguoiDungType";

let userLogin = "";
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin,
  userSeatHistory: [],
  userList: [],
  userForm: {
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  },
  userType: [],
};

export const quanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN: {
      let userLogin = action.content;
      let token = userLogin.accessToken;
      localStorage.setItem(USER_LOGIN, JSON.stringify(userLogin));
      localStorage.setItem(ACCESSTOKEN, token);
      state.userLogin = userLogin;
      state.userForm = {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP01",
        maLoaiNguoiDung: "",
        hoTen: "",
      };
      state.userType = [];
      return { ...state };
    }
    case LOGOUT: {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(ACCESSTOKEN);
      state.userSeatHistory = [];
      state.userLogin = "";
      state.userList = [];
      return { ...state };
    }
    case GET_USER_HISTORY: {
      state.userSeatHistory = action.userSeatHistory;
      return { ...state };
    }
    case GET_USER_LIST: {
      state.userList = action.userList;
      return { ...state };
    }
    case GET_USER_TYPE: {
      state.userType = action.userType;
      return { ...state };
    }
    case GET_USER_INFO: {
      state.userForm = action.userInfo;

      return { ...state };
    }
    default:
      return state;
  }
};
