import React, { useEffect, useState } from "react";
import ButtonComponent from "../../common/button/button";
import SideBar from "../../components/sidebar/SideBar";
import { LiaArrowRightSolid } from "react-icons/lia";
import { Dropdown } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import TabComponent from "../../components/tabs/TabComponent";
import "./SuperThemes.scss";
import MultiSelectDropdown from "../MultiSelectDropdown/MultiSelectDropdown";
import {
  saveMetricGroup,
  getMetricGroupNames,
  saveMetricsThemeGroup,
  getMetricThemeGroupNames,
  getWeightsOfSuperTheme,
  getWeightsOfMetricGroup,
  getWeightsOfGroupNormalised
} from "../../services/projectService";
import MetricThemeGroupList from "./MetricThemeGroupList";
import MetricWeights from "./MetricWeights";

function SuperThemes({ metrics, normalizedValue={}, projectId }) {
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
  console.log("normalizedValue value", normalizedValue)
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [metricGroupName, setMetricGroupName] = useState("");
  const [metricThemeGroupName, setMetricThemeGroupName] = useState("");
  const [metricGroupData, setMetricGroupData] = useState([]);
  const [metricThemeGroupData, setMetricThemeGroupData] = useState([]);
  const [metricThemeGroupWeightsData, setMetricThemeGroupWeightsData] = useState([]);
  const [totalWeightInfo, setTotalWeightInfo] = useState([]);
  const [apiStatus, setApiStatus] = useState({
    metricGroup: { loading: false, error: null, success: null },
    metricThemeGroup: { loading: false, error: null, success: null },
    getMetricGroup: { loading: false, error: null, success: null },
    getThemeMetricGroup: { loading: false, error: null, success: null },
    normalizedWeights: { loading: false, error: null, success: null },
  });

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

  const [themeGroupTable, setThemeGroupTable] = useState([]);

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
      fetchWeightsOfGroupMetric();
      fetchWeightsOfGroupNormalized();
    }


  }, [metrics])

  const handleApiStatusChange = (type, statusKey, value) => {
    setApiStatus(prevState => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [statusKey]: value
      }
    }));
  };

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
      handleApiStatusChange('getMetricGroup', 'loading', true);
      handleApiStatusChange('getMetricGroup', 'error', null);
      handleApiStatusChange('getMetricGroup', 'success', null);
      const metricGroupNamesResponse = await getMetricGroupNames(projectId);


      if (metricGroupNamesResponse) {
        console.log(metricGroupNamesResponse, 'metricGroupNamesResponse');
        setMetricGroupData(metricGroupNamesResponse?.data)
        // Correctly map the values and labels and set the state
        const metricGroups = metricGroupNamesResponse?.data?.map(gp => ({
          value: gp?.id,
          label: gp?.name
        }));

        // Set the metric groups in the state
        setMetricAndMetricGroupId(metricGroups);
      }

    } catch (err) {
      // handleApiStatusChange('getMetricGroup', 'error', "An error occurred while saving metric theme group.");
    }
    finally {
      handleApiStatusChange('getMetricGroup', 'loading', false);
    }
  };
  const fetchMetricThemeGroupNames = async () => {
    try {
      handleApiStatusChange('getThemeMetricGroup', 'loading', true);
      handleApiStatusChange('getThemeMetricGroup', 'error', null);
      handleApiStatusChange('getThemeMetricGroup', 'success', null);

      handleApiStatusChange('normalizedWeights', 'loading', true);
      handleApiStatusChange('normalizedWeights', 'error', null);
      handleApiStatusChange('normalizedWeights', 'success', null);
      const metricGroupNamesResponse = await getMetricThemeGroupNames(projectId);

      if (metricGroupNamesResponse) {
        console.log(metricGroupNamesResponse, 'metricGroupNamesResponse');

        setMetricThemeGroupData(metricGroupNamesResponse?.data);
        
        const data = {
          project_ids: [projectId]
        }
        const weightsInfo = await getWeightsOfSuperTheme(data);
        if(weightsInfo){
          handleApiStatusChange('normalizedWeights', 'loading', false);
          handleApiStatusChange('normalizedWeights', 'success', true);
        }
        setTotalWeightInfo(weightsInfo)
        setMetricThemeGroupWeightsData(weightsInfo);
        console.log(weightsInfo, 'weightsInfoweightsInfoweightsInfo')

      }
    } catch (err) {
      // handleApiStatusChange('getThemeMetricGroup', 'error', "An error occurred while saving metric theme group.");
    } finally {
      handleApiStatusChange('getThemeMetricGroup', 'loading', false);
      handleApiStatusChange('normalizedWeights', 'loading', false);
    }
  };

  const fetchWeightsOfGroupNormalized = async() => {
    try{
      const reqPayload = { project_ids: [projectId] }
      const data = await getWeightsOfGroupNormalised(reqPayload);
      if(data){
        setThemeGroupTable(data)
      }
      console.log(data);
    }catch(err){

    }
  }
  const fetchWeightsOfGroupMetric = async() => {
    try{
      const reqPayload = { project_ids: [projectId] }
      const data = await getWeightsOfMetricGroup(reqPayload);
      console.log(data);
    }catch(err){

    }
  }


  const saveMetricGroups = async () => {
    const reqPayload = {
      project_id: projectId,
      metric_ids: uniqueSelectedMetricsBasedOnProjectId.map(mc => mc.value),
      name: metricGroupName
    }
    handleApiStatusChange('metricGroup', 'loading', true);
    handleApiStatusChange('metricGroup', 'error', null);
    handleApiStatusChange('metricGroup', 'success', null);
    console.log(reqPayload)
    try {
      const metricData = await saveMetricGroup(reqPayload);
      if (metricData) {
        console.log(metricData);
        handleApiStatusChange('metricGroup', 'success', "Metric group saved successfully!");
        fetchMetricGroupNames();
        const data = await getWeightsOfMetricGroup({ project_ids: [projectId] });
        console.log(data)
      }
    } catch (err) {
      handleApiStatusChange('metricGroup', 'error', "An error occurred while saving metric group.");
    }
    finally {
      handleApiStatusChange('metricGroup', 'loading', false);
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
    handleApiStatusChange('metricThemeGroup', 'loading', true);
    handleApiStatusChange('metricThemeGroup', 'error', null);
    handleApiStatusChange('metricThemeGroup', 'success', null);
    try {
      const metricData = await saveMetricsThemeGroup(reqPayload);
      if (metricData) {
        handleApiStatusChange('metricThemeGroup', 'success', "Theme group saved successfully!");

        console.log(metricData);
        await fetchMetricGroupNames();
        await fetchWeightsOfGroupNormalized();
        await fetchMetricThemeGroupNames()
       
      }
    } catch (err) {
      handleApiStatusChange('metricThemeGroup', 'error', "Failed to save Theme group!");
    } finally {
      handleApiStatusChange('metricThemeGroup', 'loading', false);
    }
  }



  const handleMetricGroupNameChange = (e) => {
    setMetricGroupName(e.target.value)
  }

  const transformResponseToPayload = (data, project_id) => {
    const payload = {
      project_id: project_id,
      theme_buckets: []
    };

    data.forEach((group) => {
      const themeBucket = {
        theme_bucket_id: group.id,
        group_metric_id: [group.id],
        single_metric_id: group.metric_ids.map(id => parseInt(id))
      };

      payload.theme_buckets.push(themeBucket)
    });

    return payload;
  }

  const getDetails = () => {
    const reqPayload = transformResponseToPayload(metricThemeGroupData, projectId);
    console.log(reqPayload, "payload")
  }

  const tabs = [
    {
      label: "Super Themes Setup",
      content: (
        <>
          <div className="row">
            <div className="col-12">
              <div className="metric-select">

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
            <div className="col-md-6 col-lg-3">
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
                      disabled={uniqueSelectedMetricsThemeBasedOnProjectId?.length < 1 || !metricThemeGroupName}
                      onClick={saveMetricsThemeGroups}
                      btnName={"Save"}
                    />
                  </div>
                  {(apiStatus.metricThemeGroup.loading || apiStatus.metricThemeGroup.success || apiStatus.metricThemeGroup.error) && (
                    <div className="theme-status-overflow">
                      {apiStatus.metricThemeGroup.loading && <div className="loader-container"><span>Loading...</span></div>}
                      {apiStatus.metricThemeGroup.success && <div className="success-message">{apiStatus.metricThemeGroup.success}</div>}
                      {apiStatus.metricThemeGroup.error && <div className="error-message">{apiStatus.metricThemeGroup.error}</div>}
                    </div>
                  )}

                </fieldset>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
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
                      disabled={uniqueSelectedMetricsBasedOnProjectId?.length < 1 || !metricGroupName}
                      onClick={saveMetricGroups}
                      btnName={"Save"}
                    />
                  </div>
                   
                  {(apiStatus.metricGroup.loading || apiStatus.metricGroup.success || apiStatus.metricGroup.error) && (
                    <div className="theme-status-overflow">
                      {apiStatus.metricGroup.loading && (
                        <div className="loader-container">
                          <span>Loading...</span>
                        </div>
                      )}
                      {apiStatus.metricGroup.success && (
                        <div className="success-message">{apiStatus.metricGroup.success}</div>
                      )}
                      {apiStatus.metricGroup.error && (
                        <div className="error-message">{apiStatus.metricGroup.error}</div>
                      )}
                    </div>
                  )}
                   
                </fieldset>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="create-theme">
                <fieldset>
                  <legend>Super Theme Final Metrics</legend>
                  <div className="theme-content">
                    {/* <strong>Selected Options:</strong> */}
                    <div className="d-flex flex-column">
                      <div className="selected-languages">

                        <MetricThemeGroupList removeMetric={removeLanguage} metricThemeGroups={metricThemeGroupData} />
                        {selectedLanguages.map((language, index) => (
                          <div key={index} className="selected-metrics">
                            <span style={{ marginRight: "10px" }}>{language}</span>
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
            <div className="col-md-6 col-lg-3">
              <div className="create-theme">
                <fieldset>
                  <legend>Weights</legend>
                  <div className="theme-content pt-0">
                    <h5 className="group-name-heading pb-4"> of selected groups</h5>
                    {(apiStatus.normalizedWeights.loading || apiStatus.normalizedWeights.success || apiStatus.normalizedWeights.error) && (
                      <div className={apiStatus.normalizedWeights.loading && "theme-status-overflow"}>
                        {apiStatus.normalizedWeights.loading && <div className="loader-container"><span>Loading...</span></div>}
                        <div className="success-message">{!apiStatus.normalizedWeights.loading && totalWeightInfo && totalWeightInfo.length > 0 ? <h4>{totalWeightInfo[0]?.weight_sum}</h4> : 'No Weights Found'}</div>
                        {apiStatus.normalizedWeights.error && <div className="error-message">{apiStatus.normalizedWeights.error}</div>}
                      </div>
                    )}
                    <div className="d-flex flex-column">
                      <div className="selected-languages">
                      <MetricWeights removeMetric={removeLanguage} metricThemeGroupWeights={metricThemeGroupWeightsData} />
                        {console.log("metricThemeGroupWeightsData", metricThemeGroupWeightsData)}
                        {selectedLanguages.map((language, index) => (
                          <div key={index} className="selected-metrics">
                            <span style={{ marginRight: "10px" }}>{language}</span>
                            <FaTimes
                              style={{ cursor: "pointer" }}
                              onClick={() => removeLanguage(language)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    

                    {/* {loading ? (
                      <div className="loader-container-sm">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) : totalWeightInfo && totalWeightInfo.length > 0 ? (
                      <h4>{totalWeightInfo[0]?.weight_sum}</h4>
                    ) : (
                      <div>No data found</div>
                    )} */}
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
                  onClick={getDetails}
                />
              </div>
            </div>
          </div>
        </>
      ),
    },

    {
      label: "super themes values",
      content: (
        <>
          {themeGroupTable?.length > 0 ? (
            (() => {
              const brandNames = [...new Set(themeGroupTable?.map(item => item.brandname))];
    
              // Group data by theme_group_name and metric_group_name
              const groupedData = themeGroupTable?.reduce((acc, curr) => {
                const { theme_group_name, metric_group_name, brandname, normalized_per_weight, final_theme_norm_value } = curr;
                const themeMetricKey = `${theme_group_name}-${metric_group_name}`;
    
                if (!acc[themeMetricKey]) {
                  acc[themeMetricKey] = { theme_group_name, metric_group_name, values: {}, final_theme_norm_values: {} };
                }
                acc[themeMetricKey].values[brandname] = normalized_per_weight;
                acc[themeMetricKey].final_theme_norm_values[brandname] = final_theme_norm_value;
    
                return acc;
              }, {});
    
              // Extract rows for the table
              const tableRows = Object.values(groupedData);
    
              return (
                <Table responsive striped bordered className="insights-table comparision-table">
                  <thead>
                    <tr>
                      <th className="sticky-col" style={{ width: '160px' }}>Super Theme Groups</th>
                      <th className="sticky-col" style={{ width: '160px' }}>Super Theme Group Metrics</th>
                      {brandNames.map((brand, index) => (
                        <th key={index}>{brand}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, index) => {
                      // Get rowCount for each super theme group
                      const rowCount = tableRows.filter(r => r.theme_group_name === row.theme_group_name).length;
    
                      // Check if it's the last metric for the theme group to add the final row after it
                      const isLastMetricForGroup = (index + 1 === tableRows.length) || (tableRows[index + 1].theme_group_name !== row.theme_group_name);
    
                      return (
                        <React.Fragment key={index}>
                          <tr>
                            {index === 0 || tableRows[index - 1].theme_group_name !== row.theme_group_name ? (
                              <td rowSpan={rowCount} className="sticky-col group-td" style={{ width: '160px' }}>
                                {row.theme_group_name}
                              </td>
                            ) : null}
    
                            <td className="sticky-col" style={{ width: '160px' }}>{row.metric_group_name}</td>
                            {brandNames.map((brand, idx) => (
                              <td key={idx}>
                                {row.values[brand] !== undefined ? row.values[brand].toFixed(2) : 0}
                              </td>
                            ))}
                          </tr>
    
                          {isLastMetricForGroup && (
                            <tr>
                              <td colSpan={2} className="sticky-col group-td" style={{ fontWeight: 'bold', width: '160px' }}>Final Theme Normalized Value</td>
                              {brandNames.map((brand, idx) => (
                                <td key={idx} style={{ fontWeight: 'bold' }}>
                                  {row.final_theme_norm_values[brand] !== undefined ? row.final_theme_norm_values[brand].toFixed(2) : 0}
                                </td>
                              ))}
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              );
            })()
          ) : (
            <p>No data found</p>
          )}
        </>
      ),
    }
    
    
  ]

  return (
    <>
      <div className="row g-0">
        <div className="col-12">
          <TabComponent tabs={tabs} isBenchmarkDataSaved={true} className="analytics-tabs" />

        </div>
      </div>
    </>
  );
}

export default SuperThemes;
