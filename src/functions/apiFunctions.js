import { DOMAIN, http } from "../util/setting";
import Swal from "sweetalert2";
import { alertSuccess, alertWarning } from "./alertFunctions";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../redux/actions/loadingAction";
export const apiGet = (url, type) => {
  return async (dispatch) => {
    dispatch(displayLoadingAction);
    let result = await http.get(DOMAIN + url);
    await dispatch({
      type,
      content: result.data.content,
    });
    dispatch(hideLoadingAction);
  };
};

export const apiPost = (url, data = null, callback = null) => {
  return async (dispatch) => {
    try {
      let result = await http.post(DOMAIN + url, data);
      if (callback) {
        callback(result.data.content, dispatch);
      }
    } catch (err) {
      console.log(err.response);
      alertWarning(
        "Rất tiếc!",
        err.response?.data.content
          ? err.response?.data.content
          : "Đã xả ra lỗi, vui lòng thử lại"
      );
    }
  };
};

export const apiPost2 = (url, data = null, callback = null) => {
  return async (dispatch) => {
    try {
      let result = await http.post(DOMAIN + url, data);
      document.getElementById("closeModal").click();
      alertSuccess(result.data.message);
      if (callback) {
        dispatch(callback);
      }
    } catch (err) {
      console.log(err.response);
      alertWarning(
        "Rất tiếc!",
        err.response?.data.content
          ? err.response?.data.content
          : "Đã xả ra lỗi, vui lòng thử lại"
      );
    }
  };
};

export const apiPut = (url, data = null, callback = null) => {
  return async (dispatch) => {
    try {
      let result = await http.put(DOMAIN + url, data);
      document.getElementById("closeModal").click();
      alertSuccess(result.data.message);
      if (callback) {
        dispatch(callback);
      }
    } catch (err) {
      console.log(err.response);
      alertWarning(
        "Rất tiếc!",
        err.response?.data.content
          ? err.response?.data.content
          : "Đã xả ra lỗi, vui lòng thử lại"
      );
    }
  };
};

export const apiDelete = (url, callback) => {
  return async (dispatch) => {
    try {
      let result = await http.delete(DOMAIN + url);
      if (callback) {
        dispatch(callback);
      }
      alertSuccess(result.data.message);
    } catch (err) {
      Swal.fire({
        title: "Rất tiếc!",
        text: err.response?.data.content
          ? err.response?.data.content
          : "Đã xả ra lỗi, vui lòng thử lại",
        icon: "error",
        timer: 1000,
        showCancelButton: false,
        showConfirmButton: false,
      }).then(
        function () {},
        function (dismiss) {
          if (dismiss === "timer") {
          }
        }
      );
    }
  };
};
