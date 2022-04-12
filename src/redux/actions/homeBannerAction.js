import axios from "axios";
import { DOMAIN, http } from "../../util/setting";
import { GET_ALL_BANNER } from "./types/homeBannerType";

export const getAllBannerAction = () => {
  return async (dispatch) => {
    try {
      let result = await http.get('/api/quanlyphim/laydanhsachphim?maNhom=GP01');
      dispatch({
          type: GET_ALL_BANNER,
          arrBanner: result.data.content
      })
  } catch (error) {
      console.log('error: ', error)
  }
  };
};