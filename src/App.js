import "./App.css";
import Form from "./Components/Form/Form";
import { LoginForm, SignupForm } from "./Components/settingform";
function App() {
  return <Form  {...SignupForm}/>;
}

export default App;
