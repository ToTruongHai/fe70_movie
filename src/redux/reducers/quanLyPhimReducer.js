import { act } from "react-dom/test-utils";
import { GP } from "../../util/setting";
import {
  GET_ALL_BANNER,
  GET_MOVIE_DETAIL,
  GET_MOVIE_LIST,
  PHIM_PHAN_TRANG,
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
  movieDetail: {
    maPhim: 1282,
    tenPhim: "Ban tay diet quy 4",
    biDanh: "ban-tay-diet-quy-4",
    trailer: "tu tu",
    hinhAnh:
      "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy-2_gp00.png",
    moTa: "Cuoc chien sinh tu hohi",
    maNhom: GP,
    hot: true,
    dangChieu: true,
    sapChieu: true,
    ngayKhoiChieu: "2021-09-06T22:14:50.227",
    danhGia: 10,
  },
  dataAdminPhims: [],
  totalCount: 0,
  form: {
    maPhim: 0,
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    maNhom: GP,
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: true,
    hot: true,
    danhGia: 10,
    hinhAnh: "",
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
    case PHIM_PHAN_TRANG: {
      state.dataAdminPhims = action.content.items;
      state.totalCount = action.content.totalCount;
      return { ...state };
    }
    default:
      return state;
  }
};
