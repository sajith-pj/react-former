import cn from "classnames";
import { removeAttribute } from "../utils/commonFunction";
import Styles from "../form.module.scss";
import classNames from "classnames";
const Textarea = ({ templateInput, errors, values, handleChange, touched }) => {
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
          {...label}
          className={cn(
            label.className !== "" ? Styles["label"] : label.className
          )}
        >
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
        </label>
      )}

      <textarea
        {...input}
        {...removeAttribute({ attribute: ["type"], object: { ...input } })}
        onChange={handleChange}
        value={values[`${input?.name}`]}
        data-invalid={
          touched[`${input?.name}`] &&
          errors !== undefined &&
          errors[`${input?.name}`]
            ? true
            : false
        }
        className={cn(
          input?.className !== "" ? input?.className : Styles["input"]
        )}
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

Textarea.displayName = "Textarea";
export default Textarea;
