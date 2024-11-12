import React, { useState } from "react";
import styles from "./InputField.module.css";

export default function InputField(props) {
  return (
    <input
    className={styles.inputf}
      onChange={props.writingText}
      type={props.type}
      name={props.name}
      value={props.value}
    />
  );
}
