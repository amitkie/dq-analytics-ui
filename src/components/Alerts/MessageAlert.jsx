import React from "react";
import Alert from "react-bootstrap/Alert";
import { IoMdClose } from "react-icons/io";

import "./MessageAlert.scss";

function MessageAlert() {
  return (
    <>
      {["primary"].map((variant) => (
        <Alert key={variant} variant={variant} className="alertMessage">
          <IoMdClose className="alert-icon" />
          This is a {variant} alert—check it out!
        </Alert>
      ))}
    </>
  );
}

export default MessageAlert;
