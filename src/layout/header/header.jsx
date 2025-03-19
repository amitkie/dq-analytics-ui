import React, { useEffect, useState } from "react";
import HeaderLogo from "../../assets/images/kiesquare-logo-transparent.png";
import { FaRegCircleUser, FaPowerOff } from "react-icons/fa6";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHamburgerRequest, getMobileRequest, logout } from "../../features/user/userSlice";

export default function Header() {
  const { userInfo } = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showHamburger, setShowHamburger] = useState()

  const toggleHamburger = () => {
    setShowHamburger(!showHamburger);
    dispatch(getHamburgerRequest(!showHamburger))
  }
 
  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logout());
    window.location.href = '/';
  };
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      dispatch(getMobileRequest(window.innerWidth < 768))
    }
    
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, dispatch])

  return (
    <div className="header-container">
      <div className="row">
      <div className={`col-md-6 col-sm-12 ${isMobile ? "justify-sm-between" : ""}`}>
          <div className="header-logo">
            <img src={HeaderLogo} className="header-logo" alt="Header Logo" />
          </div>
          <div className="hamburger-icon" onClick={toggleHamburger}>
            <span className="hamburger-menu" ></span>
          </div> 
        </div>
        <div className="col-md-6 col-sm-12 align-items-end">
          <div className="user-info" style={{ display: !isMobile || (isMobile && showHamburger) ? "flex" : "none" }}>
            <span className="user-icon">
              <FaRegCircleUser width={28} height={28} />
            </span>
            <div className="user-details">
              <span className="user-name">
                {userInfo?.user?.first_name} {userInfo?.user?.last_name}
              </span>
              <span className="user-email">{userInfo?.user?.email}</span>
            </div>
            <span className="logout-icon" onClick={handleLogout}>
              <FaPowerOff width={28} height={28} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
