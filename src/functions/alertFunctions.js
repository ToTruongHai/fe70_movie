import { message } from "antd";
import Swal from "sweetalert2";

export const alertSuccess = (title = null, message = null) => {
  Swal.fire({
    title: title ? title : "Xử lý thành công",
    text: message ? message : null,
    icon: "success",
    timer: 1500,
    showCancelButton: false,
    showConfirmButton: false,
  });
};

export const alertWarning = (title = null, message = null) => {
  Swal.fire({
    title: title ? title : "Đã xảy ra lỗi, vui lòng thử lại",
    text: message ? message : null,
    icon: "error",
    timer: 1500,
    showCancelButton: false,
    showConfirmButton: false,
  });
};
