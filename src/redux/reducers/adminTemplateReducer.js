import { LOAD_COMPONENT } from "../actions/types/adminTemplateType";

const initialState = {
  title: "",
  buttons: [],
  columns: [],
  dataSource: [],
  selectedRowKeys: [],
};

export const adminTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMPONENT: {
      for (let key in action.payload) {
        state[key] = action.payload[key];
      }
      return { ...state };
    }
    default:
      return state;
  }
};
