import React, { useEffect, useState } from "react";
import ButtonComponent from "../../common/button/button";
import SideBar from "../../components/sidebar/SideBar";
import { LiaArrowRightSolid } from "react-icons/lia";
import { Dropdown } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

import "./SuperThemes.scss";
import MultiSelectDropdown from "../MultiSelectDropdown/MultiSelectDropdown";

function SuperThemes({ metrics, normalizedValue }) {
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
  console.log(metrics, "metricsData");
  console.log(normalizedValue, 'normalizedValue')
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [uniqueSectionsBasedOnProjectId, setUniqueSectionsBasedOnProjectId] = useState([]);
  const [uniqueSelectedSectionsBasedOnProjectId, setSelectedUniqueSectionsBasedOnProjectId] = useState([]);
  const [uniquePlatformsBasedOnProjectId, setUniquePlatformsBasedOnProjectId] = useState([]);
  const [uniqueSelectedPlatformsBasedOnProjectId, setSelectedUniquePlatformsBasedOnProjectId] = useState([]);
  const [uniqueMetricsBasedOnProjectId, setUniqueMetricsBasedOnProjectId] = useState([]);
  const [uniqueSelectedMetricsBasedOnProjectId, setUniqueSelectedMetricsBasedOnProjectId] = useState([]);

  useEffect(() => {
    if (metrics) {

      setUniqueSectionsBasedOnProjectId(() => {
        const uniqueSections = metrics
          ?.map((mc) => mc.section)
          ?.filter((section, index, self) =>
            index === self.findIndex((s) => s.id === section.id)
          )?.map((section) => ({
            value: section.id,
            label: section.name
          }));

        return uniqueSections;
      });

      setUniquePlatformsBasedOnProjectId(() => {
        const uniquePlatforms = metrics
          ?.map((mc) => mc.platform)
          ?.filter((platform, index, self) =>
            index === self.findIndex((s) => s.id === platform.id)
          )?.map((platform) => ({
            value: platform.id,
            label: platform.name
          }));

        return uniquePlatforms;
      });

      setUniqueMetricsBasedOnProjectId(
        () => metrics?.map((mc) => {
          return { label: mc.metric_name, value: mc.metric_id }
        })
      )

    }


  }, [metrics])

  const handleSectionChange = (selectedOptions) => {
    setSelectedUniqueSectionsBasedOnProjectId(selectedOptions)
  }
  const handlePlatformChange = (selectedOptions) => {
    setSelectedUniquePlatformsBasedOnProjectId(selectedOptions)
  }
  const handleMetricChange = (selectedOptions) => {
    setUniqueSelectedMetricsBasedOnProjectId(selectedOptions)
  }
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
                  <MultiSelectDropdown
                    options={uniqueSectionsBasedOnProjectId}
                    selectedValues={uniqueSelectedSectionsBasedOnProjectId}
                    onChange={handleSectionChange}
                    placeholder="Select Sections"
                  />
                  <MultiSelectDropdown
                    options={uniquePlatformsBasedOnProjectId}
                    selectedValues={uniqueSelectedPlatformsBasedOnProjectId}
                    onChange={handlePlatformChange}
                    placeholder="Select Platforms"
                  />
                  <MultiSelectDropdown
                    options={uniqueMetricsBasedOnProjectId}
                    selectedValues={uniqueSelectedMetricsBasedOnProjectId}
                    onChange={handleMetricChange}
                    placeholder="Select Metrics"
                  />
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
            <div className="col-md-6 col-lg-4">
              <div className="create-theme">
                <fieldset>
                  <legend>Create Super Theme Group</legend>
                  <div class="theme-content">
                    <label for="exampleFormControlInput1" class="form-label">
                      Select Metrics/Group from list
                    </label>
                    <MultiSelectDropdown
                      options={uniqueMetricsBasedOnProjectId}
                      selectedValues={uniqueSelectedMetricsBasedOnProjectId}
                      onChange={handleMetricChange}
                      placeholder="Select Metrics"
                    />
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
            <div className="col-md-6 col-lg-4">
              <div className="create-theme">
                <fieldset>
                  <legend>Create Metric Group</legend>
                  <div class="theme-content">
                    <label for="exampleFormControlInput1" class="form-label">
                      Select Metrics/Group from list
                    </label>
                    {/* <Dropdown
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
                    </Dropdown> */}

                    <MultiSelectDropdown
                      options={uniqueMetricsBasedOnProjectId}
                      selectedValues={uniqueSelectedMetricsBasedOnProjectId}
                      onChange={handleMetricChange}
                      placeholder="Select Metrics"
                    />
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
            <div className="col-md-6 col-lg-2">
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
            <div className="col-md-6 col-lg-2">
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
