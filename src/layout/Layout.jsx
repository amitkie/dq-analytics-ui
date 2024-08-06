import React, { useEffect } from "react";
import HeaderComponent from "./header/header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAndPaymentInfo } from "../services/userService";
import { getProjectInfoRequest, getUserInfoRequest } from "../features/user/userSlice";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect( () => {
    if(token){
      dispatch(getUserInfoRequest(token));
      dispatch(getProjectInfoRequest(token));
    }
  //  dispatch(user)
  }, [token]);



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
