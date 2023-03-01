import React from "react"
import cn from "classnames";
import Styles from "../form.module.scss";
import classNames from "classnames";
import propTypes from "prop-types";
import {
  templateInputDefaultProps,
  templateInputProps,
} from "../props/InputProps";
const Date = ({ templateInput, errors, handleChange, values, touched }) => {
  const { container, input, label } = templateInput;

  return (
    <div
      className={cn(
        container?.className !== ""
          ? container?.className
          : Styles["input-container"]
      )}
    >
      {label?.text !== "" && label?.text !== undefined && (
        <label
          className={cn(
            label.className !== "" ? label.className : Styles["label"]
          )}
        >
          <span>
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
      <input
        {...input}
        className={cn(
          input?.className !== "" ? input?.className : Styles["input"]
        )}
        onChange={handleChange}
        data-invalid={
          touched[`${input?.name}`] &&
          errors !== undefined &&
          errors[`${input?.name}`]
            ? true
            : false
        }
        value={
          values[`${input?.name}`] !== undefined ? values[`${input?.name}`] : ""
        }
      />

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

Date.propTypes = propTypes.shape({
  templateInput: templateInputProps,
  handleChange: propTypes.func.isRequired,
  errors: propTypes.object,
  values: propTypes.object,
  touched: propTypes.object,
});

Date.defaultProps = {
  templateInput: templateInputDefaultProps,
  handleChange: () => {},
  errors: {},
  values: {},
  touched: {},
};

Date.displayName = "Date";
export default Date;
