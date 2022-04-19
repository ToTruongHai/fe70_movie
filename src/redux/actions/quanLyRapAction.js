import axios from "axios";
import { DOMAIN, http } from "../../util/setting";
import { GET_MOVIE_SCHEDULE } from "./types/quanLyRapType";


export const getMovieSchedule = (maPhim) => {
    return async (dispatch) => {
      try {
        let result = await http.get("/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=" + maPhim);
        dispatch({
          type: GET_MOVIE_SCHEDULE,
          movieSchedule: result.data.content,
        });
      } catch (error) {
        console.log("error: ", error);
      }
    };
  };