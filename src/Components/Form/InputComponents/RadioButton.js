import React from "react"
import cn from "classnames";
import Styles from "../form.module.scss";
import classNames from "classnames";
const RadioButton = ({
  templateInput,
  errors,
  handleChange,
  values,
  touched,
}) => {
  const { container, input, label } = templateInput;

  return (
    <div
      className={cn(
        container?.className !== ""
          ? container?.className
          : Styles["input-container"]
      )}
    >
      <input
        {...input}
        className={cn(
          input?.className !== "" ? input?.className : Styles["input"]
        )}
        onChange={handleChange}
        checked={values[`${input.name}`] === input.value}
        // checked={values[`${input?.name}`]}
      />
      {label?.text !== "" && label?.text !== undefined && (
        <label
          htmlFor={input?.id}
          className={cn(
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

RadioButton.displayName = "RadioButton";
export default RadioButton;
