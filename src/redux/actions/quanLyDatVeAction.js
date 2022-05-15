import { http } from "../../util/setting";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./loadingAction";
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/loadingType";
import {
  CHECKOUT_SEAT,
  COMPLETE_CHECKOUT,
  GET_SEAT_LIST,
  SWITCH_TAB,
} from "./types/quanLyDatVeType";

export const postBookSeatAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await http.post("/api/QuanLyDatVe/DatVe", thongTinDatVe);
      //đặt thành công gọi lại api lấy lại seat
      await dispatch(getSeatListAction(thongTinDatVe.maLichChieu));
      await dispatch({ type: COMPLETE_CHECKOUT });
      await dispatch({ type: HIDE_LOADING });
      dispatch({ type: SWITCH_TAB });
    } catch (error) {
      console.log("error: ", error);
      dispatch(hideLoadingAction);
    }
  };
};

export const getSeatListAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      let result = await http.get(
        "/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=" + maLichChieu
      );
      dispatch({
        type: GET_SEAT_LIST,
        seatList: result.data.content,
      });
      dispatch(hideLoadingAction);
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
