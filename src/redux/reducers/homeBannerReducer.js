import { GET_ALL_BANNER } from "../actions/types/homeBannerType";

const defaultState = {
  arrBanner: [{
    maBanner: 1,
    maPhim: 1282,
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
  }],
};

export const homeBannerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_BANNER: {
      state.arrBanner = action.arrBanner;
      return { ...state };
    }

    default:
      return state;
  }
};
