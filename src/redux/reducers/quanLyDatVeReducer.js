import { ThongTinPhongVe } from "../../_core/models/ThongTinPhongVe";
import {
  BOOK_SEAT,
  COMPLETE_CHECKOUT,
  GET_SEAT_LIST,
  SWITCH_TAB,
} from "../actions/types/quanLyDatVeType";

const defaultState = {
  seatList: new ThongTinPhongVe(),
  danhSachGheDangDat: [],
  danhSachGheKhachDangDat: [
    // {maGhe: 91550}, {maGhe: 91551}
  ],
  tabActive: "1",

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

    case COMPLETE_CHECKOUT: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }

    case SWITCH_TAB:{
      state.tabActive = "2";
      return {...state}
    }
    case 'CHANGE_BACK_TAB': {
      state.tabActive = action.number;
      return {...state}
    }

    default:
      return state;
  }
};
