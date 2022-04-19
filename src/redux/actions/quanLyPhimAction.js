import axios from "axios";
import { apiGet } from "../../functions/apiFunctions";
import { http } from "../../util/setting";
import {
  GET_ALL_BANNER,
  GET_MOVIE_DETAIL,
  GET_MOVIE_LIST,
  GET_MOVIE_COMMING,
} from "./types/quanLyPhimType";
// import { GET_MOVIE_LIST } from "./types/movieListType";

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
  return apiGet("/api/QuanLyPhim/LayDanhSachPhim", GET_MOVIE_LIST);
};

export const getMovieCommingListAction = () => {
  return apiGet(
    "/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP02",
    GET_MOVIE_COMMING
  );
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
