import React, { useState, useEffect } from "react";
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
  const [tableData,setTableData] = useState([])

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
    console.log(selectedOptions?.target?.value, 'cxxxxxx')
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
    console.log(freq, "frerere")
    setSelectedFrequency(freq)
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
        project_ids: selectedProjects.map((prj) => prj.value),
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

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    console.log(value, selectedFrequency)
    const payload = {
      user_id: userInfo?.user?.id,
      filter: {
        type: selectedFrequency,
        value: value
      }
    }
    fetchProjectDetails(payload)
    console.log(payload)

    setSelectedValue(value);
  };

  const fetchProjectDetails = async (reqPayload) => {
    try {
      const projectResponse = await getProjectsByDateRangeForUser(reqPayload);
      const projects = projectResponse?.projects?.map((project) => ({
        value: project.id,
        label: project.project_name,
      }));

      setProjects(projects);

    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }


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

 
  useEffect(() => {
    if (insightsDQScore && insightsDQScore.length > 0) {
      const dataByProject = insightsDQScore.reduce((acc, project) => {
        const transformedData = project.brands.map((brand) => ({
          Quarter: "Q4 2024",
          Category: project.project_name,
          brand_name: brand.brand_name,
          Marketplace: brand.dq_score.Marketplace,
          "Digital Spends": brand.dq_score["Digital Spends"],
          "Organic Performance": brand.dq_score["Organic Performance"],
          Socialwatch: brand.dq_score.Socialwatch,
          Overall_Final_Score: brand.dq_score.Overall_Final_Score,
        }));

        acc[project.project_id] = {
          projectName: project.project_name,
          data: transformedData,
        };
        return acc;
      }, {});

      setTableData(dataByProject);
    } else {
      setTableData({});
    }
  }, [insightsDQScore]);

  const columns1 = [
    {
      header: "Quarter",
      accessor: "Quarter",
    },
    { header: "Category", accessor: "Category" },
    { header: "Brands", accessor: "brand_name" },
    { header: "Marketplace", accessor: "Marketplace" },
    {
      header: "Digital Spends",
      accessor: "Digital Spends",
    },
    { header: "Organic Performance", accessor: "Organic Performance" },
    { header: "Socialwatch", accessor: "Socialwatch" },
    { header: "DQ Score", accessor: "Overall_Final_Score" },
  ];
  
  const keys = Array.from(new Set(normalizedData.flatMap(Object.keys)));
  const keysToDisplay = keys?.slice(2);

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
                  <LineChart
                    key={`Overall_Final_Score_${insightsDQScore[0]?.project_name}`}
                    insightsDQScoreData={insightsDQScore}
                    scoreType="Overall_Final_Score"
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
          {/* <TableComponent data={data} columns={columns} /> */}
          {Object.values(tableData).map((projectData, index) => (
        <InsightsTabular
          key={index}
          data={projectData.data}
          columns={columns1}
          projectName={projectData.projectName}
        />
      ))}

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
      label: "Brand View",
      content: (
        <div>
          {/* <GraphicalView /> */}
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
        </div>
      </div>
    </>
  );
}
