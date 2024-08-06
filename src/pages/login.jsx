import React, { useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import { ReactComponent as MyLogo } from "../assets/images/dq-logo.svg";
import KieLogo from "../assets/images/kie-logo.png";
import InputComponent from "../common/input/input";
import ButtonComponent from "../common/button/button";
import { login } from "../services/userService";

import "./login.scss";
import { useDispatch } from "react-redux";
import { loginRequest } from "../features/user/userSlice";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    const loginRequestData = {
      email: email,
      password: password,
    };
    try {
      e.preventDefault();
      // const userdata = await login(loginRequestData);
      dispatch(loginRequest({email, password}))
      navigate("home");
    } catch (error) {}
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="login-left">
            <div className="top-triangle"></div>
            <div className="logo">
              <MyLogo className="logo-component" />
            </div>
            <div className="bottom-triangle"></div>
            <img src={KieLogo} className="kie-logo" alt="KieSquare" />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="login-form-container">
            <form className="row">
              <span className="login-title">Login</span>
              <div className="mb-3">
                <InputComponent
                  id={"userEmail"}
                  inputLabel={"Email"}
                  inputType={"email"}
                  placeholder={"Enter your Email"}
                  inputValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <InputComponent
                  id={"passwordText"}
                  inputLabel={"Password"}
                  inputType={"password"}
                  placeholder={"Enter your Password"}
                  inputValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex flex-row justify-content-between mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
                <span className="link">Forgot password?</span>
              </div>
              <ButtonComponent
                btnClass={"btn-primary w-100"}
                btnName={"Login"}
                onClick={handleLogin}
              />
              <div className="d-flex">
                <span className="orOption">Or</span>
              </div>
              <ButtonComponent
                btnClass={"btn-outline-secondary w-100"}
                btnName={"Sign in with Google"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
