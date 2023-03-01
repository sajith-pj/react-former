import React from "react";
import Form from "./Components/Form/Form";
import { LoginForm } from "./formConfig/settingform";
// import Form '../';
function App() {
  return <Form {...LoginForm} />;
}

export default App;
