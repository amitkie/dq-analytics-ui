import React, { useEffect } from "react";
import TabComponent from "../../components/tabs/TabComponent";
// import {
//   CircleMenu,
//   CircleMenuItem,
//   TooltipPlacement,
// } from "react-circular-menu";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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
import { useSelector } from "react-redux";

const Home = () => {
  const { userInfo, projectInfo } = useSelector((state) => state.user);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
        <div className="user-menu">
        {projectInfo?.project?.map((item) => (
          <div key={item.id} className="user-details">
            <p>Last activity on {formatDate(item.updatedAt)}</p>
            <p>Project Name: {item.project_name}</p>
          </div>
        ))}</div>
      ),
    },
    {
      label: "Recommended",
      content: <div>Recommended content shown here</div>,
    },
  ];
  const Link = ({ id, children, className, title, to }) => (
    <OverlayTrigger
      placement={"right"}
      className="tooltip-overlay"
      overlay={
        <Tooltip to={to} id="tooltip-top" className="tooltip-container">
          {title}
        </Tooltip>
      }
    >
      <a href={to} className={className}>
        {children}
      </a>
    </OverlayTrigger>
  );

  return (
    <>
      <div className="d-block px-4 mt-4">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="home-desc mb-5">
              <h2 className="page-title">DQ Analytics</h2>
              <p className="mb-4">Good Morning, {userInfo?.user?.first_name} {userInfo?.user?.last_name}</p>
              {/* <p>
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
                <strong>About Tool:</strong> Description about the tool, user
                manual
              </p> */}
            </div>
            <div className="recent-activity mt-5 pt-5">
              <TabComponent tabs={tabs} className="home-tabs" />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="main-nav">
              <div className="menu-home">
                <IoIosHome className="menu-icon" />
                <span className="menu-text">Home</span>
              </div>

              <div className="circle-menu">
                <Link
                  to={"/workspace"}
                  className="menu-list-nav"
                  title="Create new DQ Sheet, access older DQ Sheet"
                >
                  <img
                    src={WorkSpaceIcon}
                    className="sidenav-icon-img"
                    alt="workspace"
                  />
                  <span className="menu-text">Workspace</span>
                </Link>
              </div>
              <div className="circle-menu">
                <Link
                  to={"/analytics"}
                  className="menu-list-nav"
                  title="View the last opened or new created DQ Sheet"
                >
                  <img
                    src={AnalyticsIcon}
                    className="sidenav-icon-img"
                    alt="Analytics"
                  />
                  <span className="menu-text">Analytics</span>
                </Link>
              </div>
              <div className="circle-menu">
                <Link
                  to={"/healthcard"}
                  className="menu-list-nav"
                  title="Brand Portfolio with metrics Information"
                >
                  <img
                    src={HealthCardIcon}
                    className="sidenav-icon-img"
                    alt="Health Card"
                  />
                  <span className="menu-text">Health Card</span>
                </Link>
              </div>
              <div className="circle-menu">
                <Link
                  to={"/insights"}
                  className="menu-list-nav"
                  title="Select multiple already generated DQ Sheets for insights"
                >
                  <img
                    src={InsightIcon}
                    className="sidenav-icon-img"
                    alt="Insights"
                  />
                  <span className="menu-text">Insights</span>
                </Link>
              </div>
              <div className="circle-menu">
                <Link
                  to={"/settings"}
                  className="menu-list-nav"
                  title="update te general user settings, light mode/dark mode"
                >
                  <img
                    src={SettingsIcon}
                    className="sidenav-icon-img"
                    alt="Settings"
                  />
                  <span className="menu-text">Settings</span>
                </Link>
              </div>
              <div className="circle-menu">
                <Link
                  to={"/about"}
                  className="menu-list-nav"
                  title="Description about the tool, user manual"
                >
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
