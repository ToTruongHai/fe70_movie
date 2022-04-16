import React from "react";

const defaultState = {
  component: <div></div>,
  titleModal: "",
  handleSubmit: () => {
    alert("Default submit");
  },
  isOpen: false,
  trailerSrc: "",
};

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN_FORM": {
      state.component = action.component;
      state.titleModal = action.titleModal;
      state.handleSubmit = action.handleSubmit;
      state.isOpen = action.isOpen;
      state.trailerSrc = action.trailerSrc;
      return { ...state };
    }
    case "SET_SRC": {
      state.trailerSrc = action.trailerSrc;

      return { ...state };
    }
    default:
      return state;
  }
};
