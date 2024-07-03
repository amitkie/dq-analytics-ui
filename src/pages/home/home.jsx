import React, { useEffect } from "react";
import TabComponent from "../../components/tabs/TabComponent";
import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import WorkSpaceIcon from "../../assets/images/workspace-nav.png";
import AnalyticsIcon from "../../assets/images/analytics-nav.png";
import HealthCardIcon from "../../assets/images/health-card-nav.png";
import InsightIcon from "../../assets/images/insight-nav.png";
import SettingsIcon from "../../assets/images/settings-nav.png";
import AboutIcon from "../../assets/images/aboutTool-nav.png";

import "./home.scss";
import WorkSpace from "../workSpace/workSpace";

const Home = () => {
  useEffect(() => {
    const items = document.querySelectorAll(".circle-menu");

    const halfCircleDegrees = 220; // Adjust the degrees for half-circle

    for (let i = 0, l = items.length; i < l; i++) {
      const angle =
        -0.5 * Math.PI - ((halfCircleDegrees / 180) * i * Math.PI) / l;
      const leftValue = (17 - 40 * Math.cos(angle)).toFixed(4) + "%";
      const topValue = (35 + 35 * Math.sin(angle)).toFixed(4) + "%";

      items[i].style.left = leftValue;
      items[i].style.top = topValue;
    }
  }, []);
  const tabs = [
    {
      label: "Recent Activity",
      content: (
        <div>
          <p>Last activity on May 22, 2024</p>
          <p>Project Name: DQ Files_May_24-Q1</p>
        </div>
      ),
    },
    {
      label: "Recommended",
      content: <div>Recommended content shown here</div>,
    },
  ];

  return (
    <>
      <div className="d-block px-4 mt-4">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="home-desc mb-4">
              <h2 className="page-title">DQ Analytics</h2>
              <p>Hello User</p>
              <p className="mb-4">Good Morning</p>
              <p>
                <strong>Workspace: </strong>Create new DQ Sheet , access older
                DQ Sheet
              </p>
              <p>
                <strong>Analytics:</strong> View the last opened or new created
                DQ Sheet
              </p>
              <p>
                <strong>Health Cards:</strong> Brand Portfolio with metrics
                Information
              </p>
              <p>
                <strong>Insights:</strong> Select multiple already generated DQ
                Sheets for insights
              </p>
              <p>
                <strong>Settings:</strong> update te general user settings,
                light mode/dark mode
              </p>
              <p>
                <strong>About Tool:</strong> description about the tool, user
                manual
              </p>
            </div>
            <div className="recent-activity">
              <TabComponent tabs={tabs} className="home-tabs" />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="main-nav">
              <div className="menu-home">
                <IoIosHome className="menu-icon" />
                <span className="menu-text">Home</span>
              </div>
              <div className="circle-menu " tooltip="Workspace">
                <Link to={"/workspace"} className="menu-list-nav">
                  <img
                    src={WorkSpaceIcon}
                    className="sidenav-icon-img"
                    alt="workspace"
                  />
                  <span className="menu-text">Workspace</span>
                </Link>
              </div>
              <div className="circle-menu" tooltip="Analytics">
                <Link to={"/analytics"} className="menu-list-nav">
                  <img
                    src={AnalyticsIcon}
                    className="sidenav-icon-img"
                    alt="Analytics"
                  />
                  <span className="menu-text">Analytics</span>
                </Link>
              </div>
              <div className="circle-menu" tooltip="Health Card">
                <Link to={"/healthcard"} className="menu-list-nav">
                  <img
                    src={HealthCardIcon}
                    className="sidenav-icon-img"
                    alt="Health Card"
                  />
                  <span className="menu-text">Health Card</span>
                </Link>
              </div>
              <div className="circle-menu" tooltip="Insights">
                <Link to={"/insights"} className="menu-list-nav">
                  <img
                    src={InsightIcon}
                    className="sidenav-icon-img"
                    alt="Insights"
                  />
                  <span className="menu-text">Insights</span>
                </Link>
              </div>
              <div className="circle-menu" tooltip="Settings">
                <Link to={"/settings"} className="menu-list-nav">
                  <img
                    src={SettingsIcon}
                    className="sidenav-icon-img"
                    alt="Settings"
                  />
                  <span className="menu-text">Settings</span>
                </Link>
              </div>
              <div className="circle-menu" tooltip="About Tool">
                <Link to={"/about"} className="menu-list-nav">
                  <img
                    src={AboutIcon}
                    className="sidenav-icon-img"
                    alt="About Tool"
                  />
                  <span className="menu-text">About Tool</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
