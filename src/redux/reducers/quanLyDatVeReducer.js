import { ThongTinPhongVe } from "../../_core/models/ThongTinPhongVe";
import { BOOK_SEAT, GET_SEAT_LIST } from "../actions/types/quanLyDatVeType";

const defaultState = {
  seatList: new ThongTinPhongVe(),
  danhSachGheDangDat: [],
};

export const quanLyDatVeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_SEAT_LIST: {
      state.seatList = action.seatList;
      return { ...state };
    }
    case BOOK_SEAT: {
      let danhSachGheDangDatNEW = [...state.danhSachGheDangDat];
      let index = danhSachGheDangDatNEW.findIndex(
        (ghe) => ghe.maGhe === action.bookSeat.maGhe
      );
      if (index != -1) {
        danhSachGheDangDatNEW.splice(index, 1);
      } else {
        danhSachGheDangDatNEW.push(action.bookSeat);
      }

      state.danhSachGheDangDat = danhSachGheDangDatNEW;
      console.log(state.danhSachGheDangDat);

      return { ...state };
    }

    default:
      return state;
  }
};
