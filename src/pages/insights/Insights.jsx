import React, { useState, useEffect } from "react";
import TableComponent from "../../components/tableComponent/TableComponent";
import Form from "react-bootstrap/Form";
import ButtonComponent from "../../common/button/button";
import TabComponent from "../../components/tabs/TabComponent";
import GraphicalView from "../../components/GraphicalView/GraphicalView";
import SuperThemes from "../../components/SuperThemes/SuperThemes";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import LineChart from "../../common/LineChart/LineChart";
import { getData } from "../../services/q3";
import { getNormalizedData } from "../../services/quarter-metrics-normalised-data";
import {
  getAllBrands,
  getAllCategories,
  getAllPlatforms,
  getAllMetrics,
  getAllFrequencies,
} from "../../services/userService";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";

import "./Insights.scss";
import { getProjectListsByFilter, getDQScoreMultipleProjects } from "../../services/projectService";

export default function Insights() {
  const data = getData();
  const normalizedData = getNormalizedData();
  const [categories, setCategories] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [projects, setProjects] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [insightsDQScore, setInsightsDQScore] = useState([]);
  const [loading, setLoading] = useState(false);


  const [brand, setBrand] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(
          categoriesData.data.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))
        );

        const brandsData = await getAllBrands();
        setBrand(
          brandsData.data.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))
        );

        const frequencyData = await getAllFrequencies();
        setFrequencies(
          frequencyData?.data?.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))
        );

        // const projectsData = await getProjectListsByFilter();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchProjectsByFilter = async (frequency, categories) => {

    try {
      const projectData = await getProjectListsByFilter(frequency, categories);

      setProjects(
        projectData?.map((project) => ({
          value: project?.id,
          label: project?.project_name,
        }))
      )
    } catch (error) {

    }

  }
  useEffect(() => {
    if (selectedFrequencies && selectedCategories.length > 0) {
      console.log(selectedFrequencies, 'selectedFrequencies')
      console.log(selectedCategories, 'selectedCategories')
      fetchProjectsByFilter(selectedFrequencies, selectedCategories.map((sc) => sc?.value));

    }
  }, [selectedFrequencies, selectedCategories]);

  const handleBrandChanges = (selectedOptions) => {
    setSelectedBrand(selectedOptions);
  };


  const handleFrequenciesChange = (selectedOptions) => {
    console.log(selectedOptions?.target?.value, 'selectedOptions')
    setSelectedFrequencies(selectedOptions?.target?.value);
  };

  const handleCategoryChanges = (selectedOptions) => {
    // const categoryOptions = selectedOptions?.map((cg) => cg?.value);  

    setSelectedCategories((prevSelectedCategories) => {
      // Combine previous selected values with new ones, ensuring no duplicates
      const updatedCategories = [...new Set([...prevSelectedCategories, ...selectedOptions])];
      console.log(updatedCategories, 'updatedCategories')
      return updatedCategories;
    });
  };

  const handleProjectChanges = (selectedOptions) => {
    setSelectedProjects(selectedOptions);
  };

  const fetchDQScoresBasedOnFilter = async () => {
    setLoading(true);
    if (selectedProjects?.length > 0) {
      const selectedProjectsOptions = selectedProjects?.map((cg) => cg?.value);
      const requestedPayload = {
        project_ids: ['95', '96'],
      };
      console.log(requestedPayload, 'requestedPayload');

      const insightsDQScoreData = await getDQScoreMultipleProjects(requestedPayload);
      if (insightsDQScoreData?.data?.length > 0) {
        setLoading(false);
        setInsightsDQScore(insightsDQScoreData?.data);
      } else {
        setLoading(false);
        setInsightsDQScore(null);
      }
      console.log(insightsDQScoreData?.data, 'insightsDQScore');
    }
  };
  useEffect(() => {
    console.log(insightsDQScore, 'Updated insightsDQScore');
  }, [insightsDQScore]);





  const columns = [
    {
      header: "Quarter",
      accessor: "Quarter",
    },
    { header: "Category", accessor: "Category" },
    { header: "Brands", accessor: "Brands" },
    {
      header: "Digital quotient for brand (DQ)",
      accessor: "Digital quotient for brand (DQ)",
    },
    { header: "Ecom DQ Score", accessor: "Ecom DQ Score" },
    { header: "Social DQ Score", accessor: "Social DQ Score" },
    { header: "Paid Marketing DQ Score", accessor: "Paid Marketing DQ Score" },
    { header: "Organic DQ", accessor: "Organic DQ" },
  ];
  const keys = Array.from(new Set(normalizedData.flatMap(Object.keys)));
  const keysToDisplay = keys?.slice(2);
  // console.log("tableData", data);
  const tabs = [
    {
      label: "Score Comparison",
      content: (
        <>
          <div className="row">
            <div className="col-12">
              <div className="project-filter">
                <div className="range-filter">
                  <span>DQ score Range:</span>
                  <Form.Range />
                </div>
                <select name="category" className="Select-input">
                  <option value="beauty">Beauty</option>
                  <option value="haircare">Hair care</option>
                  <option value="baby">Baby</option>
                  <option value="mansGrooming">Male Grooming</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="scores-charts">
                <span className="chart-title">DQ Score</span>
                {loading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading...</span>
                  </div>
                ) : insightsDQScore ? (
                  <LineChart key={`Overall_${insightsDQScore?.project_id}`} insightsDQScoreData={insightsDQScore} scoreType="Overall_Final_Score" />
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="scores-charts">
                <span className="chart-title">Ecom DQ Score</span>
                {loading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading...</span>
                  </div>
                ) : insightsDQScore ? (
                  <LineChart key={`Ecom_${insightsDQScore?.project_id}`} insightsDQScoreData={insightsDQScore} scoreType="Ecom" />
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="scores-charts">
                <span className="chart-title">Social DQ Score</span>
                {loading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading...</span>
                  </div>
                ) : insightsDQScore ? (
                  <LineChart key={`Social_${insightsDQScore?.project_id}`} insightsDQScoreData={insightsDQScore} scoreType="Social" />
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="scores-charts">
                <span className="chart-title">Paid DQ Score</span>
                {loading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading...</span>
                  </div>
                ) : insightsDQScore ? (
                  <LineChart key={`Paid_${insightsDQScore?.project_id}`} insightsDQScoreData={insightsDQScore} scoreType="Paid" />
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="scores-charts">
                <span className="chart-title">Brand Performance Score</span>
                {loading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading...</span>
                  </div>
                ) : insightsDQScore ? (
                  <LineChart key={`BrandPerf_${insightsDQScore?.project_id}`} insightsDQScoreData={insightsDQScore} scoreType="Brand_Perf" />
                ) : (
                  <p>No data available</p>
                )}
              </div>
            </div>

          </div>
        </>
      ),
    },
    {
      label: "Super Themes",
      disabled: "disabled",
      content: (
        <div>
          <SuperThemes />
        </div>
      ),
    },
    {
      label: "Tabular Summary",
      content: (
        <div>
          <div className="filter-option d-flex mb-2 gap-3 justify-content-end">
            <MultiSelectDropdown
              options={categories}
              selectedValues={selectedCategories}
              onChange={handleCategoryChanges}
              placeholder="Select Categories"
            />
            <MultiSelectDropdown
              options={brand}
              selectedValues={selectedBrand}
              onChange={handleBrandChanges}
              placeholder="Select Categories"
            />
          </div>
          <TableComponent data={data} columns={columns} />
          <div className="pagination-container">
            <PaginationComponent />
          </div>
          {/* <Table responsive striped bordered className="insights-table">
            <tbody>
              {keysToDisplay.map((key, index) => (
                <tr key={index}>
                  <td width="25%">{key}</td>
                  {normalizedData.map((data, i) => (
                    <td key={i}>{data[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table> */}
        </div>
      ),
    },
    {
      label: "Graphical view",
      content: (
        <div>
          <GraphicalView />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="col-12">
        <div className="workspace-container">
          <h2 className="page-title mt-4 ml-3">Insights</h2>

          <div className="row mb-4">
            <div className="col-12">
              <div className="insights-filter">
                <span className="subtitle">
                  Select files from saved Projects
                </span>
                <div className="insights-project-filter">
                  {/* <select name="frequency" className="Select-input">
                      <option value="beauty">Monthly</option>
                      <option value="haircare">Quarterly</option>
                    </select> */}
                  <select
                    className="form-control-select"
                    onChange={handleFrequenciesChange}
                    selectedValues={selectedFrequencies}
                  >
                    <option value="">Select Frequencies</option>
                    {frequencies?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <MultiSelectDropdown
                    options={categories}
                    selectedValues={selectedCategories}
                    onChange={handleCategoryChanges}
                    disabled={selectedFrequencies?.length == 0}
                    placeholder="Select Categories"
                  />
                  <MultiSelectDropdown
                    options={projects}
                    selectedValues={selectedProjects}
                    onChange={handleProjectChanges}
                    disabled={selectedCategories?.lenth == 0}
                    placeholder="Select Workspace"
                  />

                  {/* <select name="category" className="Select-input">
                      <option value="beauty">Beauty</option>
                      <option value="haircare">Hair care</option>
                      <option value="baby">Baby</option>
                      <option value="mansGrooming">Men's Grooming</option>
                    </select> */}
                  {/* <select name="files" className="Select-input">
                      <option value="digitalAssessment-1">
                        Digital Assessment -1
                      </option>
                      <option value="digitalAssessment-2">
                        Digital Assessment -2
                      </option>
                      <option value="digitalAssessment-3">
                        Digital Assessment -3
                      </option>
                      <option value="digitalAssessment-4">
                        Digital Assessment -4
                      </option>
                    </select> */}
                  <ButtonComponent
                    btnClass={"btn-primary"}
                    disabled={selectedProjects?.length == 0}
                    onClick={fetchDQScoresBasedOnFilter}
                    btnName={"Submit"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="export-btn justify-content-end">
                <ButtonComponent
                  disabled
                  btnClass={"btn-primary export-excel-btn"}
                  btnName={"Download"}
                />
              </div>
              <TabComponent tabs={tabs} isBenchmarkDataSaved={true} className="insights-tabs" />
            </div>
          </div>

          {/* <div className="project-table-data mt-5">
              <TableComponent />
            </div> */}
          {/* <div className="footer-button">
              <ButtonComponent
                btnClass={"btn-outline-secondary"}
                btnName={"Back"}
              />
              <ButtonComponent
                btnClass={"btn-primary"}
                btnName={"Go to Analytics"}
              />
            </div> */}
        </div>
      </div>
    </>
  );
}
