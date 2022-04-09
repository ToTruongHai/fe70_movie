import React from "react";

const defaultState = {
  component: <div></div>,
  titleModal: '',
  handleSubmit: () => {
    alert("Default submit");
  },
};

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_FORM": {
      state.component = action.component;
      state.titleModal = action.titleModal;
      state.handleSubmit = action.handleSubmit;
      return { ...state };
    }
    default:
      return state;
  }
};
