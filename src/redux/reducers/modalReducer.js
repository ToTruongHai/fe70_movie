import React from "react";

const defaultState = {
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
          console.log("abc", oldSrc);
        }
        state.trailerSrc = oldSrc;
      }

      state.component = action.component;
      state.titleModal = action.titleModal;
      state.handleSubmit = action.handleSubmit;
      state.isOpen = action.isOpen;
      state.maxWidth = action.maxWidth;

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
