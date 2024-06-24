import React from "react";
import HeaderLogo from "../../assets/images/header-logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import "./header.scss";

export default function header() {
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
              <span className="user-name">User Name</span>
              <span className="user-email">username@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
