import React from "react";
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

import "./sideBar.scss";

export default function sideBar() {
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
        <li className="side-nav">
          <Link to={"/home"} title="Home" id="m-1">
            <FaHome className="sidenav-icon" />
          </Link>
        </li>
        <li className="side-nav">
          <Link to={"/workspace"} title="Workspace" id="m-2">
            <img
              src={WorkSpaceIcon}
              className="sidenav-icon-img"
              alt="workspace"
            />
          </Link>
        </li>
        <li className="side-nav">
          <Link to={"/analytics"} title="Analytics" id="m-3">
            <img
              src={AnalyticsIcon}
              className="sidenav-icon-img"
              alt="Analytics"
            />
          </Link>
        </li>
        <li className="side-nav">
          <Link to={"/healthcard"} title="Health Card" id="m-3">
            <img
              src={HealthCardIcon}
              className="sidenav-icon-img"
              alt="Health Card"
            />
          </Link>
        </li>
        <li className="side-nav">
          <Link to={"/insights"} title="Insights" id="m-4">
            <img
              src={InsightIcon}
              className="sidenav-icon-img"
              alt="Insights"
            />
          </Link>
        </li>
        <li className="side-nav">
          <Link to={"/settings"} title="Settings" id="m-5">
            <img
              src={SettingsIcon}
              className="sidenav-icon-img"
              alt="Settings"
            />
          </Link>
        </li>
        <li className="side-nav">
          <Link to={"/about"} title="About Tool" id="m-6">
            <img
              src={AboutIcon}
              className="sidenav-icon-img"
              alt="About Tool"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}
