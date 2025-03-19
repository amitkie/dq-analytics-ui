import React, { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaHome } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
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
import { IoIosHelpCircleOutline } from "react-icons/io";
import { setActiveMenu } from "../../features/user/userSlice";
import "./SideBar.scss";


export default function SideBar() {
  // const [activeMenu, setActiveMenu] = useState("");
  const { userInfo, projectInfo , isHamburgerOpen, isMobileView, activeMenu} = useSelector((state) => state.user);
  // const activeMenu = useSelector((state) => state.user?.activeMenu);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation(); // Get the current location
  const [menuActive, setMenuActive] = useState(location.pathname);
  const dispatch = useDispatch();
  // Helper function to check if a menu item is active

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1]; // Get the first part of the URL
    if (currentPath && currentPath !== activeMenu) {
      dispatch(setActiveMenu(currentPath)); // Update Redux store
      localStorage.setItem("activeMenu", currentPath); // Save to localStorage
    }
  }, [location.pathname, activeMenu, dispatch]);

  // useEffect(() => {
  //   setMenuActive(location.pathname);
  // }, [location.pathname]);

  // const isActive = (path) => {
  //   return location.pathname === path;
  // };

  const analyticsPath = projectInfo.project && projectInfo?.project?.length > 0
    ? `/analytics/${projectInfo.project[0].id}` 
    : undefined;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    }
    
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile])

  // useEffect(() => {
  //   const savedActiveMenu = localStorage.getItem("activeMenu");
  //   if (savedActiveMenu) {
  //     setActiveMenu(savedActiveMenu);
  //   }
  // }, []);

  const handleMenuActive = (menuPath) => {
    dispatch(setActiveMenu(menuPath)); // Update Redux state
    localStorage.setItem("activeMenu", menuPath); // Store active menu in localStorage
  };

  // Check for changes in route and set the active menu when component mounts
  useEffect(() => {
    const storedMenu = localStorage.getItem('activeMenu');
    if (storedMenu) {
      dispatch(setActiveMenu(storedMenu)); // Set active menu from localStorage if available
    }
  }, [dispatch]); // Only run once on mount

  const isActive = (path) => activeMenu === path;
  // const handleMenuActive = (menu) => {
  //   setActiveMenu(menu);
  //   localStorage.setItem("activeMenu", menu);
  // };

  const Link = ({ id, children, title, to , className }) => (
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
    <div className="sidebar-container" style={{ display: !isMobileView || (isMobileView && isHamburgerOpen) ? "flex" : "none"}}>
      <ul className="p-0">
        <li
          className={`side-nav ${activeMenu === "home" ? "active" : ""}`}
          onClick={() => handleMenuActive("home")}
          >
          <Link to={"/"} title="Home" id="m-1">
            <IoHomeOutline className={`sidenav-icon ${activeMenu === 'home' ? 'active' : ''}`} />
          </Link>
          <Link to={"/"} >
            <span className="mob-menu">Home</span>
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
          <Link to={"/workspace"}>
            <span className="mob-menu">Workspace</span>
          </Link>
        </li>
        <li
          className={`side-nav ${activeMenu === "analytics" ? "active" : ""}`}
          onClick={() => handleMenuActive("analytics")}
        >
          <Link
          to={
            projectInfo.project && projectInfo?.project?.length > 0
              ? `/analytics/${projectInfo?.project[0].id}`
              : undefined // Link should be undefined if no project exists
          }
          title="Analytics"
          id="m-3"
          onClick={(e) => {
            if (!(projectInfo.project && projectInfo?.project?.length > 0)) {
              alert('Please create a project to view this page.');
            }
          }}
        >
          <img
            src={
              activeMenu === "analytics"? AnalyticsIconActive  : AnalyticsIcon 
            }
            className="sidenav-icon-img"
            alt="Analytics"
          />
        </Link>
        <Link
          to={
            projectInfo.project && projectInfo?.project?.length > 0
              ? `/analytics/${projectInfo?.project[0].id}`
              : undefined // Link should be undefined if no project exists
          }onClick={(e) => {
            if (!(projectInfo.project && projectInfo?.project?.length > 0)) {
              alert('Please create a project to view this page.');
            }
          }}>
          <span className="mob-menu">Analytics</span>
          </Link>
        </li>
        <li
          className={`side-nav ${activeMenu === "healthcard" ? "active" : ""}`}
          onClick={() => handleMenuActive("healthcard")}
        >
          <Link to={"/healthcard"} title="Health Card" id="m-4">
            <img
              src={
                (activeMenu === "healthcard" || activeMenu === "healthcardOverview" || activeMenu === "healthcardreport")
                  ? HealthCardIconActive
                  : HealthCardIcon
              }
              className="sidenav-icon-img"
              alt="Health Card"
            />
          </Link>
          <Link to={"/healthcard"}>
            <span className="mob-menu">Health Card</span>
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
          <Link to={"/insights"} >
            <span className="mob-menu">Insights</span>
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
          <Link to={"/settings"}>
            <span className="mob-menu">Settings</span>
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
          <Link to={"/about"}>
            <span className="mob-menu">About Tool</span>
          </Link>
        </li>
        <li
          className={`side-nav ${activeMenu === "help" ? "active" : ""}`}
          onClick={() => handleMenuActive("help")}
        >
          <Link to={"/help"} title="Help" id="m-7">
            <IoIosHelpCircleOutline size={48} color="black"  className={`sidenav-icon ${activeMenu === "help" ? 'active' : ''}`} />
          </Link>
          <Link to={"/help"}>
            <span className="mob-menu">Help</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
