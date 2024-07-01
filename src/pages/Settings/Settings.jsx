import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import TabComponent from "../../components/tabs/TabComponent";
import GeneralSettings from "../../components/GeneralSettings/GeneralSettings";

import "./Settings.scss";

function Settings() {
  const tabs = [
    {
      label: "General",
      content: <GeneralSettings />,
    },
    {
      label: "Notifications",
      content: <div>Notifications</div>,
    },
    {
      label: "Preferences",
      content: <div>Preferences</div>,
    },
    {
      label: "Profile",
      content: <div>Profile</div>,
    },
    {
      label: "Account",
      content: <div>Account</div>,
    },
    {
      label: "Plan",
      content: <div>Plan</div>,
    },
  ];
  return (
    <>
      <div className="row g-0">
        <div className="col-1">
          <SideBar />
        </div>
        <div className="col-11">
          <div className="workspace-container">
            <h2 className="page-title mt-4 ml-3">Settings</h2>
            <TabComponent tabs={tabs} className="Settings-tab" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
