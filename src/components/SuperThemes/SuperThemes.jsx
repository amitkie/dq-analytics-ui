import React, { useEffect, useState } from "react";
import ButtonComponent from "../../common/button/button";
import SideBar from "../../components/sidebar/SideBar";
import { LiaArrowRightSolid } from "react-icons/lia";
import { Dropdown } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

import "./SuperThemes.scss";
import MultiSelectDropdown from "../MultiSelectDropdown/MultiSelectDropdown";
import {
  saveMetricGroup,
  getMetricGroupNames,
  saveMetricsThemeGroup,
  getMetricThemeGroupNames
} from "../../services/projectService";

function SuperThemes({ metrics, normalizedValue, projectId }) {
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
  const [metricGroupName, setMetricGroupName] = useState("");
  const [metricThemeGroupName, setMetricThemeGroupName] = useState("");


  const [uniqueSectionsBasedOnProjectId, setUniqueSectionsBasedOnProjectId] = useState([]);
  const [uniqueSelectedSectionsBasedOnProjectId, setSelectedUniqueSectionsBasedOnProjectId] = useState([]);
  const [uniquePlatformsBasedOnProjectId, setUniquePlatformsBasedOnProjectId] = useState([]);
  const [uniqueSelectedPlatformsBasedOnProjectId, setSelectedUniquePlatformsBasedOnProjectId] = useState([]);

  const [uniqueMetricsBasedOnProjectId, setUniqueMetricsBasedOnProjectId] = useState([]);
  const [uniqueSelectedMetricsBasedOnProjectId, setUniqueSelectedMetricsBasedOnProjectId] = useState([]);

  const [uniqueMetricsBasedOnProjectThemeId, setUniqueMetricsBasedOnProjectThemeId] = useState([]);
  const [uniqueSelectedMetricsThemeBasedOnProjectId, setUniqueSelectedMetricsThemeBasedOnProjectId] = useState([]);

  const [metricAndMetricGroupId, setMetricAndMetricGroupId] = useState([]);
  const [selectedMetricAndMetricGroupId, setSelectedMetricAndMetricGroupId] = useState([]);
  const [metricThemeData, setMetricThemeData] = useState([]);

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
      setUniqueMetricsBasedOnProjectThemeId(
        () => metrics?.map((mc) => {
          return { label: mc.metric_name, value: mc.metric_id }
        })
      )
    }
    if (projectId) {
      fetchMetricGroupNames();
      fetchMetricThemeGroupNames();
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
  const handleMetricThemeChange = (selectedOptions) => {
    setUniqueSelectedMetricsThemeBasedOnProjectId(selectedOptions)
  }
  const handleGroupMetricChange = (selectedOptions) => {
    setSelectedMetricAndMetricGroupId(selectedOptions)
  }
  const handleMetricThemeGroupNameChange = (e) => {
    setMetricThemeGroupName(e.target.value)
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

  const fetchMetricGroupNames = async () => {
    try {
      const metricGroupNamesResponse = await getMetricGroupNames(projectId);

      if (metricGroupNamesResponse) {
        console.log(metricGroupNamesResponse, 'metricGroupNamesResponse');

        // Correctly map the values and labels and set the state
        const metricGroups = metricGroupNamesResponse?.data?.map(gp => ({
          value: gp?.id,
          label: gp?.name
        }));

        // Set the metric groups in the state
        setMetricAndMetricGroupId(metricGroups);
      }
    } catch (err) {
      console.error('Error fetching metric group names:', err);
    }
  };
  const fetchMetricThemeGroupNames = async () => {
    try {
      const metricGroupNamesResponse = await getMetricThemeGroupNames(projectId);

      if (metricGroupNamesResponse) {
        console.log(metricGroupNamesResponse, 'metricGroupNamesResponse');
        setMetricThemeData(metricGroupNamesResponse?.data)
      }
    } catch (err) {
      console.error('Error fetching metric group names:', err);
    }
  };


  const saveMetricGroups = async () => {
    const reqPayload = {
      project_id: projectId,
      metric_ids: uniqueSelectedMetricsBasedOnProjectId.map(mc => mc.value),
      name: metricGroupName
    }
    console.log(reqPayload)
    try {
      const metricData = await saveMetricGroup(reqPayload);
      if (metricData) {
        console.log(metricData);
        fetchMetricGroupNames();
      }
    } catch (err) {

    }
  }
  const saveMetricsThemeGroups = async () => {
    console.log(selectedMetricAndMetricGroupId)
    const reqPayload = {
      project_id: projectId,
      metric_ids: uniqueSelectedMetricsThemeBasedOnProjectId?.map(mc => mc.value),
      name: metricThemeGroupName,
      metric_group_ids: selectedMetricAndMetricGroupId?.map(mgi => mgi?.value)

    }
    console.log(reqPayload)
    try {
      const metricData = await saveMetricsThemeGroup(reqPayload);
      if (metricData) {
        console.log(metricData);
        fetchMetricGroupNames();
      }
    } catch (err) {

    }
  }

  const handleMetricGroupNameChange = (e) => {
    setMetricGroupName(e.target.value)
  }


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
                  {/* <MultiSelectDropdown
                    options={uniqueMetricsBasedOnProjectId}
                    selectedValues={uniqueSelectedMetricsBasedOnProjectId}
                    onChange={handleMetricChange}
                    placeholder="Select Metrics"
                  /> */}
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
                    <label htmlFor="exampleFormControlInput1" class="form-label">
                      Select Metrics from list
                    </label>
                    <MultiSelectDropdown
                      options={uniqueMetricsBasedOnProjectId}
                      selectedValues={uniqueSelectedMetricsThemeBasedOnProjectId}
                      onChange={handleMetricThemeChange}
                      placeholder="Select Metrics"
                    />
                  </div>
                  <div class="theme-content">
                    <label htmlFor="exampleFormControlInput1" class="form-label">
                      Select Metrics Group from list
                    </label>
                    <MultiSelectDropdown
                      options={metricAndMetricGroupId}
                      selectedValues={selectedMetricAndMetricGroupId}
                      onChange={handleGroupMetricChange}
                      placeholder="Select Metrics Group"
                    />
                  </div>
                  <div class="theme-content">
                    <label htmlFor="exampleFormControlInput1" class="form-label">
                      Super Themes Group name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={metricThemeGroupName}
                      onChange={handleMetricThemeGroupNameChange}
                      id="exampleFormControlInput1"
                      placeholder="CTR, ACOS, Purchases etc"
                    />
                  </div>
                  <div class="theme-content">
                    <ButtonComponent
                      btnClass={"btn-primary"}
                      onClick={saveMetricsThemeGroups}
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
                    <label htmlFor="exampleFormControlInput1" class="form-label">
                      Select Metrics from list
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
                      options={uniqueMetricsBasedOnProjectThemeId}
                      selectedValues={uniqueSelectedMetricsBasedOnProjectId}
                      onChange={handleMetricChange}
                      placeholder="Select Metrics"
                    />
                  </div>
                  <div class="theme-content">
                    <label htmlFor="exampleFormControlInput1" class="form-label">
                      Metric Group name
                    </label>
                    <input
                      type="text"
                      value={metricGroupName}
                      onChange={(e) => handleMetricGroupNameChange(e)}
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="CTR, ACOS, Purchases etc"
                    />
                  </div>
                  <div class="theme-content">
                    <ButtonComponent
                      btnClass={"btn-primary"}
                      onClick={saveMetricGroups}
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
