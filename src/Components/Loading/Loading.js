import React from "react";
import { useSelector } from "react-redux";

export default function Loading(props) {
  const { isLoading } = useSelector(
    (rootReducer) => rootReducer.loadingReducer
  );

  return (
    <React.Fragment>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
            display: "flex",
            zIndex: "99",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "4rem",
          }}
        >
          <div> Loading... </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
