import { apiGet } from "../../functions/apiFunctions";
import { GET_ALL_MOVIE_THEATER } from "./types/quanLyRapType";

export const getAllMovieTheaterAction = () => {
  return apiGet(
    "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
    GET_ALL_MOVIE_THEATER
  );
};
