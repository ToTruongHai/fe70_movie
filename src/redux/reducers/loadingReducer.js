const defaultState = {
  isLoading: false,
};

export const loadingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "DISPLAY_LOADING":
      {
        state.isLoading = true;
      }
      return { ...state };
    case "HIDE_LOADING":
      {
        state.isLoading = false;
      }
      return { ...state };
    default:
      return { ...state };
  }
};
