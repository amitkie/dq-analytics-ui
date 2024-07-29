import React, { useState } from "react";
import ButtonComponent from "../../common/button/button";
import SideBar from "../../components/sidebar/SideBar";
import { LiaArrowRightSolid } from "react-icons/lia";
import { Dropdown } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

import "./SuperThemes.scss";

function SuperThemes() {
  const [field, setField] = useState([]);
  const languages = [
    "Average ratings",
    "Reviews",
    "Net sentiment of reviews",
    "Availability%",
    "Search - Spends",
    "Impressions",
    "CPM",
    "Clicks",
    "CTR",
    "CPC",
    "Purchases",
  ];
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleLang = (option) => {
    if (selectedLanguages.includes(option)) {
      setSelectedLanguages(selectedLanguages.filter((item) => item !== option));
    } else {
      setSelectedLanguages([...selectedLanguages, option]);
    }
  };

  const removeLanguage = (language) => {
    setSelectedLanguages(selectedLanguages.filter((item) => item !== language));
  };

  const handleDropdownToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };
  return (
    <>
      <div className="row g-0">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="metric-select">
                <h4>Super Themes Setup</h4>
                <div className="select-metric-option">
                  <select name="category" className="Select-input">
                    <option value="Select Metrics">Select Section</option>
                    <option value="ecom">Ecom</option>
                    <option value="Social">Social</option>
                    <option value="Paid">Paid</option>
                    <option value="brand-perf">Brand Perf</option>
                  </select>
                  <select name="category" className="Select-input">
                    <option value="Select Metrics">Select platform</option>
                    <option value="ecom">Amazon</option>
                    <option value="Social">Amazon - Search Campaigns </option>
                    <option value="Organic">Flipkart PLA Campaigns</option>
                    <option value="Paid">Big Basket Campaigns</option>
                    <option value="Brand Performance">Blinkit Campaigns</option>
                    <option value="Brand Performance">Nykaa Campaigns</option>
                    <option value="Brand Performance">Myntraa Campaigns</option>
                    <option value="Brand Performance">SEO</option>
                    <option value="Brand Performance">
                      Facebook, Twitter, Instagram
                    </option>
                    <option value="Brand Performance">
                      Gadwords, Facebook, DV360
                    </option>
                    <option value="Brand Performance">Google Analytics</option>
                    <option value="Brand Performance">
                      Page Speed Insights
                    </option>
                    <option value="Brand Performance">SEOptimer</option>
                  </select>
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
          </div>
          <div className="row row-flex g-0">
            <div className="col-4">
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
                      placeholder="CTR, ACOS, Purchases etc"
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
            <div className="col-4">
              <div className="create-theme">
                <fieldset>
                  <legend>Create Metric Group</legend>
                  <div class="theme-content">
                    <label for="exampleFormControlInput1" class="form-label">
                      Select Metrics/Group from list
                    </label>
                    <Dropdown
                      show={isDropdownOpen}
                      onToggle={handleDropdownToggle}
                    >
                      <Dropdown.Toggle
                        variant="outline"
                        id="dropdown-basic"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="form-select"
                      >
                        Select Options
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {languages.map((option, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLang(option);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedLanguages.includes(option)}
                              onChange={() => toggleLang(option)}
                              className="dropdown-checkbox"
                            />
                            {option}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div class="theme-content">
                    <label for="exampleFormControlInput1" class="form-label">
                      Super Themes Group name
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="CTR, ACOS, Purchases etc"
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
                  <legend>Super Theme Final Metrics</legend>
                  <div className="theme-content">
                    <strong>Selected Options:</strong>
                    <div className="d-flex flex-column">
                      <div className="selected-languages">
                        {selectedLanguages.map((language, index) => (
                          <div key={index} className="selected-metrics">
                            <p style={{ marginRight: "10px" }}>{language}</p>
                            <FaTimes
                              style={{ cursor: "pointer" }}
                              onClick={() => removeLanguage(language)}
                            />
                          </div>
                        ))}
                      </div>
                      {/* <span className="final-metrics-container">
                        {selectedLanguages.map((languages, index) => (
                          <span className="final-metrics" key={index}>
                            {languages}
                          </span>
                        ))}
                      </span> */}
                    </div>
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
          <div className="row g-0">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center mt-5">
                <ButtonComponent
                  btnClass={"btn-primary w-25"}
                  btnName={"Save"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperThemes;
