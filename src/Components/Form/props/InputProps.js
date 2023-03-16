import propTypes from "prop-types";

export const containerDivProps = propTypes.shape({
  className: propTypes.string,
  id: propTypes.string,
  name: propTypes.string,
});

export const inputProps = propTypes.shape({
  className: propTypes.string,
  id: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  groupName: propTypes.string,
  value: (props, propName, componentName) => {
    if (props.type === "checkbox" && props.value !== "") {
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof props[
          propName
        ]}\` supplied to \`${componentName}\`, expected \`boolean\`.`
      );
    }
    if (props.type !== "checkbox" && typeof props.value === "undefined") {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\`.`
      );
    }
    return null;
  },
});

export const labelProps = propTypes.shape({
  text: propTypes.oneOf([propTypes.string, () => propTypes.string]),
  htmlFor: propTypes.string,
  className: propTypes.string,
  id: propTypes.string,
  name: propTypes.string,
});

export const templateInputProps = propTypes.shape({
  container: containerDivProps,
  label: labelProps,
  input: inputProps,
});

export const inputDefaultProps = {
  className: "",
  id: "",
  name: "",
  type: "",
  groupName: "",
};

export const submitProps = propTypes.shape({
  api: propTypes.oneOfType([propTypes.func, propTypes.string]),
  body: propTypes.oneOf([propTypes.func, propTypes.arrayOf(propTypes.string)]),
  queryParams: propTypes.object,
  onSubmit: propTypes.func,
  onBeforeSubmit: propTypes.func,
  onAfterSubmit: propTypes.func,
});

// DEFAULT PROPS
// DEFAULT PROPS
export const ContainerDivDefaultProps = {
  className: "",
  id: "",
  name: "",
};
export const labelDefaultProps = {
  text: "",
  htmlFor: "",
  className: "",
  id: "",
  name: "",
};

export const templateInputDefaultProps = {
  container: ContainerDivDefaultProps,
  label: labelDefaultProps,
  input: inputDefaultProps,
};
