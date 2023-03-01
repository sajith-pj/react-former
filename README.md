
##Introduction

This package will helps you to deals with the forms in React JS. Its will helps you to create forms, validate the forms and to deal with the form submission. This package will take array and return the curresponding form

##Usage

To auotmate the code or to reduce the efforts in the implimentation of forms in React JS.

## Installation

```
npm install @sajith-pj/react-former
```

Once the package is installed, you can import the `<Form/>` using import:

```
import Form from "@sajith-pj/react-former"
```

## Read From Here

An input will have three parts 1.Label(`<Label>`), 2.input(`<input/>`) and a wrapper 3.Div(`<div>`) which will wrap the input and label.

| Keys             | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| template         | This will be an array of object and each object will contains the information about lable, input and teh container div                                                                                                                                                                                                                                                                                                                                                                                          |
| container        | This is key included in the object of template array. This will used to define the properties of the container div like className, name,id etc.                                                                                                                                                                                                                                                                                                                                                                 |
| label            | This is key included in the object of template array. This will used to define the properties of the label tag like className, name,id etc.Here, One thing you should remember is the innerText of label is passed as text(Example will available in the example sections)                                                                                                                                                                                                                                      |
| input            | This is key included in the object of template array. This will used to define the properties of the input tag like className, name,id etc.<br> Here, One thing you should remember is<ul> <li> In case of radio input and checkbox you should pass a extra key "value"(Example will available in the example sections)</li> </ul>                                                                                                                                                                              |
| render           | This is key included in the object of template array. This will used to used to render custom input fields or you can use this funcntion to render some extra information in between your form. This function will receive **handleChange, touched, errors, and values**. (Example will available in the example sections)                                                                                                                                                                                      |
| buttons          | This key is used to specify the buttons that you want use in the form. This will be a object with keys items and containerClassName. <ul> <li> The **items** will be an array of objects, each object will contains the properties of button <ul> <li> items array would not be a empty array, **one of the button should be a type of submit** </li> </ul> </li><li> The **containerClassName** will helps you to style the parent div of buttons </li> </ul>                                                  |
| validationSchema | This is an object to set your validation. We expect a Yup object for validation                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| submit           | This is an object which helps you to deal with form submission.This object contains <ul> <li>**onBeforeSubmit**: This function will run before the api call</li> <li>**onAfterApiSuccess**: This function will run after the api response is success</li> <li>**onAfterApiFail**: This function will run after the api fails</li> <li>**body**: This could be an array or an function that defines the body of the api request </li> <li>**method**:This key will help you to define the http method</li> </ul> |

##Examples
A simple example will save your minutes

```js
import * as Yup from "yup";
import From from '@sajith-pj/react-former';
const App = () => {
    const let form = {
        // Each object of template array will generate
        // <div> => container object
        // <label>Example Label</label> => label object
        // <input type="text" name="example" id="example" /> => input object
        // </div>
         template: [
                    {
                        container: {
                            className: "",
                        },
                        label: {
                            text: "Username*", // innerText of label tag
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
                            text: "Password*",// innerText of label tag
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
                    render: () => ( // you can render function to render custim fields like this
                        <div className=" flex w-full justify-end mb-4">
                        <Link href="/forgot-password">
                            {" "}
                            <span className="text-white"> Forgot Password ? </span>
                        </Link>
                        </div>
                    ),
                    },
                ],
         buttons: {
                    containerClassName: "center",
                    // button will rendered inside a container div, containerClassName will assigned to the container div
                    items: [
                        // button object
                    {
                        type: "submit",
                        name: "submit",
                        id: "submit",
                        displayText: "Sign In", // innerText of button
                        className: "", // className for button
                    },
                    ],
                },
                validationSchema:{
                     username: Yup.string().required("Please enter the username"), // username is name of input type text
                     password: Yup.string().required("Please enter the password"),// password is name of input type  password
                },
            submit: {
                // if api is defined
                api: "/login",
                method: "POST",
                onBeforeSubmit:()=>{},
                onAfterApiSuccess:()=>{},
                onAfterApiFail:()=>{},
                // if body is a function
                body: ({ values }) => { // values is a object with input values
                    return { otp: `${values.password}${values.username}` };
                },
                // if body is array
                body: ["username", "password"],
            }
            }
    return(
        <Form {...form}>
    )
}

```
