import { Button } from "antd";
import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import ButtonPrimary from "../../Components/Elements/ButtonPrimary/ButtonPrimary";

export default function ModalHOC(props) {
  const { component, handleSubmit, titleModal, maxWidth, typeModal } =
    useSelector((rootReducer) => rootReducer.modalReducer);

  return (
    <div
      className="modal fade"
      id="modelId"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div
        className="modal-dialog mx-auto"
        role="document"
        style={maxWidth ? { maxWidth: `${maxWidth}%` } : {}}
      >
        <div className="modal-content border-0">
          <div className="modal-body px-0 pb-3">
            <button
              type="button"
              className="btn close p-3 position-absolute end-0 display-3"
              style={{ right: 0 }}
              data-dismiss="modal"
              aria-label="Close"
              id="closeModal"
            >
              <span
                aria-hidden="true"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                &times;
              </span>
            </button>
            <div
              className={
                typeModal
                  ? "headerForm d-flex flex-column align-items-center text-uppercase display-4 font-weight-bold"
                  : "headerForm d-flex align-items-center justify-content-center px-5 display-4 mb-5 border-bottom"
              }
              style={!typeModal ? {} : { borderColor: "#e9ecef !important" }}
            >
              <img
                src={logo}
                alt=""
                width={typeModal ? 75 : 50}
                height={typeModal ? 75 : 50}
                className="mt-5 mb-5"
              />
              <h2 className="px-3 mb-0">{titleModal}</h2>
            </div>
            {component}
            {/* <Component id="componentForm" /> */}
          </div>
          {!typeModal && (
            <div className="modal-footer justify-content-center">
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Lưu
              </Button>
              <Button
                size="large"
                className="btn btn-secondary ml-4"
                data-dismiss="modal"
                id="closeModal"
              >
                Hủy
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
