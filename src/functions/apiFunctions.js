import { DOMAIN, http } from "../util/setting";
export const apiGet = (url, type) => {
  return async (dispatch) => {
    let result = await http.get(DOMAIN + url);
    dispatch({
      type,
      content: result.data.content,
    });
  };
};
