import React from "react";
import HeaderComponent from "./header/header";
import { useNavigate } from "react-router-dom";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid g-0 pb-4">
        <div className="row g-0">
          <div className="col-12">
            <HeaderComponent />
          </div>
        </div>
        <div className="row g-0">
          <div className="childrenContainer">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
