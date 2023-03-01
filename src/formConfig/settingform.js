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
        console.log(values);
        return { otp: `${values.password}${values.username}` };
      },
    // },
    // onSubmit: () => {
    //   alert();
    // },
  },
};

export { LoginForm };
