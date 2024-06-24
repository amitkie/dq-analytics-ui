import React from "react";
import HeaderComponent from "./header/header";
import { useNavigate } from "react-router-dom";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <HeaderComponent />
        </div>
        <div className="row">
          <div className="childrenContainer">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
