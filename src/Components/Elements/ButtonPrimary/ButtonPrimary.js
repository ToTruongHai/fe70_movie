import React, { useEffect } from "react";
import styles from "../../../assets/styles/Elements/ButtonPrimary/ButtonPrimary.module.css";

export default function ButtonPrimary(props) {
  console.log("button pimary");
  return (
    <button
      className={`${styles.btnPrimary} text-white text-uppercase display-6 p-3 ${props.className}`}
      onClick={() => {
        if (props.handleClick) {
          props.handleClick();
        }
      }}
    >
      {props.children}
    </button>
  );
}
