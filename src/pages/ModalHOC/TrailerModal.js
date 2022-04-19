import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TrailerModal(props) {
  const { component, handleSubmit, titleModal, isOpen } = useSelector(
    (rootReducer) => rootReducer.modalReducer
  );
  let [heightModal, setHeightModal] = useState(0);

  let setHeightModalFunction = () => {
    let { innerWidth } = window;
    setHeightModal((innerWidth * 0.8 * 9) / 16);
  };

  useEffect(() => {
    window.addEventListener("resize", setHeightModalFunction, false);
    window.onload = setHeightModalFunction();
  }, []);

  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="trailerModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg"
        style={{ maxWidth: "80%", height: `${heightModal}px` }}
      >
        <div className="modal-content h-100">{component}</div>
      </div>
    </div>
  );
}
