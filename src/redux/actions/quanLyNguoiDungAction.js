import { ACCESSTOKEN, GP, http, USER_LOGIN } from "../../util/setting";
import Swal from "sweetalert2";
import "../../assets/styles/Layout.css";
import { apiPost, apiPost2, apiPut } from "../../functions/apiFunctions";
import {
  GET_USER_HISTORY,
  GET_USER_INFO,
  GET_USER_LIST,
  GET_USER_TYPE,
  LOGIN,
  LOGOUT,
} from "./types/quanLyNguoiDungType";
import Login from "../../Components/Login/Login";
import { DISPLAY_LOADING } from "./types/loadingType";
import { displayLoadingAction, hideLoadingAction } from "./loadingAction";
import { alertSuccess } from "../../functions/alertFunctions";

export const loginAction = (data) => {
  return apiPost("/api/QuanLyNguoiDung/DangNhap", data, (content, dispatch) => {
    document.getElementById("closeModal").click();
    dispatch({ type: LOGIN, content });
    Swal.fire({
      title: "Đăng nhập thành công!",
      icon: "success",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    }).then(function (dismiss) {
      if (dismiss === "timer") {
      }
    });
  });
};

export const registerAction = (data) => {
  return apiPost("/api/QuanLyNguoiDung/DangKy", data, (content, dispatch) => {
    document.getElementById("closeModal").click();
    Swal.fire({
      title: "Đăng ký tài khoản thành công!",
      icon: "success",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    }).then(function (dismiss) {
      if (dismiss === "timer") {
      }
    });
  });
};

export const logoutAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};

export const getUserSeatHistory = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await http.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
      await dispatch({
        type: GET_USER_HISTORY,
        userSeatHistory: result.data.content,
      });
      await dispatch(hideLoadingAction);
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const adminGetUserListAction = (tenNguoiDung = null) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let url = tenNguoiDung
        ? `api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GP}&tuKhoa=${tenNguoiDung}`
        : "api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=" + GP;
      let result = await http.get(url);
      await dispatch({
        type: GET_USER_LIST,
        userList: result.data.content,
      });
      await dispatch(hideLoadingAction);
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const adminDeleteUsersAction = (user) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await user.map((item) => {
        return http.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${item}`);
      });
      Promise.all(result).then(() => {
        alertSuccess("Xử lý thành công");
        dispatch(adminGetUserListAction());
      });
      await dispatch(hideLoadingAction);
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const adminDeleteUserAction = (user) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await http.delete(
        "api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=" + user
      );
      await dispatch(adminGetUserListAction());
      await dispatch(hideLoadingAction);
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const adminGetUserTypeAction = () => {
  return async (dispatch) => {
    try {
      let result = await http.get(
        "api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"
      );
      await dispatch({
        type: GET_USER_TYPE,
        userType: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const adminAddUserAction = (userForm) => {
  let object = {};
  userForm.forEach(function (value, key) {
    object[key] = value;
  });
  let json = object;
  return apiPost2(
    "/api/QuanLyNguoiDung/ThemNguoiDung",
    json,
    adminGetUserListAction()
  );
};

export const adminGetUserInfoAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await http.post(
        "api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=" + taiKhoan
      );
      await dispatch({
        type: GET_USER_INFO,
        userInfo: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const adminEditUserInfoAction = (userForm) => {
  let object = {};
  userForm.forEach(function (value, key) {
    object[key] = value;
  });
  let json = object;
  return apiPost2(
    "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    json,
    adminGetUserListAction()
  );
};
