import { GET_ALL_MOVIE_THEATER } from "../actions/types/quanLyRapType";

const defaultState = {
  movieTheaterList: [],
};

export const quanLyRapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_MOVIE_THEATER: {
      state.movieTheaterList = action.content;
      return { ...state };
    }
    default:
      return state;
  }
};
