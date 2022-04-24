import { ACCESSTOKEN, http, USER_LOGIN } from "../../util/setting";
import Swal from "sweetalert2";
import "../../assets/styles/Layout.css";
import { apiPost } from "../../functions/apiFunctions";
import { LOGIN } from "./types/quanLyNguoiDungType";
import Login from "../../Components/Login/Login";

export const loginAction = (data) => {
  return apiPost(
    "/api/QuanLyNguoiDung/DangNhap",
    data,
    function (result, dispatch) {
      document.getElementById("closeModal").click();
      dispatch({ type: LOGIN, content: result });
    }
  );
};

export const registerAction = (data) => {
  return apiPost(
    "/api/QuanLyNguoiDung/DangKy",
    data,
    function (result, dispatch) {
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
    }
  );
};
