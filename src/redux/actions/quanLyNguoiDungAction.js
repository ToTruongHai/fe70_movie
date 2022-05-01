import { ACCESSTOKEN, http, USER_LOGIN } from "../../util/setting";
import Swal from "sweetalert2";
import "../../assets/styles/Layout.css";
import { apiPost } from "../../functions/apiFunctions";
import { GET_USER_HISTORY, LOGIN, LOGOUT } from "./types/quanLyNguoiDungType";
import Login from "../../Components/Login/Login";

export const loginAction = (data) => {
  return apiPost("/api/QuanLyNguoiDung/DangNhap", data, (content, dispatch) => {
    document.getElementById("closeModal").click();
    dispatch({ type: LOGIN, content });
  });
};

export const registerAction = (data) => {
  return apiPost("/api/QuanLyNguoiDung/DangKy", data, (content, dispatch) => {
    Swal.fire({
      title: "Đăng ký tài khoản thành công!",
      icon: "success",
      timer: 3000,
      showCancelButton: false,
      showConfirmButton: false,
    }).then(
      function () {},
      function (dismiss) {
        if (dismiss === "timer") {
        }
      }
    );
    dispatch({
      type: "OPEN_FORM",
      component: <Login />,
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
      let result = await http.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
      dispatch({
        type: GET_USER_HISTORY,
        userSeatHistory: result.data.content,
      });
      console.log(result.data.content);
      console.log("result: ", result);
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
