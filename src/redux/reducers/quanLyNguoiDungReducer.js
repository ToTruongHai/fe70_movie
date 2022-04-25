import { ACCESSTOKEN, USER_LOGIN } from "../../util/setting";
import { LOGIN, LOGOUT } from "../actions/types/quanLyNguoiDungType";

let userLogin = "";
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin,
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
    default:
      return state;
  }
};
