import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../components/tableComponent/TableComponent";
import Form from "react-bootstrap/Form";
import { Dropdown } from "react-bootstrap";
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
import { getProjectListsByFilter, getDQScoreMultipleProjects, getProjectsByDateRangeForUser, getProjectDetailsByUserId, getMultipleBrandReport, getNormWeightValueInsight, getNormBrandValueInsight } from "../../services/projectService";
import InsightsTabular from "./InisghtsTabular";
import BrandView from "./BrandView";
import * as XLSX from "xlsx";

export default function Insights() {
  const data = getData();
  const { projectId, projectName } = useParams();

  const normalizedData = getNormalizedData();
  const [categories, setCategories] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [projects, setProjects] = useState([]);
  const { userInfo, projectInfo } = useSelector((state) => state.user);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");



  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [insightsDQScore, setInsightsDQScore] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState("Monthly");
  const [selectedValue, setSelectedValue] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedProjectsList, setSelectedProjectsList] = useState([]);
  const [selectedProjectsData, setSelectedProjectsData] = useState([]);
  const [selectedProjectsWeightsData, setSelectedProjectsWeightsData] = useState([]);
  const [selectedProjectsBrandsData, setSelectedProjectsBrandsData] = useState([]);



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


    const yearData = Array.from({ length: 2200 - 1980 + 1 }, (_, index) => 1980 + index); 
    console.log(yearData, "yeardata")
    setYears(yearData)

  }, []);

  useEffect(() => {
    fetchDQScoresBasedOnFilter();
  }, [projectId])
  

  useEffect(() => {
    const fetchCurrentProjectDetails = async () => {
      setLoading(true);
      setError(null);
  
      try {
        if (userInfo?.user?.id) {
          // Fetch project details by user ID
          const currentProjectData = await getProjectDetailsByUserId(userInfo.user.id);
  
          if (selectedProjects?.length > 0) {
            const requestedPayload = {
              project_ids: selectedProjects.map((prj) => prj.value),
            };
  
            // Find all matching projects
            const currentProjectNames = currentProjectData?.project?.filter((project) =>
              requestedPayload.project_ids.includes(project.id)
            );
            console.log("currentProjectNames:", currentProjectNames);
            if(currentProjectNames.length > 0) {
              setSelectedProjectsList(currentProjectNames)
            }else {
              setError("No Data Found")
            }
            
          } else if(projectId) {
            const requestedPayload = {
              project_ids: projectId,
            };
  
            // Find all matching projects
            const currentProjectNames = currentProjectData?.project?.filter((project) =>
              requestedPayload.project_ids.includes(project.id)
            );
            console.log("currentProjectNames:", currentProjectNames);
            if(currentProjectNames.length > 0) {
              setSelectedProjectsList(currentProjectNames)
            }else {
              setError("No Data Found")
            }
          } else {
            setError("No projects selected.");
          }
        } else {
          setError("User ID not found.");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("Error fetching project data.");
      } finally {
        setLoading(false); // End loading in both success and error cases
      }
    };
  
    fetchCurrentProjectDetails();
  }, [userInfo?.user?.id, selectedProjects, projectId]); // Add selectedProjects as a dependency

     

  useEffect(() => {
    const fetchBrandsDataDetails = async () => {
      try {
        // Ensure there are selected projects
        if (selectedProjects && selectedProjects.length > 0) {

          const requestedPayload = {
            project_ids: selectedProjects.map((prj) => prj.value),
          };
  
          console.log("fetchBrandsDataDetails", requestedPayload);
          // payload format{"project_ids":["273","266"]}
          const selectedProjectsDataReport = await getMultipleBrandReport(requestedPayload);
  
          if (selectedProjectsDataReport) {
            setSelectedProjectsData(selectedProjectsDataReport?.data);
            console.log("selectedProjectsDataReport:", selectedProjectsData);
          } else {
            console.error("No matching data found for selected projects:", requestedPayload.project_ids);
            setError("No data found for selected projects");
          }
        } else if(projectId){
          const requestedPayload = {
            project_ids: [projectId],
          };
  
          console.log("fetchBrandsDataDetails", requestedPayload);
          // payload format{"project_ids":["273","266"]}
          const selectedProjectsDataReport = await getMultipleBrandReport(requestedPayload);
  
          if (selectedProjectsDataReport) {
            setSelectedProjectsData(selectedProjectsDataReport?.data);
            console.log("selectedProjectsDataReport:", selectedProjectsData);
          } else {
            console.error("No matching data found for selected projects:", requestedPayload.project_ids);
            setError("No data found for selected projects");
          }
        } else {
          console.error("No projects selected");
          setError("No projects selected");
        }
      } catch (error) {
        console.error("Error fetching brand data details:", error);
        setError("Failed to fetch data. Please try again.");
      }
    };
  
    fetchBrandsDataDetails();
  }, [selectedProjects, projectId]);

  useEffect(() => {
    const fetchWeightsDataDetails = async () => {
      try {
        // Ensure there are selected projects
        if (selectedProjects && selectedProjects.length > 0) {

          const requestedPayload = {
            project_ids: selectedProjects.map((prj) => prj.value),
          };
  
          console.log("fetchWeightsDataDetails", requestedPayload);
          // payload format{"project_ids":["273","266"]}
          const selectedProjectsweightsReport = await getNormWeightValueInsight(requestedPayload);
  
          if (selectedProjectsweightsReport) {
            setSelectedProjectsWeightsData(selectedProjectsweightsReport);
             
          } else {
            console.error("No matching data found for selected projects:", requestedPayload.project_ids);
            setError("No data found for selected projects");
          }
        } else if(projectId){
          const requestedPayload = {
            project_ids: [projectId],
          };
  
          console.log("fetchWeightsDataDetails", requestedPayload);
          // payload format{"project_ids":["273","266"]}
          const selectedProjectsweightsReport = await getNormWeightValueInsight(requestedPayload);
  
          if (selectedProjectsweightsReport) {
            setSelectedProjectsWeightsData(selectedProjectsweightsReport);
             console.log()
          } else {
            console.error("No matching data found for selected projects:", requestedPayload.project_ids);
            setError("No data found for selected projects");
          }
        } else {
          console.error("No projects selected");
          setError("No projects selected");
        }
      } catch (error) {
        console.error("Error fetching brand data details:", error);
        setError("Failed to fetch data. Please try again.");
      }
    };
  
    fetchWeightsDataDetails();
  }, [selectedProjects, projectId]);

  useEffect(() => {
    const fetchBrandsReportDetails = async () => {
      try {
        // Ensure there are selected projects
        if (selectedProjects && selectedProjects.length > 0) {

          const requestedPayload = {
            project_ids: selectedProjects.map((prj) => prj.value),
          };
  
          console.log("fetchBrandsReportDetails", requestedPayload);
          // payload format{"project_ids":["273","266"]}
          const selectedProjectsBrandsReport = await getNormBrandValueInsight(requestedPayload);
  
          if (selectedProjectsBrandsReport) {
            setSelectedProjectsBrandsData(selectedProjectsBrandsReport?.data);
            console.log("selectedProjectsBrandsReport:", selectedProjectsBrandsData);
          } else {
            console.error("No matching data found for selected projects:", requestedPayload.project_ids);
            setError("No data found for selected projects");
          }
        } else if(projectId) {
          const requestedPayload = { project_ids: [projectId] };
 
          const selectedProjectsBrandsReport = await getNormBrandValueInsight(requestedPayload);
          console.log("selectedProjectsBrandsReport:::", selectedProjectsBrandsReport)
          if (selectedProjectsBrandsReport) {
            setSelectedProjectsBrandsData(selectedProjectsBrandsReport?.data);
            console.log("selectedProjectsBrandsReport:", selectedProjectsBrandsData);
          } else {
            console.error("No matching data found for selected projects:", requestedPayload.project_ids);
            setError("No data found for selected projects");
          }
        } else {
          console.error("No projects selected");
          setError("No projects selected");
        }
      } catch (error) {
        console.error("Error fetching brand data details:", error);
        setError("Failed to fetch data. Please try again.");
      }
    };
  
    fetchBrandsReportDetails();
  }, [selectedProjects, projectId]);
  
  
  
  

  const fetchProjectsByFilter = async (frequency, categories) => {

    try {
      const projectData = await getProjectListsByFilter(frequency, categories);
      console.log("projectData:", projectData);
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
    try {

      if (selectedProjects?.length > 0) {
        setLoading(true);
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
          setMessage("No Data Found for this Project.")
        }
      } else if (projectId) {
        setLoading(true);

        const requestedPayload = {
          project_ids: [projectId],
        };
        console.log("projectIdrequestedPayload", requestedPayload)

        const insightsDQScoreData = await getDQScoreMultipleProjects(requestedPayload);
        if (insightsDQScoreData?.data?.length > 0) {
          setLoading(false);
          setInsightsDQScore(insightsDQScoreData?.data);
        } else {
          setLoading(false);
          setInsightsDQScore(null);
          setMessage("No Data Found for this Project.")

        }
      }
    } catch (error) {
      setLoading(false);
      setInsightsDQScore(null);
    }
  };

  console.log('insightsDQScore', insightsDQScore)

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    const payload = {
      user_id: userInfo?.user?.id,
      year:selectedYear,
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
      console.log("projectResponse:", projectResponse);
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
      header: "Digital quotient for brand (DC)",
      accessor: "Digital quotient for brand (DQ)",
    },
    { header: "Ecom DC Score", accessor: "Ecom DC Score" },
    { header: "Social DC Score", accessor: "Social DC Score" },
    { header: "Paid Marketing DC Score", accessor: "Paid Marketing DC Score" },
    { header: "Organic DC", accessor: "Organic DQ" },
  ];

  const columns1 = [
    { header: "Marketplace", accessor: "Marketplace" },
    {
      header: "Digital Spends",
      accessor: "Digital Spends",
    },
    { header: "Organic Performance", accessor: "Organic Performance" },
    { header: "Socialwatch", accessor: "Socialwatch" },
    { header: "DC Score", accessor: "Overall_Final_Score" },
  ];


  const handleDownloadExport = () => {
    const insightScore = insightsDQScore;
    const insightScoreDataXL = restructureDataForExport(insightScore);
    if (insightScoreDataXL && insightScoreDataXL.length > 0) {
      generateExcel(insightScoreDataXL);
    }
  };
  
  const restructureDataForExport = (data) => {
    if (!data || data.length === 0) return [];
  
    // Extract unique brand names
    const brands = Array.from(new Set(data.map(item => item.brands)));
    console.log('brands', brands);
    // Define the headers for the Excel sheet
    const headers = ['brand_name', 'Marketplace', 'Digital Spends', 'Organic Performance', 'Socialwatch', 'DC Score'];
  
    // Structure data with "Brands" as the first column
    const structuredData = brands.map(brand => {
      const brandData = data.find(item => item.Brands === brand);
      return [
        brandData?.brand_name ?? 'N/A',
        brandData?.dq_score?.Marketplace ?? 'N/A',
        brandData?.dq_score?.['Digital Spends'] ?? 'N/A',
        brandData?.dq_score?.['Organic Performance'] ?? 'N/A',
        brandData?.dq_score?.Socialwatch ?? 'N/A',
        brandData?.dq_score?.Overall_Final_Score ?? 'N/A'
      ];
    });
  
    // Combine headers and structured data
    return [headers, ...structuredData];
  };
  
  const generateExcel = (exportData) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(exportData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Insight DC Score');
    XLSX.writeFile(workbook, 'Insights.xlsx');
  };

  const tabs = [
    {
      label: "Score Comparison",
      content: (
        <>
          <div className="row">
            <div className="col-12">
              <div className="project-filter">
                <div className="range-filter">
                  <span>DC score Range:</span>
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
                <span className="chart-title">DC Score</span>
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
                  message ? (<p className="no-data">{message}</p>): (<p className="no-data">No data available</p>)
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
                  message ? (<p className="no-data">{message}</p>): (<p className="no-data">No data available</p>)
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
                  message ? (<p className="no-data">{message}</p>): (<p className="no-data">No data available</p>)
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
                  message ? (<p className="no-data">{message}</p>): (<p className="no-data">No data available</p>)
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
                  message ? (<p className="no-data">{message}</p>): (<p className="no-data">No data available</p>)
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
              options={brand}
              selectedValues={selectedBrand}
              onChange={handleBrandChanges}
              placeholder="Select Brands"
            />
          </div>
          <InsightsTabular
            loading={loading}
            message={message}
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
        <>
          <BrandView 
            selectedProjectsList={selectedProjectsList} 
            selectedProjectsData={selectedProjectsData} 
            selectedProjectsWeightsData={selectedProjectsWeightsData} 
            selectedProjectsBrandsData={selectedProjectsBrandsData}
            
            />
        </>
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
                  
                  <Dropdown>
                    <Dropdown.Toggle variant="primary">
                      {selectedYear || "Select a Year"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {years.map((year) => (
                        <Dropdown.Item key={year} onClick={() => setSelectedYear(year)}>
                          {year}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                {/* <select
                name="Select Year"
                className="form-control"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                size={10}
                >
                <option value="">Select a Year</option>

                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
                
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
                    disabled={selectedCategories?.length}
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
                  
                  btnClass={"btn-primary export-excel-btn"}
                  btnName={"Download"}
                  onClick={handleDownloadExport}
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
