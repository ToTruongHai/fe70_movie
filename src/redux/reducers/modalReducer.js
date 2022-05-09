import React from "react";
import { OPEN_FORM, SET_FUNCTION } from "../actions/types/modalType";

const defaultState = {
  // Component: React.Fragment,
  component: <div></div>,
  titleModal: "",
  handleSubmit: () => {
    alert("Default submit");
  },
  maxWidth: null,
  isOpen: false,
  trailerSrc: "",
  typeModal: "",
};

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_FORM: {
      for (let key in action) {
        // if (key == "component") {
        //   // state[key] = action[key];
        //   console.log(state[key]);
        // }
        state[key] = action[key];
      }
      // state = { ...action };

      return { ...state };
    }
    case "SET_SRC": {
      state.trailerSrc = action.trailerSrc;

      return { ...state };
    }
    case SET_FUNCTION: {
      state.handleSubmit = action.handleSubmit;
      return { ...state };
    }
    default:
      return state;
  }
};
