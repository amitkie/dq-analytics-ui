import React, { useState, useEffect } from "react";
import { Await, useNavigate } from "react-router-dom";
import { ReactComponent as MyLogo } from "../assets/images/dq-logo.svg";
import KieLogo from "../assets/images/Kiesquare-white.png";
import KieLogoOG from "../assets/images/kiesquare-logo-transparent.png";
import InputComponent from "../common/input/input";
import ButtonComponent from "../common/button/button";
import { login } from "../services/userService";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import "./login.scss";
import { useDispatch } from "react-redux";
import { loginRequest } from "../features/user/userSlice";
import { useSelector } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const {isMobileView } = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    }
    
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile])


  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };
  const dispatch = useDispatch();
  // const handleLogin = async (e) => {
  //   const loginRequestData = {
  //     email: email,
  //     password: password,
  //   };
  //   try {
  //     e.preventDefault();
  //     // const userdata = await login(loginRequestData);
  //     dispatch(loginRequest({email, password}))
  //     navigate("home");
  //   } catch (error) {}
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Basic validation
    if (!email) {
      setEmailError("Email is required.");
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
    }

    if (!password) {
      setPasswordError("Password is required.");
    }

    // Prevent login if there are errors
    if (!email || !password || !isValidEmail(email)) {
      return;
    }

    try {
      const loginRequestData = {
        email: email,
        password: password,
        navigate,
      };

      dispatch(loginRequest(loginRequestData));
    } catch (error) {
      // Handle login error
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes and clear errors
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setEmailError("");
      if (isValidEmail(e.target.value)) {
        setEmailError("");
      } else {
        setEmailError("Please enter a valid email address.");
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError("");
    }
  };

  return (
    <div className="container-fluid g-0">
      <div className="row g-0">
        <div className="col-sm-12 col-md-12 col-lg-6 ">
          <div className="login-left">
            {!isMobile && <div className="top-triangle"></div>}
            
            <div className="logo">
              <MyLogo className="logo-component" />
            </div>
            {!isMobile && <div className="bottom-triangle"></div>}
            
            
            <img src={isMobile ? KieLogoOG : KieLogo}  className="kie-logo" alt="KieSquare" />
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6 ">
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
                  onChange={handleEmailChange}
                  tabIndex="0"
                  classNames={emailError && "error-border"}
                />

                {emailError && <span className="error-text">{emailError}</span>}
              </div>
              <div className="mb-3 position-relative">
                <InputComponent
                  id={"passwordText"}
                  inputLabel={"Password"}
                  inputType={passwordType}
                  placeholder={"Enter your Password"}
                  inputValue={password}
                  onChange={handlePasswordChange}
                  tabIndex="1"
                  classNames={passwordError && "error-border"}
                />
                 <span
                  onClick={togglePasswordVisibility}
                  className="eye-icon-btn"
                >
                  {passwordType === "password" ? (
                    <IoIosEyeOff className="eye-icon-off" />
                  ) : (
                    <IoIosEye className="eye-icon-on" />
                  )}
                </span>
                {passwordError && (
                  <span className="error-text">{passwordError}</span>
                )}
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
                tabIndex="2"
              />
              {/* <div className="d-flex">
                <span className="orOption">Or</span>
              </div>
              <ButtonComponent
                btnClass={"btn-outline-secondary w-100"}
                btnName={"Sign in with Google"}
              /> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
