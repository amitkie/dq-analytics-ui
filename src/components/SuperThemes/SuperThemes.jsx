import React from "react";
import ButtonComponent from "../../common/button/button";
import SideBar from "../../components/sidebar/SideBar";
import { LiaArrowRightSolid } from "react-icons/lia";

import "./SuperThemes.scss";

function SuperThemes() {
  return (
    <>
      <div className="row g-0">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="metric-select">
                <h4>Super Themes Setup</h4>
                <select name="category" className="Select-input">
                  <option value="Select Metrics">Select Metrics</option>
                  <option value="ecom">Ecom</option>
                  <option value="Social">Social</option>
                  <option value="Organic">Organic</option>
                  <option value="Paid">Paid</option>
                  <option value="Brand Performance">Brand Performance</option>
                </select>
                <ButtonComponent
                  btnClass={"btn-primary next-btn"}
                  btnIconAfter={<LiaArrowRightSolid />}
                  btnName={"Next"}
                />
              </div>
            </div>
          </div>
          <div className="row row-flex g-0">
            <div className="col-5">
              <div className="create-theme">
                <fieldset>
                  <legend>Create Super Theme Group</legend>
                  <div class="theme-content">
                    <label for="exampleFormControlInput1" class="form-label">
                      Select Metrics/Group from list
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div class="theme-content">
                    <label for="exampleFormControlInput1" class="form-label">
                      Super Themes Group name
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div class="theme-content">
                    <ButtonComponent
                      btnClass={"btn-primary"}
                      btnName={"Save"}
                    />
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="col-5">
              <div className="create-theme">
                <fieldset>
                  <legend>Create Super Theme Group</legend>
                  <div class="theme-content">
                    <label for="exampleFormControlInput1" class="form-label">
                      Select Metrics/Group from list
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div class="theme-content">
                    <label for="exampleFormControlInput1" class="form-label">
                      Super Themes Group name
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div class="theme-content">
                    <ButtonComponent
                      btnClass={"btn-primary"}
                      btnName={"Save"}
                    />
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="col-2">
              <div className="create-theme">
                <fieldset>
                  <legend>Weights of selected groups</legend>
                  <div className="theme-content">
                    <h4>5</h4>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperThemes;
