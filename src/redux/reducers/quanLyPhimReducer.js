import { GET_ALL_BANNER } from "../actions/types/homeBannerType";
import { GET_MOVIE_LIST } from "../actions/types/movieListType";

const defaultState = {
  arrBanner: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
  movieList: [],
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

    default:
      return state;
  }
};
