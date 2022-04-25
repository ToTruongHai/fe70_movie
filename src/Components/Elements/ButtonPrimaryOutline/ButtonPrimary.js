import React from "react";
import styles from "../../../assets/styles/Elements/ButtonPrimaryOutline/ButtonPrimaryOutline.module.css";

export default function ButtonPrimaryOutline(props) {
  return (
    <button
      className={`${styles.btnPrimaryOutline} text-uppercase display-6 p-2 ${props.className}`}
      style={props.style}
      type={props.type ? props.type : "submit"}
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
