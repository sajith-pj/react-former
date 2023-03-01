import React from "react"
import classNames from "classnames";
import Styles from "../form.module.scss";
const Button = ({ children, className, buttons, isSubmit, type, ...props }) => {
  return (
    <button
      {...props}
      type={buttons !== undefined ? (isSubmit ? "submit" : "button") : type}
      className={classNames(className !== "" ? className : Styles["button"])}
    >
      {children}
    </button>
  );
};

export default Button;
