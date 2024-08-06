import React from "react";
import HeaderLogo from "../../assets/images/header-logo.png";
import { FaRegCircleUser, FaPowerOff } from "react-icons/fa6";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/user/userSlice";



export default function Header() {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(logout())
    navigate("/")
  }
  return (
    <div className="header-container">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="header-logo">
            <img src={HeaderLogo} className="header-logo" alt="Header Logo" />
          </div>
        </div>
        <div className="col-md-6 col-sm-12 align-items-end">
          <div className="user-info">
            <span className="user-icon">
              <FaRegCircleUser width={28} height={28} />
            </span>
            <div className="user-details">
              <span className="user-name">{userInfo?.user?.first_name} {userInfo?.user?.last_name}</span>
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
