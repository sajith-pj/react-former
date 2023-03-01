import React from "react"
import { removeAttribute } from "../utils/commonFunction";
import Button from "./Button";

const RenderButton = ({ buttons }) => {
  if (buttons === undefined) {
    return <Button type="submit">Submit</Button>;
  }

  if (buttons.items === undefined) {
    return <Button type="submit">Submit</Button>;
  }
  if (buttons.items.length === 0) {
    return <Button type="submit">Submit</Button>;
  }
  
  return buttons.items.map((button, index) => (
    <Button
      {...removeAttribute({
        attribute: ["displayText"],
        object: button,
      })}
      key={index}
    >
      {button.displayText !== "" ? button.displayText : "Submit"}
    </Button>
  ));
};

export default RenderButton;
