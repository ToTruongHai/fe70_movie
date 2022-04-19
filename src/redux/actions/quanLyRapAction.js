import { apiGet } from "../../functions/apiFunctions";
import { DOMAIN, http } from "../../util/setting";
import {
  GET_ALL_MOVIE_THEATER,
  GET_THEATER_CLUSTER,
  LAY_THONG_TIN_LICH_CHIEU_HE_THONG,
  GET_MOVIE_SCHEDULE,
} from "./types/quanLyRapType";

export const getAllMovieTheaterAction = () => {
  return apiGet("/api/QuanLyRap/LayThongTinHeThongRap", GET_ALL_MOVIE_THEATER);
};

export const getTheaterCluster = (maHeThongRap) => {
  return apiGet(
    "/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=" + maHeThongRap,
    GET_THEATER_CLUSTER
  );
};

export const getScheduleTheater = () => {
  return apiGet(
    "/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01",
    LAY_THONG_TIN_LICH_CHIEU_HE_THONG
  );
};

export const getMovieSchedule = (maPhim) => {
  return async (dispatch) => {
    try {
      let result = await http.get(
        "/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=" + maPhim
      );
      dispatch({
        type: GET_MOVIE_SCHEDULE,
        movieSchedule: result.data.content,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
