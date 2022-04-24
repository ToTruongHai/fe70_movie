import { DOMAIN, http } from "../util/setting";
import Swal from "sweetalert2";
export const apiGet = (url, type) => {
  return async (dispatch) => {
    let result = await http.get(DOMAIN + url);
    dispatch({
      type,
      content: result.data.content,
    });
  };
};

export const apiPost = (url, data = null, callback = null) => {
  return async (dispatch) => {
    try {
      let result = await http.post(DOMAIN + url, data);
      if (callback) {
        callback(result, dispatch);
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Rất tiếc!",
        text: err.response?.data.content,
        icon: "error",
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
    }
  };
};
