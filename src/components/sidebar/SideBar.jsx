import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaHome } from "react-icons/fa";
import WorkSpaceIcon from "../../assets/images/workspace.png";
import AnalyticsIcon from "../../assets/images/analytics.png";
import HealthCardIcon from "../../assets/images/health-card.png";
import InsightIcon from "../../assets/images/insight.png";
import SettingsIcon from "../../assets/images/settings.png";
import AboutIcon from "../../assets/images/about.png";
import WorkSpaceIconActive from "../../assets/images/workspaceActive.png";
import AnalyticsIconActive from "../../assets/images/analyticsActive.png";
import HealthCardIconActive from "../../assets/images/health-cardActive.png";
import InsightIconActive from "../../assets/images/insightActive.png";
import SettingsIconActive from "../../assets/images/settingsActive.png";
import AboutIconActive from "../../assets/images/aboutActive.png";

import "./SideBar.scss";

export default function SideBar() {
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const savedActiveMenu = localStorage.getItem("activeMenu");
    if (savedActiveMenu) {
      setActiveMenu(savedActiveMenu);
    }
  }, []);

  const handleMenuActive = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem("activeMenu", menu);
  };

  const Link = ({ id, children, title, to }) => (
    <OverlayTrigger
      placement={"right"}
      overlay={
        <Tooltip to={to} id={id}>
          {title}
        </Tooltip>
      }
    >
      <a href={to}>{children}</a>
    </OverlayTrigger>
  );
  return (
    <div className="sidebar-container">
      <ul className="p-0">
        <li
          className={`side-nav ${activeMenu === "home" ? "active" : ""}`}
          onClick={() => handleMenuActive("home")}
        >
          <Link to={"/home"} title="Home" id="m-1">
            <FaHome className="sidenav-icon" />
          </Link>
        </li>
        <li
          className={`side-nav ${activeMenu === "workspace" ? "active" : ""}`}
          onClick={() => handleMenuActive("workspace")}
        >
          <Link to={"/workspace"} title="Workspace" id="m-2">
            <img
              src={
                activeMenu === "workspace" ? WorkSpaceIconActive : WorkSpaceIcon
              }
              className="sidenav-icon-img"
              alt="workspace"
            />
          </Link>
        </li>
        <li
          className={`side-nav ${activeMenu === "analytics" ? "active" : ""}`}
          onClick={() => handleMenuActive("analytics")}
        >
          <Link to={"/analytics"} title="Analytics" id="m-3">
            <img
              src={
                activeMenu === "analytics" ? AnalyticsIconActive : AnalyticsIcon
              }
              className="sidenav-icon-img"
              alt="Analytics"
            />
          </Link>
        </li>
        <li
          className={`side-nav ${activeMenu === "healthcard" ? "active" : ""}`}
          onClick={() => handleMenuActive("healthcard")}
        >
          <Link to={"/healthcard"} title="Health Card" id="m-4">
            <img
              src={
                activeMenu === "healthcard"
                  ? HealthCardIconActive
                  : HealthCardIcon
              }
              className="sidenav-icon-img"
              alt="Health Card"
            />
          </Link>
        </li>
        <li
          className={`side-nav ${activeMenu === "insights" ? "active" : ""}`}
          onClick={() => handleMenuActive("insights")}
        >
          <Link to={"/insights"} title="Insights" id="m-5">
            <img
              src={activeMenu === "insights" ? InsightIconActive : InsightIcon}
              className="sidenav-icon-img"
              alt="Insights"
            />
          </Link>
        </li>
        <li
          className={`side-nav ${activeMenu === "settings" ? "active" : ""}`}
          onClick={() => handleMenuActive("settings")}
        >
          <Link to={"/settings"} title="Settings" id="m-6">
            <img
              src={
                activeMenu === "settings" ? SettingsIconActive : SettingsIcon
              }
              className="sidenav-icon-img"
              alt="Settings"
            />
          </Link>
        </li>
        <li
          className={`side-nav ${activeMenu === "about" ? "active" : ""}`}
          onClick={() => handleMenuActive("about")}
        >
          <Link to={"/about"} title="About Tool" id="m-7">
            <img
              src={activeMenu === "about" ? AboutIconActive : AboutIcon}
              className="sidenav-icon-img"
              alt="About Tool"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}
