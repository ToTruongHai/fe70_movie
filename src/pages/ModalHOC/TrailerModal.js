import React from "react";
import { useSelector } from "react-redux";

export default function TrailerModal(props) {
  const { component, handleSubmit, titleModal, isOpen } = useSelector(
    (rootReducer) => rootReducer.modalReducer
  );

  return (
    <div
      className="modal fade bd-example-modal-lg"
      id="trailerModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">{component}</div>
      </div>
    </div>
  );
}
