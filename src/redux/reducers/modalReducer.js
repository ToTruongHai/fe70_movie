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
<<<<<<< HEAD
    case OPEN_FORM: {
      for (let key in action) {
        // if (key == "component") {
        //   // state[key] = action[key];
        //   console.log(state[key]);
        // }
        state[key] = action[key];
=======
    case "OPEN_FORM": {
      if (action.typeModal === "TRAILER") {
        let oldSrc = action.trailerSrc;
        if (oldSrc.includes("watch?v=")) {
          oldSrc = oldSrc.replace(
            /watch[&\/\\#, +()$~%.'":*?<>{}]v=/g,
            "embed/"
          );
          if (oldSrc.includes("&")) {
            oldSrc = oldSrc.substr(0, oldSrc.indexOf("&"));
          }
          if (!oldSrc.includes("https://")) {
            oldSrc = "https://" + oldSrc
          }
        }
        state.trailerSrc = oldSrc;
>>>>>>> f65bae95b311cbc277669482b57e91c692e0263c
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
