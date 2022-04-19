import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Trailer() {
  const styles = {
    width: "100%",
    height: "720px",
  };
  const { trailerSrc } = useSelector(
    (rootReducer) => rootReducer.modalReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("trailerModal").onhide = () => {
      const action = {
        type: "SET_SRC",
        trailerSrc: ""
      };
      dispatch(action);
    };

    // return () => {
    //   document
    //     .getElementById("trailerModal")
    //     .removeEventListener("onhide", null);
    // };
  }, []);

  const renderIframe = () => {
    if (trailerSrc.includes("embed")) {
      return (
        <iframe
          width={styles.width}
          height={styles.height}
          src={trailerSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          id="iframeTrailer"
        ></iframe>
      );
    } else {
      return (
        <h1 style={{ textAlign: "center", fontSize: "30px" }}>
          No Trailer Available
        </h1>
      );
    }
  };

  return <React.Fragment>{renderIframe()}</React.Fragment>;
}
