import React from "react";
import InputComponent from "../../common/input/input";
import ButtonComponent from "../../common/button/button";

import "./GeneralSettings.scss";

function GeneralSettings() {
  return (
    <>
      <div className="row">
        <span className="settings-title">Update your Personal details</span>
        <div className="col-6">
          <div className="mb-3">
            <InputComponent
              id={"firstname"}
              inputLabel={"First Name:"}
              inputType={"text"}
              placeholder={"Enter your First Name"}
              containerClass={"inputRow"}
            />
          </div>
          <div className="mb-3">
            <InputComponent
              id={"userEmail"}
              inputLabel={"Email"}
              inputType={"email"}
              placeholder={"Enter your Email"}
              containerClass={"inputRow"}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <InputComponent
              id={"lastname"}
              inputLabel={"Last Name:"}
              inputType={"text"}
              placeholder={"Enter your Last Name"}
              containerClass={"inputRow"}
            />
          </div>
          <div className="mb-3">
            <InputComponent
              id={"phonenumber"}
              inputLabel={"Phone Number"}
              inputType={"number"}
              containerClass={"inputRow"}
              placeholder={"Enter your Phone number"}
            />
          </div>
        </div>
        <div className="col-12 mt-5">
          <div className="d-flex justify-content-end">
            <ButtonComponent
              btnClass={"btn-primary"}
              btnName={"Update changes"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralSettings;
