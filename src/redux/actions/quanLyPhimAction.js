import axios from "axios";
import { apiDelete, apiGet } from "../../functions/apiFunctions";
import { GP, http } from "../../util/setting";
import {
  GET_ALL_BANNER,
  GET_MOVIE_DETAIL,
  GET_MOVIE_LIST,
  PHIM_PHAN_TRANG,
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

export const getDataAdminPhimsAction = (
  tenPhim = null,
  soTrang = null,
  soPhanTuTrenTrang = null
) => {
  let url = tenPhim
    ? `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GP}&tenPhim=${tenPhim}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    : `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GP}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`;
  return apiGet(url, PHIM_PHAN_TRANG);
};

export const xoaPhimAction = (maPhim) => {
  return apiDelete(
    `/api/QuanLyPhim/XoaPhim?maphim=${maPhim}`,
    getDataAdminPhimsAction
  );
};
