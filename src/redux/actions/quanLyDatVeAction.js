import { http } from "../../util/setting";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { CHECKOUT_SEAT, GET_SEAT_LIST } from "./types/quanLyDatVeType";

export const postBookSeatAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch) => {
    try {
      let result = await http.post(
        "/api/QuanLyDatVe/DatVe", thongTinDatVe
      );
      console.log("result: ", result);

    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const getSeatListAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      let result = await http.get(
        "/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=" + maLichChieu
      );
      dispatch({
        type: GET_SEAT_LIST,
        seatList: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
