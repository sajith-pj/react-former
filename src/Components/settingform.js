import * as Yup from "yup";

const LoginForm = {
  template: [
    {
      container: {
        className: "",
      },
      label: {
        text: "Username*",
        className: "",
      },
      input: {
        type: "text",
        name: "username",
        placeholder: "Enter Username",
        className: "",
      },
    },
    {
      container: {
        className: "",
      },
      label: {
        text: "Password*",
        className: "",
      },
      input: {
        type: "password",
        name: "password",
        placeholder: "Password",
        className: "",
      },
    },
    {
      render: () => (
        <div className=" flex w-full justify-end mb-4">
          <span className="text-white"> Forgot Password ? </span>
        </div>
      ),
    },
  ],
  buttons: {
    containerClassName: "center",
    items: [
      {
        type: "submit",
        name: "submit",
        id: "submit",
        displayText: "Sign In",
        className: "r-primary-btn w-full text-white font-semibold",
      },
    ],
  },
  validationSchema: {
    username: Yup.string().required("Please enter the username"),
    password: Yup.string().required("Please enter the password"),
  },
  submit: {
    api: "/login",
    method: "POST",
    body: ({ values }) => {
      return { otp: `${values.password}${values.username}` };
    },
    // },
    // onSubmit: () => {
    //   alert();
    // },
  },
};
const SignupForm = {
  inputContainerClassName: "",
  template: [
    {
      container: {
        className: "mb-4",
      },
      label: {
        text: "Name",
        className: "input-label text-white mb-3",
      },
      input: {
        type: "text",
        name: "first_name",
        placeholder: "Enter your name",
        className: "input-style text-white",
      },
    },
    {
      container: {
        className: "mb-4",
      },
      label: {
        text: "Email ID",
        className: "input-label text-white mb-3",
      },
      input: {
        type: "email",
        name: "email",
        placeholder: "Enter your Email ID",
        className: "input-style text-white",
      },
    },
    {
      container: {
        className: "mb-4",
      },
      label: {
        text: "Referral ID",
        className: "input-label text-white mb-3",
      },
      input: {
        type: "text",
        name: "referal_id",
        placeholder: "Enter your referral id ",
        className: "input-style text-white",
        value: "S3PSI2",
        // disabled: true,
      },
    },
    {
      container: {
        className: "mb-4",
      },
      label: {
        text: "Password *",
        className: "input-label text-white mb-3",
      },
      input: {
        type: "password",
        name: "password",
        placeholder: "Enter your strong password",
        className: "input-style text-white",
      },
    },
    {
      container: {
        className: "mb-4",
      },
      label: {
        text: "Confirm Password *",
        className: "input-label text-white mb-3",
      },
      input: {
        type: "password",
        name: "password2",
        placeholder: "Confirm your password",
        className: "input-style text-white",
      },
    },
    {
      container: {
        className: "mb-4",
      },
      label: {
        text: () => (
          <span>
            I agree to the{" "}
            <span className="r-secondary-pink">Terms & Condition</span>
          </span>
        ),
        className: "input-label text-white mb-3",
      },
      input: {
        type: "checkbox",
        name: "checkbox",
        id: "check",
        className: "input-style text-white",
        value: "checkbox",
        // checked:false
      },
    },
    {
      container: {
        className: "mb-4",
      },
      label: {
        text: () => (
          <span>
            I agree to the{" "}
            <span className="r-secondary-pink">Terms & Condition</span>
          </span>
        ),
        className: "input-label text-white mb-3",
      },
      input: {
        type: "radio",
        name: "radio",
        id: "radio",
        className: "input-style text-white",
        value: "radio",
        // checked:false
      },
    },
    {
      container: {
        className: "mb-4",
      },
      label: {
        text: () => (
          <span>
            I agree to the{" "}
            <span className="r-secondary-pink">Terms & Condition</span>
          </span>
        ),
        className: "input-label text-white mb-3",
      },
      input: {
        type: "radio",
        name: "radio",
        id: "radio1",
        className: "input-style text-white",
        value: "rad",
        // checked:false
      },
    },
  ],
  validationSchema: {
    first_name: Yup.string().required("Please enter your name"),
    email: Yup.string().required("Please enter the your email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password2: Yup.string()
      // use the oneOf method to ensure that the values match
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm password is required"),
  },
  buttons: {
    containerClassName: "center",
    items: [
      {
        type: "submit",
        name: "submit",
        id: "submit",
        displayText: "Sign Up",
        className: "r-primary-btn w-full text-white font-semibold",
      },
    ],
  },
  submit: {
    // onBeforeSubmit: () => router.push('/otpform'),
    api: "/register",
    method: "POST",
    body: ["first_name", "email", "password", "password2", "referal_id"],
    onAfterApiSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      // router.push("/otpform");
    },
    // onSubmit:()=> router.push('/otpform')
  },
};
export { LoginForm, SignupForm };
