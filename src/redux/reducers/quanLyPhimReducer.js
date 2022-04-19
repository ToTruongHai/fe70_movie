import {
  GET_ALL_BANNER,
  GET_MOVIE_DETAIL,
  GET_MOVIE_LIST,
  GET_MOVIE_COMMING,
} from "../actions/types/quanLyPhimType";
// import { GET_MOVIE_LIST } from "../actions/typeS/quanLyPhimType";

const defaultState = {
  arrBanner: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
  movieList: [],
  movieCommingList: [],
  movieDetail: {
    maPhim: 1282,
    tenPhim: "Ban tay diet quy 4",
    biDanh: "ban-tay-diet-quy-4",
    trailer: "tu tu",
    hinhAnh:
      "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy-2_gp00.png",
    moTa: "Cuoc chien sinh tu hohi",
    maNhom: "GP00",
    hot: true,
    dangChieu: true,
    sapChieu: true,
    ngayKhoiChieu: "2021-09-06T22:14:50.227",
    danhGia: 10,
  },
};

export const quanLyPhimReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_BANNER: {
      state.arrBanner = action.arrBanner;
      return { ...state };
    }
    case GET_MOVIE_LIST: {
      state.movieList = action.content;
      return { ...state };
    }
    case GET_MOVIE_DETAIL: {
      state.movieDetail = action.detail;
      return { ...state };
    }
    case GET_MOVIE_COMMING: {
      state.movieCommingList = action.content;
      return { ...state };
    }
    default:
      return state;
  }
};
