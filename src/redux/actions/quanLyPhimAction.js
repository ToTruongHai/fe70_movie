import axios from "axios";
import { result } from "lodash";
import { alertSuccess, alertWarning } from "../../functions/alertFunctions";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPost2,
} from "../../functions/apiFunctions";
import { DOMAIN, GP, http } from "../../util/setting";
import {
  GET_ALL_BANNER,
  GET_MOVIE_DETAIL,
  GET_MOVIE_LIST,
  LAY_THONG_TIN_PHIM,
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

export const getMovieListAction = (tenPhim = null) => {
  let url = tenPhim
    ? `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GP}&tenPhim=${tenPhim}`
    : "/api/QuanLyPhim/LayDanhSachPhim?maNhom=" + GP;
  return apiGet(url, GET_MOVIE_LIST);
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
  tenPhim = "",
  soTrang = 1,
  soPhanTuTrenTrang = 10
) => {
  let url = tenPhim
    ? `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GP}&tenPhim=${tenPhim}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    : `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GP}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`;
  // let url = `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GP}&tenPhim=${tenPhim}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`;
  return apiGet(url, PHIM_PHAN_TRANG);
};

export const themPhimAction = (data) => {
  return apiPost2(
    "/api/QuanLyPhim/ThemPhimUploadHinh",
    data,
    getMovieListAction()
  );
};

export const layThongTinPhimAction = (maPhim) => {
  return apiGet(
    "/api/QuanLyPhim/LayThongTinPhim?MaPhim=" + maPhim,
    LAY_THONG_TIN_PHIM
  );
};

export const capNhatPhimAction = (data) => {
  return apiPost2(
    "/api/QuanLyPhim/CapNhatPhimUpload",
    data,
    getMovieListAction()
  );
};

export const xoaPhimAction = (maPhim) => {
  return apiDelete(
    `/api/QuanLyPhim/XoaPhim?maphim=${maPhim}`,
    getMovieListAction()
  );
};

export const xoaPhimsAction = (arr) => {
  return async (dispatch) => {
    try {
      let arrPromise = arr.map((item) => {
        return http.delete(DOMAIN + `/api/QuanLyPhim/XoaPhim?maphim=${item}`);
      });
      Promise.all(arrPromise).then((result) => {
        alertSuccess("Xử lý thành công");
        dispatch(getMovieListAction());
      });
    } catch (err) {
      alertWarning("Đã xảy ra lỗi");
    }
  };
};
