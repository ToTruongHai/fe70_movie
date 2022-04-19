import {
  GET_ALL_MOVIE_THEATER,
  GET_THEATER_CLUSTER,
  LAY_THONG_TIN_LICH_CHIEU_HE_THONG,
} from "../actions/types/quanLyRapType";

const defaultState = {
  movieTheaterList: [],
  theaterClusters: [],
  thongTinLichChieu: [],
};

export const quanLyRapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIE_THEATER: {
      state.movieTheaterList = action.content;
      return { ...state };
    }
    case GET_THEATER_CLUSTER: {
      state.theaterClusters = action.content;
      return { ...state };
    }
    case LAY_THONG_TIN_LICH_CHIEU_HE_THONG: {
      state.thongTinLichChieu = action.content;
      return { ...state };
    }
    default:
      return state;
  }
};
