import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RenderInputs } from "./RenderInputsInput";
import propTypes from "prop-types";
import { submitProps, templateInputProps } from "./props/InputProps";
import { getAxios, getAxiosConfig } from "./config/axiosConfig";
import RenderButton from "./ButtonComponents/RenderButton";

const Form = ({
  template,
  buttons,
  submit,
  validationSchema,
  inputContainer,
}) => {
  const [customInputs, setCustomInputs] = useState({});


  const getinitialValues = () => {
    let initialValues = {};
    template.forEach((fieldObj, i) => {
      const { input, render } = fieldObj;

      if (render) {
        initialValues = { ...initialValues, ...customInputs };
      } else if (input?.type === "checkbox" || input?.type === "radio") {
        if (input.checked !== undefined && input.checked) {
          initialValues[`${input?.name}`] = input.checked;
        } else {
          initialValues[`${input?.name}`] = false;
        }
      } else {
        if (input.value !== undefined && input.value !== "") {
          initialValues[`${input?.name}`] = input.value;
        } else {
          initialValues[`${input?.name}`] = "";
        }
      }
    });
    return initialValues;
  };

  const getValidationSchema = () => {
    return Yup.object({ ...validationSchema });
  };

  const getCustomInputDetails = () => {
    let customInputsArray = document.querySelectorAll(`input[data-fr]`);
    let cutsomInputDetails = [];
    customInputsArray.forEach((input) => {
      cutsomInputDetails.push({ type: input.type, name: input.name });
    });

    return cutsomInputDetails;
  };

  const getInitialValuesForRenderMehtod = () => {
    let customInputData = getCustomInputDetails();
    let customInputinitialValues = {};
    customInputData.length > 0 &&
      customInputData.forEach((input) => {
        if (input.type !== "button") {
          if (input?.type === "checkbox" || input?.type === "radio") {
            customInputinitialValues[`${input.name}`] = false;
          } else customInputinitialValues[`${input.name}`] = "";
        }
      });
    setCustomInputs({ ...customInputs, ...customInputinitialValues });
  };

  useEffect(() => {
    getInitialValuesForRenderMehtod();
  }, []);

  // const updateEditForm = (values) => {
  //   const api =
  //     typeof onUpdate?.api() == "function" ? onUpdate?.api() : onUpdate?.api;
  //   const body = onUpdate?.body;
  //   let reqBody = {};
  //   body.forEach((bodyData) => {
  //     reqBody[`${bodyData}`] = values[bodyData];
  //   });

  //   axios.put(`${api}`, reqBody).then((response) => {
  //     update(response.data.data);
  //   });
  // };

  const apiCall = ({ method = "get", api, body }) => {
    const axiosMethod = getAxios(method);
    return axiosMethod(`${api}`, body);
  };

  const submitForm = (values) => {
    let api = "";
    let body = undefined;
    let reqBody = {};
    if (typeof submit.api !== "undefined") {
      // SETTING THE API
      api = typeof submit?.api === "function" ? submit.api() : submit.api;

      // SETTING THE BODY TO CREATE A REQUEST BODY
      // BODY WILL BE IN THREE FORMAT 1), OBJECT, 2),ARRAY, 3), FUNCTIONS
      body =
        typeof submit.body !== "undefined"
          ? typeof submit.body === "function"
            ? submit.body({ values, inputs: template })
            : submit.body
          : null;

      //  SETTING REQUEST BODY

      if (body !== undefined && body !== null) {
        if (Array.isArray(body)) {
          body.forEach((bodyData) => {
            reqBody[`${bodyData}`] = values[bodyData];
          });
        } else if (Object.keys(body).length > 0) {
          reqBody = { ...reqBody, ...body };
        }
      }

      if (
        submit.onBeforeSubmit !== undefined &&
        typeof submit.onBeforeSubmit !== "function"
      ) {
        const beforeSubmitResult = submit.onBeforeSubmit();
        if (beforeSubmitResult) {
          apiCall({ api, body: reqBody, method: submit.method })
            .then((response) => {
              submit.onAfterApiSuccess(response);
            })
            .catch();
        }
      } else if (api !== undefined && api !== null) {
        apiCall({ api, body: reqBody, method: submit.method })
          .then((response) => {
            // ON AFTER SUBMIT CAll
            if (typeof submit?.onAfterApiSuccess === "function")
              submit.onAfterApiSuccess(response);
          })
          .catch((error) => {
            if (typeof submit?.onAfterApifailed === "function")
              submit?.onAfterApifailed(error);
          });
      }
    } else if (submit.onSubmit) {
      submit.onSubmit();
    }
  };

  console.log(getinitialValues());
  const formik = useFormik({
    initialValues: getinitialValues(),
    enableReinitialize: true,
    validationSchema: getValidationSchema(),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const { values, handleSubmit, handleChange, touched, errors } = formik;

  let fieldsIncludedToContainer = template.filter(
    (input, index) => !inputContainer?.exclude.includes(index + 1) && input
  );
  let excludedFields = template.filter(
    (input, index) => inputContainer?.exclude.includes(index + 1) && input
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className={inputContainer?.className}>
        <RenderInputs
          template={fieldsIncludedToContainer}
          handleChange={handleChange}
          values={values}
          errors={errors}
          touched={touched}
        />
      </div>
      <RenderInputs
        template={excludedFields}
        handleChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
      />
      <div className={buttons?.containerClassName}>
        <RenderButton buttons={buttons} />
      </div>
    </form>
  );
};

Form.propTypes = {
  template: propTypes.arrayOf(
    propTypes.oneOf(templateInputProps, propTypes.func)
  ).isRequired,
  buttons: propTypes.shape({
    containerClassName: propTypes.string,
    items: propTypes.arrayOf(
      propTypes.shape({
        displayText: propTypes.string,
        name: propTypes.string,
        id: propTypes.string,
        isSumbit: propTypes.bool,
      })
    ),
  }),
  submit: submitProps,
};
Form.defaultProps = {
  template: [],
  button: {
    containerClassName: "",
    items: [],
  },
};
export default Form;

export function config({ axios }) {
  getAxiosConfig(axios);
}
