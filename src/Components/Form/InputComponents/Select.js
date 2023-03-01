import React from "react"
import cn from "classnames";
import Styles from "../form.module.scss";
import { removeAttribute } from "../utils/commonFunction";
import classNames from "classnames";
const Select = ({ templateInput, errors, handleChange, values, touched }) => {
  const { container, input, label } = templateInput;
  const { options } = input;

  const getSelectedOptions = (options) => {
    if (options !== undefined && options.length > 0) {
      // eslint-disable-next-line array-callback-return
      let selectedOptions = options.filter((option) => {
        if (
          option.value !== undefined &&
          option.displayText !== undefined &&
          option.selected
        ) {
          return option.value;
        }
      });
      if (selectedOptions.length > 0) {
        return selectedOptions[0];
      } else return null;
    }
    return "";
  };

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
      <select
        {...removeAttribute({ attribute: ["type", "options"], object: input })}
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
        defaultValue={getSelectedOptions(options)}
      >
        {options.length > 0 &&
          // eslint-disable-next-line array-callback-return
          options.map((option, index) => {
            if (option.value !== undefined && option.displayText !== "") {
              return (
                <option
                  value={option.value}
                  key={index}
                  selected={option.selected !== undefined && option.selected}
                >
                  {option.displayText}
                </option>
              );
            } else
              console.error("Please correct the options array in select input");
          })}
      </select>

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

Select.displayName = "Select";
export default Select;
