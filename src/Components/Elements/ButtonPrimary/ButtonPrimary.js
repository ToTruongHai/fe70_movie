import React, { useEffect } from "react";
import styles from "../../../assets/styles/Elements/ButtonPrimary/ButtonPrimary.module.css";

export default React.memo(function ButtonPrimary(props) {
  return (
    <button
      className={`${styles.btnPrimary} text-white text-uppercase display-6 p-3 ${props.className}`}
      type={props.type ? props.type : "submit"}
      // onClick={() => {
      //   props.handleClick();
      // }}
      onClick={() => {
        if (props.handleClick) {
          props.handleClick();
        }
      }}
    >
      {props.children}
    </button>
  );
});
