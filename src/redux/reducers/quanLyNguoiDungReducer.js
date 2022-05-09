import { ACCESSTOKEN, USER_LOGIN } from "../../util/setting";
import {
  GET_USER_HISTORY,
  GET_USER_LIST,
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
};

export const quanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN: {
      let userLogin = action.content;
      let token = userLogin.accessToken;
      localStorage.setItem(USER_LOGIN, JSON.stringify(userLogin));
      localStorage.setItem(ACCESSTOKEN, token);
      state.userLogin = userLogin;
      return { ...state };
    }
    case LOGOUT: {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(ACCESSTOKEN);
      state.userLogin = "";
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
    default:
      return state;
  }
};
