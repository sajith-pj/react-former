import React from "react";
import Styles from "../form.module.scss";
import classNames from "classnames";
import propTypes from "prop-types";
import {
  templateInputDefaultProps,
  templateInputProps,
} from "../props/InputProps";
const Checkbox = ({ templateInput, errors, handleChange, values, touched }) => {
  const { container, input, label } = templateInput;

  return (
    <div
      className={classNames(
        container?.className !== ""
          ? container?.className
          : Styles["input-container"]
      )}
    >
      <input
        {...input}
        className={classNames(
          input?.className !== "" ? input?.className : Styles["input"]
        )}
        onChange={handleChange}
        checked={values[[`${input?.name}`][0]]}
      />
      {label?.text !== "" && label?.text !== undefined && (
        <label
          htmlFor={input?.id}
          className={classNames(
            label.className !== "" ? label.className : Styles["label"]
          )}
        >
          <span style={{ marginLeft: "8px" }}>
            {typeof label.text == "function"
              ? label.text({
                  input: {
                    ...templateInput,
                    value: values[input.name],
                    error: errors[input.name],
                    ...label,
                  },
                })
              : label.text}
          </span>
        </label>
      )}
      {touched[`${input?.name}`] &&
        errors !== undefined &&
        errors[`${input?.name}`] && (
          <span role="alert" className={classNames(Styles["error"])}>
            {errors[`${input?.name}`]}
          </span>
        )}
    </div>
  );
};

Checkbox.propTypes = propTypes.shape({
  templateInput: templateInputProps,
  handleChange: propTypes.func.isRequired,
  errors: propTypes.object,
  values: propTypes.object,
  touched: propTypes.object,
});

Checkbox.defaultProps = {
  templateInput: templateInputDefaultProps,
  handleChange: () => {},
  errors: {},
  values: {},
  touched: {},
};
Checkbox.displayName = "Checkbox";
export default Checkbox;
