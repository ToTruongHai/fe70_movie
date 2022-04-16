import axios from "axios";
import { DOMAIN, http } from "../../util/setting";
import { GET_ALL_BANNER, GET_MOVIE_DETAIL } from "./types/quanLyPhimType";
import { GET_MOVIE_LIST } from "./types/movieListType";

export const getAllBannerAction = () => {
  return async (dispatch) => {
    try {
      let result = await http.get("/api/quanlyphim/LayDanhSachBanner");
      dispatch({
        type: GET_ALL_BANNER,
        arrBanner: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const getMovieListAction = () => {
  return async (dispatch) => {
    try {
      let result = await http.get(
        "/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01"
      );
      dispatch({
        type: GET_MOVIE_LIST,
        content: result.data.content,
      });
    } catch (err) {
      console.log(err.response?.data);
    }
  };
};

export const getMovieDetailAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await http.get(
        "/api/QuanLyPhim/LayThongTinPhim?MaPhim=" + maPhim
      );
      dispatch({
        type: GET_MOVIE_DETAIL,
        detail: result.data.content,
      });
    } catch (err) {
      console.log(err.response?.data);
    }
  };
};
