import React, { useEffect, useState } from "react";
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
// import { IoIosHome } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import WorkSpaceIcon from "../../assets/images/workspace-nav.png";
import AnalyticsIcon from "../../assets/images/analytics-nav.png";
import HealthCardIcon from "../../assets/images/health-card-nav.png";
import InsightIcon from "../../assets/images/insight-nav.png";
import SettingsIcon from "../../assets/images/settings-nav.png";
import AboutIcon from "../../assets/images/aboutTool-nav.png";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TfiHelpAlt } from "react-icons/tfi";


import "./home.scss";
import WorkSpace from "../workSpace/workSpace";
import { useSelector } from "react-redux";

const Home = () => {
  const { userInfo, projectInfo } = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const items = document.querySelectorAll(".circle-menu");
  
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    window.addEventListener("resize", handleResize);
  
    // Initial call to set the layout based on the current window size
    handleResize();
  
    const halfCircleDegrees = 210; // Adjust the degrees for half-circle
  
    for (let i = 0, l = items.length; i < l; i++) {
      const angle =
        -0.5 * Math.PI - ((halfCircleDegrees / 180) * i * Math.PI) / l;
      const leftValue = isMobile
        ? (17 - 50 * Math.cos(angle)).toFixed(4) + "%"
        : (17 - 45 * Math.cos(angle)).toFixed(4) + "%";
      const topValue = isMobile
        ? (25 + 25 * Math.sin(angle)).toFixed(4) + "%"
        : (35 + 40 * Math.sin(angle)).toFixed(4) + "%";
  
      items[i].style.left = leftValue;
      items[i].style.top = topValue;
    }
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);
  const handleProjectClicks = (id) => {
    navigate(`/analytics/${id}`);
  };

  const tabs = [
    {
      label: "Recent Activity",
      content: (
        <div className="user-menu">
          {projectInfo?.project?.length > 0 ? (
            projectInfo.project.slice(0, 10).map((item) => (
              <div key={item.id} className="user-activity">
                <p>
                  Last activity on: <b>{formatDate(item.updatedAt)}</b>
                </p>
                <p>
                  Project Name: <span className="btn-text" onClick={() => handleProjectClicks(item.id)}>{item.project_name}</span>
                </p>
              </div>
            ))
          ) : (
            <p>No Projects available. Please create one.</p>
          )}
        </div>
      ),
    },
    {
      label: "Recommended",
      content: (
        <div className="user-menu">
          {projectInfo.project && projectInfo?.project?.length > 0 ? (
            <div className="user-activity">
              <p>
                Last activity on:{" "}
                <b>
                  {formatDate(
                    projectInfo?.project[0]
                      .updatedAt
                  )}
                </b>
              </p>
              <p>
                Project Name:{" "}
                <span className="btn-text" onClick={() => handleProjectClicks( projectInfo?.project[0].id)}>
                  {
                    projectInfo?.project[0]
                      .project_name
                  }
                </span>
              </p>
            </div>
          ) : (
            <p>No Projects available. Please create one.</p>
          )}
        </div>
      ),
    },
    {
      label: "Favorites",
      content: (
        <div className="user-menu">
          {projectInfo.project && projectInfo?.project.length > 0 ? (
            // Filter the projects based on the 'is_favorite' field
            projectInfo?.project
              .filter(project => project.is_favorite === true) // Only include favorite projects
              .length > 0 ? (
                // Render filtered projects
                projectInfo?.project
                .filter(project => project.is_favorite === true).map(pj => {
                  return(

                <div className="user-activity" key={pj.id}>
                  <p>
                    Last activity on:{" "}
                    <b>{formatDate(pj.updatedAt)}</b>
                  </p>
                  <p>
                    Project Name:{" "}
                    <span
                      className="btn-text"
                      onClick={() => handleProjectClicks(pj.id)}
                    >
                      {pj.project_name}
                    </span>
                  </p>
                </div>
                  )
                })
              ) : (
                <p>No favorite projects available. Please add some to your favorites.</p>
              )
          ) : (
            <p>No Projects available. Please create one.</p>
          )}
        </div>
      ),
    }
    
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
          <div className="col-sm-12 col-md-12 col-lg-6 order-sm-last order-md-last order-lg-first">
            <div className="home-desc">
              <h2 className="page-title">Digi-Cadence</h2>
              <p className="mb-4">
                Good Morning, {userInfo?.user?.first_name}{" "}
                {userInfo?.user?.last_name}
              </p>
            </div>
            <div className="recent-activity mt-5">
              <TabComponent isBenchmarkDataSaved={true} tabs={tabs} className="home-tabs" />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 order-sm-first order-md-first order-lg-last mt-4">
            <div className="main-nav">
              <div className="menu-home">
                <IoHomeOutline className="menu-icon" />
                <span className="menu-text">Home</span>
              </div>

              <div className="circle-menu">
                <Link
                  to={"/workspace"}
                  className="menu-list-nav"
                  title="Create new DC Sheet, Access older DC Sheet"
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
                {/* <Link
                  to={`/analytics/${projectInfo?.project[projectInfo?.project?.length-1].id}`}
                  // to={`/analytics/1`}
                  className="menu-list-nav"
                  title="View the last opened or new created DQ Sheet"
                >
                  <img
                    src={AnalyticsIcon}
                    className="sidenav-icon-img"
                    alt="Analytics"
                  />
                  <span className="menu-text">Analytics</span>
                </Link> */}

                {projectInfo.project && projectInfo?.project?.length > 0 ? (
                  <Link
                    to={`/analytics/${projectInfo?.project[0].id}`}
                    className="menu-list-nav"
                    title="View the last opened or newly created DC Sheet"
                  >
                    <img
                      src={AnalyticsIcon}
                      className="sidenav-icon-img"
                      alt="Analytics"
                    />
                    <span className="menu-text">Analytics</span>
                  </Link>
                ) : (
                  <div
                    className="menu-list-nav"
                    onClick={() => alert('Please create a project first to view this page.')}
                    style={{ cursor: 'pointer' }}
                    title="No projects available. Click to create one."
                  >
                    <img
                      src={AnalyticsIcon}
                      className="sidenav-icon-img"
                      alt="No Projects Available"
                    />
                    <span className="menu-text">Analytics</span>
                  </div>
                )}

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
                  title="Select multiple already generated DC Sheets for insights"
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
                  title="update the general user settings"
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
              <div className="circle-menu">
                <Link
                  to={"/help"}
                  className="menu-list-nav"
                  title="Help"
                >
                  <TfiHelpAlt className="help-menu-icon" />
                  
                  <span className="menu-text">Help</span>
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
