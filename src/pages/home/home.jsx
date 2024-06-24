import React from "react";
import TabComponent from "../../components/tabs/TabComponent";
import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";
import { FaHome } from "react-icons/fa";
import WorkSpaceIcon from "../../assets/images/workspace-nav.png";
import AnalyticsIcon from "../../assets/images/analytics-nav.png";
import HealthCardIcon from "../../assets/images/health-card-nav.png";
import InsightIcon from "../../assets/images/insight-nav.png";
import SettingsIcon from "../../assets/images/settings-nav.png";
import AboutIcon from "../../assets/images/aboutTool-nav.png";

import "./home.scss";

const Home = () => {
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
      content: <div>Add Insights </div>,
    },
  ];
  // const tabs = [
  //   {
  //     label: "Recent Activity",
  //     content: (
  //       <div>
  //         <p>Last activity on May 22, 2024</p>
  //         <p>Project Name: DQ Files_May_24-Q1</p>
  //       </div>
  //     ),
  //   },
  //   {
  //     label: "Recommended",
  //     content: (
  //       <div>
  //         <p>Recommended content shown here</p>
  //       </div>
  //     ),
  //   },
  // ];

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
              <TabComponent tabs={tabs} className="custom-tabs" />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="main-nav">
              <CircleMenu
                startAngle={-86}
                rotationAngle={210}
                itemSize={6}
                radius={16}
                rotationAngleInclusive={false}
                className="Main-menu"
                menuText="Menu"
              >
                <CircleMenuItem
                  className="menu-list-nav"
                  tooltip="Workspace"
                  menuText="MenuAdded"
                >
                  <img
                    src={WorkSpaceIcon}
                    className="sidenav-icon-img"
                    alt="workspace"
                  />
                  <span className="menu-text">Workspace</span>
                </CircleMenuItem>
                <CircleMenuItem className="menu-list-nav" tooltip="Analytics">
                  <img
                    src={AnalyticsIcon}
                    className="sidenav-icon-img"
                    alt="Analytics"
                  />
                  <span className="menu-text">Analytics</span>
                </CircleMenuItem>
                <CircleMenuItem className="menu-list-nav" tooltip="Health card">
                  <img
                    src={HealthCardIcon}
                    className="sidenav-icon-img"
                    alt="Health Card"
                  />
                  <span className="menu-text">Health Card</span>
                </CircleMenuItem>
                <CircleMenuItem className="menu-list-nav" tooltip="Insights">
                  <img
                    src={InsightIcon}
                    className="sidenav-icon-img"
                    alt="Insights"
                  />
                  <span className="menu-text">Insights</span>
                </CircleMenuItem>
                <CircleMenuItem className="menu-list-nav" tooltip="Settings">
                  <img
                    src={SettingsIcon}
                    className="sidenav-icon-img"
                    alt="Settings"
                  />
                  <span className="menu-text">Settings</span>
                </CircleMenuItem>
                <CircleMenuItem className="menu-list-nav" tooltip="About Tool">
                  <img
                    src={AboutIcon}
                    className="sidenav-icon-img"
                    alt="About Tool"
                  />
                  <span className="menu-text">About Tool</span>
                </CircleMenuItem>
              </CircleMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
