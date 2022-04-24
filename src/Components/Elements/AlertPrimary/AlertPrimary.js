import React, { useEffect } from "react";
import styles from "../../../assets/styles/Elements/AlertPrimary/AlertPrimary.module.css";

export default function AlertPrimary(props) {
  return (
    <span
      className={`${styles.alertPrimary} px-2 ${props.className}`}
      style={props.style}
    >
      {props.children}
    </span>
  );
}
