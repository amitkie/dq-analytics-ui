import React from "react";
import { FaHome } from "react-icons/fa";
import WorkSpaceIcon from "../../assets/images/workspace.png";
import AnalyticsIcon from "../../assets/images/analytics.png";
import HealthCardIcon from "../../assets/images/health-card.png";
import InsightIcon from "../../assets/images/insight.png";
import SettingsIcon from "../../assets/images/settings.png";
import AboutIcon from "../../assets/images/about.png";

import "./sideBar.scss";

export default function sideBar() {
  return (
    <div className="sidebar-container">
      <ul className="p-0">
        <li className="side-nav">
          <FaHome className="sidenav-icon" />
        </li>
        <li className="side-nav">
          <img
            src={WorkSpaceIcon}
            className="sidenav-icon-img"
            alt="workspace"
          />
        </li>
        <li className="side-nav">
          <img
            src={AnalyticsIcon}
            className="sidenav-icon-img"
            alt="workspace"
          />
        </li>
        <li className="side-nav">
          <img
            src={HealthCardIcon}
            className="sidenav-icon-img"
            alt="workspace"
          />
        </li>
        <li className="side-nav">
          <img src={InsightIcon} className="sidenav-icon-img" alt="workspace" />
        </li>
        <li className="side-nav">
          <img
            src={SettingsIcon}
            className="sidenav-icon-img"
            alt="workspace"
          />
        </li>
        <li className="side-nav">
          <img src={AboutIcon} className="sidenav-icon-img" alt="workspace" />
        </li>
      </ul>
    </div>
  );
}
