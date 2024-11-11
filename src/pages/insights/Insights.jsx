import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { getProjectListsByFilter, getDQScoreMultipleProjects, getProjectsByDateRangeForUser } from "../../services/projectService";
import InsightsTabular from "./InisghtsTabular";

export default function Insights() {
  const data = getData();
  const { projectId, projectName } = useParams();

  const normalizedData = getNormalizedData();
  const [categories, setCategories] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [projects, setProjects] = useState([]);
  const { userInfo, projectInfo } = useSelector((state) => state.user);


  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [insightsDQScore, setInsightsDQScore] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState("Monthly");
  const [selectedValue, setSelectedValue] = useState();
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

  useEffect(() => {
    fetchDQScoresBasedOnFilter()
  }, [projectId])

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
      fetchProjectsByFilter(selectedFrequencies, selectedCategories.map((sc) => sc?.value));

    }
  }, [selectedFrequencies, selectedCategories]);

  const handleBrandChanges = (selectedOptions) => {
    setSelectedBrand(selectedOptions);
  };


  const handleFrequenciesChange = (selectedOptions) => {
    setSelectedFrequencies(selectedOptions?.target?.value);
    let freq = "Monthly"
    switch (parseInt(selectedOptions?.target?.value, 10)) {
      case 1:
        freq = "Monthly"
        break;
      case 2:
        freq = "Quarterly"
        break;
      default:
        break;
    }
    setSelectedFrequency(freq)
  };


  const handleCategoryChanges = (selectedOptions) => {

    setSelectedCategories((prevSelectedCategories) => {
      const updatedCategories = [...new Set([...prevSelectedCategories, ...selectedOptions])];
      return updatedCategories;
    });
  };

  const handleProjectChanges = (selectedOptions) => {
    setSelectedProjects(selectedOptions);
  };

  const fetchDQScoresBasedOnFilter = async () => {
    setLoading(true);
    try {

      if (selectedProjects?.length > 0) {
        const selectedProjectsOptions = selectedProjects?.map((cg) => cg?.value);
        const requestedPayload = {
          project_ids: selectedProjects.map((prj) => prj.value),
        };

        const insightsDQScoreData = await getDQScoreMultipleProjects(requestedPayload);
        if (insightsDQScoreData?.data?.length > 0) {
          setLoading(false);
          setInsightsDQScore(insightsDQScoreData?.data);
        } else {
          setLoading(false);
          setInsightsDQScore(null);
        }
      } else if (projectId) {
        const requestedPayload = {
          project_ids: [projectId],
        };

        const insightsDQScoreData = await getDQScoreMultipleProjects(requestedPayload);
        if (insightsDQScoreData?.data?.length > 0) {
          setLoading(false);
          setInsightsDQScore(insightsDQScoreData?.data);
        } else {
          setLoading(false);
          setInsightsDQScore(null);
        }
      }
    } catch (error) {
      setLoading(false);
      setInsightsDQScore(null);
    }
  };

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    const payload = {
      user_id: userInfo?.user?.id,
      filter: {
        type: selectedFrequency,
        value: value
      }
    }
    fetchProjectDetails(payload)

    setSelectedValue(value);
  };

  const fetchProjectDetails = async (reqPayload) => {
    try {
      const projectResponse = await getProjectsByDateRangeForUser(reqPayload);
      const projects = projectResponse?.projects
      ?.filter((project) => project.is_benchmark_saved) 
      .map((project) => ({
        value: project.id,
        label: project.project_name,
      }));

      setProjects(projects);

    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }


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

  const columns1 = [
    { header: "Marketplace", accessor: "Marketplace" },
    {
      header: "Digital Spends",
      accessor: "Digital Spends",
    },
    { header: "Organic Performance", accessor: "Organic Performance" },
    { header: "Socialwatch", accessor: "Socialwatch" },
    { header: "DQ Score", accessor: "Overall_Final_Score" },
  ];


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
                <MultiSelectDropdown
                  options={brand}
                  selectedValues={selectedBrand}
                  onChange={handleBrandChanges}
                  placeholder="Select Brands"
                />
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
                  <LineChart
                    key={`Overall_Final_Score_${insightsDQScore[0]?.project_name}`}
                    insightsDQScoreData={insightsDQScore}
                    scoreType="Overall_Final_Score"
                    filteredBrands={selectedBrand.map(b => b.label)}
                  />
                ) : (
                  <p className="no-data">No data available</p>
                )}
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="scores-charts">
                <span className="chart-title">Marketplace</span>
                {loading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading...</span>
                  </div>
                ) : insightsDQScore ? (
                  <LineChart
                    key={`Marketplace_${insightsDQScore[0]?.project_name}`}
                    insightsDQScoreData={insightsDQScore}
                    scoreType="Marketplace"
                    filteredBrands={selectedBrand.map(b => b.label)}
                  />
                ) : (
                  <p className="no-data">No data available</p>
                )}
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="scores-charts">
                <span className="chart-title">Digital Spends</span>
                {loading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading...</span>
                  </div>
                ) : insightsDQScore ? (
                  <LineChart
                    key={`Digital_Spends_${insightsDQScore[0]?.project_name}`}
                    insightsDQScoreData={insightsDQScore}
                    scoreType="Digital Spends"
                    filteredBrands={selectedBrand.map(b => b.label)}
                  />
                ) : (
                  <p className="no-data">No data available</p>
                )}
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="scores-charts">
                <span className="chart-title">Organic Performance</span>
                {loading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading...</span>
                  </div>
                ) : insightsDQScore ? (
                  <LineChart
                    key={`Organic_Performance_${insightsDQScore[0]?.project_name}`}
                    insightsDQScoreData={insightsDQScore}
                    scoreType="Organic Performance"
                    filteredBrands={selectedBrand.map(b => b.label)}
                  />
                ) : (
                  <p className="no-data">No data available</p>
                )}
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="scores-charts">
                <span className="chart-title">Socialwatch</span>
                {loading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading...</span>
                  </div>
                ) : insightsDQScore ? (
                  <LineChart
                    key={`Socialwatch_${insightsDQScore[0]?.project_name}`}
                    insightsDQScoreData={insightsDQScore}
                    scoreType="Socialwatch"
                    filteredBrands={selectedBrand.map(b => b.label)}
                  />
                ) : (
                  <p className="no-data">No data available</p>
                )}
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      label: "Tabular Summary",
      content: (
        <div>
          <div className="filter-option d-flex mb-2 gap-3 justify-content-end">
            {/* <MultiSelectDropdown
              options={categories}
              selectedValues={selectedCategories}
              onChange={handleCategoryChanges}
              placeholder="Select Categories"
            /> */}
            <MultiSelectDropdown
              options={brand}
              selectedValues={selectedBrand}
              onChange={handleBrandChanges}
              placeholder="Select Brands"
            />
          </div>
          <InsightsTabular
            loading={loading}
            data={insightsDQScore}
            columns={columns1}
            filteredBrands={selectedBrand.map(b => b.label)}
          />

          <div className="pagination-container">
            <PaginationComponent />
          </div>

        </div>
      ),
    },
    {
      label: "Brand View",
      content: (
        <div>
          This feature development is in progress.
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="col-12">
        <div className="workspace-container">
          <h2 className="page-title mt-4 ml-3">Insights</h2>

          {!projectId ? (<div className="row mb-4">
            <div className="col-12">
              <div className="insights-filter">
                <span className="subtitle">
                  Select files from saved Projects
                </span>
                <div className="insights-project-filter">

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
                  {selectedFrequency === "Monthly" && (
                    <Form.Select
                      name="Months"
                      className="form-control-select"
                      value={selectedValue}
                      onChange={handleSelectionChange}
                    >
                      <option value="">Select a Month</option>
                      <option value="Jan">Jan</option>
                      <option value="Feb">Feb</option>
                      <option value="Mar">Mar</option>
                      <option value="Apr">Apr</option>
                      <option value="May">May</option>
                      <option value="Jun">Jun</option>
                      <option value="Jul">Jul</option>
                      <option value="Aug">Aug</option>
                      <option value="Sep">Sep</option>
                      <option value="Oct">Oct</option>
                      <option value="Nov">Nov</option>
                      <option value="Dec">Dec</option>
                    </Form.Select>
                  )}

                  {selectedFrequency === "Quarterly" && (
                    <Form.Select
                      name="Quarters"
                      className="form-control-select"
                      value={selectedValue}
                      onChange={handleSelectionChange}
                    >
                      <option value="">Select a Quarter</option>
                      <option value="JFM">JFM</option>
                      <option value="AMJ">AMJ</option>
                      <option value="JAS">JAS</option>
                      <option value="OND">OND</option>
                    </Form.Select>
                  )}
                  <MultiSelectDropdown
                    options={projects}
                    selectedValues={selectedProjects}
                    onChange={handleProjectChanges}
                    disabled={selectedCategories?.lenth}
                    placeholder="Select Workspace"
                  />

                  <div>
                    <ButtonComponent
                      btnClass={"btn-primary"}
                      disabled={selectedProjects?.length == 0 || selectedProjects?.length > 4}
                      onClick={fetchDQScoresBasedOnFilter}
                      btnName={"Submit"}
                    />
                    {selectedProjects?.length > 4 &&
                      <div>
                        Maximum four Projects can be selected
                      </div>
                    }
                  </div>

                </div>

              </div>
            </div>
          </div>) : (
            <div className="insights-filter">
              <div>
                <span><b>Project Id</b></span>: <span>{projectId}</span>
              </div>
              <div>
                <span><b>Project Name</b></span>: <span>{projectName}</span>
              </div>
            </div>
          )
          }
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
        </div>
      </div>
    </>
  );
}
