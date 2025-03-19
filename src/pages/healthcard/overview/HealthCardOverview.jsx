import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import TabComponent from "../../../components/tabs/TabComponent";
import ButtonComponent from "../../../common/button/button";
import { MdBubbleChart } from "react-icons/md";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { MdOutlineMultilineChart } from "react-icons/md";
import { GiMultipleTargets } from "react-icons/gi";
import * as XLSX from "xlsx";
import "./HealthCardOverview.scss";
import PaidMedia from "../../../components/paidMedia/PaidMedia";
import MediaEcom from "../../../components/MediaEcom/MediaEcom";
import MediaOffPlatform from "../../../components/MediaOffPlatform/MediaOffPlatform";
import SocialMedia from "../../../components/SocialMedia/SocialMedia";
import { getHealthCardDetails, getBrandData, getBrandImages, getBrandDetailsData, getProjectDetailsByUserId, getProjectsByDateRangeForUser } from "../../../services/projectService";
import BrandPerformance from "../../../components/BrandPerformance/BrandPerformance";
import { useParams } from "react-router-dom";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown/MultiSelectDropdown";
import { Form } from "react-bootstrap";



export default function HealthCardOverview() {
  const { brand, projectId } = useParams(); 
  const [healthCardData, setHealthCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandDetailData, setBrandDetailData] = useState([]);
  const [brandImages, setBrandImages] = useState([]);
  const [brandCategoryDetails, setBrandCategoryDetails] = useState([]);

  const [filterProject, setFilterProject] = useState([]);
  const [selectedFilterProject, setSelectedFilterProject] = useState("");
  const { userInfo, projectInfo } = useSelector((state) => state.user);

  const [selectedFrequency, setSelectedFrequency] = useState("Monthly");
  const [selectedValue, setSelectedValue] = useState("");

  const [currentProjectId, setCurrentProjectId] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [getProjectIds, setProjectIds] = useState([]);
const [currentProjectDetails, setCurrentProjectDetails] = useState([]);
const [years, setYears] = useState([]);
const [selectedYear, setSelectedYear] = useState("");
  
  console.log("projectId", projectId)
  const handleFrequencyChange = (frequency) => {
    setSelectedFrequency(frequency);
    setSelectedValue(""); 
  };

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

  const fetchProjectDetails = async(reqPayload) => {
    try{
      const projectResponse = await getProjectsByDateRangeForUser(reqPayload);
      const projects = projectResponse?.projects?.map((project) => ({
        value: project.id,          
        label: project.project_name,
        year: project.createdAt,
      }));

      setFilterProject(projects);

    }catch(err){
          console.error("Error fetching projects:", error);
    }
  }
 
   
  
  useEffect(() => {
    if (filterProject?.length > 0) {
      const uniqueYears = [
        ...new Set(filterProject.map((project) => project.year ? new Date(project.year).getFullYear() : null)),
      ];
      console.log("years", uniqueYears)
      // setYears(uniqueYears.sort((a, b) => b - a));
      
    }
  }, [filterProject]);

  useEffect(() => {
    const yearData = Array.from({ length: 2200 - 1980 + 1 }, (_, index) => 1980 + index); 
    console.log(yearData, "yeardata")
    setYears(yearData)
  },[])
   

  const navigate = useNavigate();

  const handleReportClick = () => {
    
    if (brandDetailData && brandImages && brandCategoryDetails) {
      navigate(`/healthcardreport/${brand}/${selectedFilterProject ? selectedFilterProject : projectId}`, {
        state: {
          brandDetailData: brandDetailData,
          brandImages: brandImages,
          brandCategoryDetails: brandCategoryDetails,
          loading: loading,
          error: error,
         
        }
      });
      
    } else {
      alert("Data is not ready yet. Please wait until all data is loaded.");
      console.error("Required data is missing");
    }
     
  };
 
  
  const handleCompetitorBrands = (comp) => {
    navigate(`/healthcardOverview/${comp.brand}/${selectedFilterProject ? selectedFilterProject : projectId}`);
  };

  useEffect(() => {
    const fetchCurrentProjectDetails = async () => {
      setLoading(true);
      setError(null);
       
      try {
        if(userInfo?.user?.id){
          const currentProjectData = await getProjectDetailsByUserId(userInfo?.user?.id);
          const currentProject = currentProjectData?.project?.[0];
           
          const currentProjectName =currentProjectData?.project?.find(
            (project) => project.id === Number(projectId) // Convert projectId to number if necessary
          );
           
          if(currentProjectName) {
            setCurrentProjectDetails(currentProject.project_name)
             console.log("setCurrentProjectDetails", currentProjectDetails)
          }else {
            console.error("No matching project found for ID:", projectId);
            setError("No Data Found")
          }

          if (currentProject) {
            setCurrentProjectId(currentProject.id);  
            fetchBrandScoreDetails(currentProject.id)
          } else {
            setError("No Data Found")
          }
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("No data found"); // Set error message if API call fails
      } finally {
        setLoading(false); // End loading
      }
    }
    fetchCurrentProjectDetails();
  }, [userInfo?.user?.id]);

 
  useEffect(() => {
    fetchHealthCardData();
    fetchBrandImages();
    fetchBrandDetails();
     
  }, [brand]);
  useEffect(() => {
    fetchBrandScoreDetails();
  }, [brand, selectedFilterProject]);

  const fetchHealthCardData = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      const data = {
        brand: [brand],
        analysis_type: "Overall",
        start_date: "2024-01-01",
        end_date: "2024-12-31",
      };
      const healthCard = await getHealthCardDetails(data);
      console.log('healthCard page:', healthCard.results)
      if (healthCard) {
        setHealthCardData(healthCard);
      } else {
        setError("No data found");
      }
    } catch (error) {
      console.error("Error fetching health card data:", error);
      setError("No data found"); // Set error message if API call fails
    } finally {
      setLoading(false); // End loading
    }
  };
 
   
 
  const fetchBrandScoreDetails = async () => {
    setLoading(true);
    setError(null)
    const requestPayload = {
      "brand_name": brand,
      "project_ids": [selectedFilterProject || projectId],
    }
    try {
      const brandScoreDetails = await getBrandData(requestPayload);
      if (brandScoreDetails) {
        setBrandDetailData(brandScoreDetails)
      } else {
        setError("No Data Found")
      }
    } catch (error) {
      console.error("Error fetching Brand Score data:", error);
      setError("No data found"); // Set error message if API call fails
    } finally {
      setLoading(false); // End loading
    }
  }
  
  const fetchBrandImages = async () => {
    setLoading(true);
    setError(null);
    setBrandImages([]);
    try {
      const brandImageDetails = await getBrandImages(brand);

      if (brandImageDetails) {
        setBrandImages(brandImageDetails);
      } else {
        setError("No Data Found");
      }
    } catch (error) {
      setError("Error fetching brand images.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrandDetails = async () => {
    setLoading(true);
    setError(null);
    setBrandCategoryDetails([]);
 
    try {
      const brandCatDetails = await getBrandDetailsData(brand, selectedFilterProject ? selectedFilterProject : projectId);

      if (brandCatDetails) {
        setBrandCategoryDetails(brandCatDetails);
      } else {
        setError("No Data Found");
      }
    } catch (error) {
      setError("Error fetching brand data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedProjects = (selectedPrjId) => {
    fetchBrandScoreDetails(selectedPrjId)
    setSelectedFilterProject(selectedPrjId);
  };

  const tabColors = ['#C1DED3', '#A6CCE0', '#DFE9DE', '#FCFAFB', '#E2E3EF']
  const tabs = [
    {
      label: "Marketplace",
      content: (
        <MediaEcom
          healthCardData={healthCardData && healthCardData?.results["Ecom"]}
        />
      ),
    },
    {
      label: "Digital Spends",
      content: (
        <MediaOffPlatform
          healthCardData={healthCardData && healthCardData?.results["Paid"]}
        />
      ),
    },
    {
      label: "Socialwatch",
      content: (
        <SocialMedia
          healthCardData={healthCardData && healthCardData?.results["Social"]}
        />
      ),
    },
    {
      label: "Organic Performance",
      content: (
        <BrandPerformance
          healthCardData={
            healthCardData && healthCardData?.results["Brand Perf"]
          }
        />
      ),
    },
  ];
  // Healthcard scores need to add 75th/50th percentile and also add color code for main scores if its above 75th percentile - Greenbetween 75th and 50th - Yellow below 50th - red

  function getColorScore(value, seventyFivePercentileValue, fiftyPercentileValue) {
    // Convert values to numbers
    const actualValue = parseFloat(value);
    const seventyFifthPercentileValueParsed = parseFloat(seventyFivePercentileValue);
    const fiftiethPercentileValueParsed = parseFloat(fiftyPercentileValue);
     
    // Compare values and return corresponding color
    if (actualValue > seventyFifthPercentileValueParsed) {
      return <span style={{ color: "#279E6F" }}>{value}</span>;
    } else if (actualValue > fiftiethPercentileValueParsed && actualValue < seventyFifthPercentileValueParsed) {
      return <span style={{ color: "#FF9800" }}>{value}</span>;
    } else if (actualValue < fiftiethPercentileValueParsed) {
      return <span style={{ color: "#C82519" }}>{value}</span>;
    }
  }
  


  const handleExport = () => {
    const ecomData = healthCardData && healthCardData?.results["Ecom"];
    const paidData = healthCardData && healthCardData?.results["Paid"];
    const socialData = healthCardData && healthCardData?.results["Social"];
    const brandPerfData =
      healthCardData && healthCardData?.results["Brand Perf"];

    if (ecomData || paidData || socialData || brandPerfData) {
      generateExcel(ecomData, paidData, socialData, brandPerfData);
    }
  };

  const generateExcel = (ecomData, paidData, socialData, brandPerfData) => {
    const workbook = XLSX.utils.book_new(); // Create a new workbook

    // Iterate over each key (representing a table)
    for (const tableName in ecomData) {
      if (ecomData.hasOwnProperty(tableName)) {
        const tableData = ecomData[tableName];

        // Convert the data into an array format suitable for Excel (Metric Name, Normalized Value)
        const sheetData = [["Metric Name", "Normalized Value"]]; // Header row

        for (const metric in tableData) {
          if (tableData.hasOwnProperty(metric)) {
            sheetData.push([metric, tableData[metric]]);
          }
        }

        // Create a new worksheet for each table
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, tableName); // Append sheet to workbook
      }
    }
    for (const tableName in paidData) {
      if (paidData.hasOwnProperty(tableName)) {
        const tableData = paidData[tableName];

        // Convert the data into an array format suitable for Excel (Metric Name, Normalized Value)
        const sheetData = [["Metric Name", "Normalized Value"]]; // Header row

        for (const metric in tableData) {
          if (tableData.hasOwnProperty(metric)) {
            sheetData.push([metric, tableData[metric]]);
          }
        }

        // Create a new worksheet for each table
        const worksheet1 = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet1, tableName); // Append sheet to workbook
      }
    }
    for (const tableName in socialData) {
      if (socialData.hasOwnProperty(tableName)) {
        const tableData = socialData[tableName];

        // Convert the data into an array format suitable for Excel (Metric Name, Normalized Value)
        const sheetData = [["Metric Name", "Normalized Value"]]; // Header row

        for (const metric in tableData) {
          if (tableData.hasOwnProperty(metric)) {
            sheetData.push([metric, tableData[metric]]);
          }
        }

        // Create a new worksheet for each table
        const worksheet2 = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet2, tableName); // Append sheet to workbook
      }
    }
    for (const tableName in brandPerfData) {
      if (brandPerfData.hasOwnProperty(tableName)) {
        const tableData = brandPerfData[tableName];

        // Convert the data into an array format suitable for Excel (Metric Name, Normalized Value)
        const sheetData = [["Metric Name", "Normalized Value"]]; // Header row

        for (const metric in tableData) {
          if (tableData.hasOwnProperty(metric)) {
            sheetData.push([metric, tableData[metric]]);
          }
        }

        // Create a new worksheet for each table
        const worksheet3 = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet3, tableName); // Append sheet to workbook
      }
    }

    // Write the Excel file to disk
    XLSX.writeFile(workbook, "CampaignData.xlsx");
  };
  // const generateExcel = (ecomData, paidData, socialData, brandPerfData) => {
  //   const workbook = XLSX.utils.book_new(); // Create a new workbook

  //   // Helper function to convert a dataset into a sheet
  //   const createSheetData = (data, sheetName) => {
  //     const sheetData = [["Metric Name", "Normalized Value"]]; // Define header row

  //     // Iterate over the data to fill the sheet
  //     for (const metric in data) {
  //       if (data.hasOwnProperty(metric)) {
  //         sheetData.push([metric, data[metric]]);
  //       }
  //     }

  //     // Create worksheet and append to the workbook
  //     const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  //     XLSX.utils.book_append_sheet(workbook, worksheet, sheetName); // Append sheet to workbook
  //   };

  //   // Create a sheet for ecomData
  //   createSheetData(ecomData, "Ecom Data");

  //   // Create a sheet for paidData
  //   createSheetData(paidData, "Paid Data");

  //   // Create a sheet for socialData
  //   createSheetData(socialData, "Social Data");

  //   // Create a sheet for brandPerfData
  //   createSheetData(brandPerfData, "Brand Performance");

  //   // Write the Excel file to disk
  //   XLSX.writeFile(workbook, "CampaignData.xlsx");
  // };

  const formatToAOA = (data) => {
    return Array.isArray(data) ? data : Object.entries(data);
  };

  

  return (
    <>
      <div className="col-12">
        <div className="workspace-container">
          <div className="title-section">
            <h2 className="page-title mt-4 ml-3">Health Card</h2>
            <div className="filter-section">
              <ButtonComponent
                disabled={!brandDetailData || !brandImages || !brandCategoryDetails}
                btnClass={"btn-primary"}
                btnName={"DC Brand Report"}
                onClick={handleReportClick}
              />
              <ButtonComponent
                // disabled
                btnClass={"btn-primary"}
                btnName={"Export as Excel"}
                onClick={handleExport}
              />
              <Form.Select
                name="Select Year"
                className="filter-input"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select a Year</option>

                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
                {/* {filterProject.map((project, index) => (
                  <option key={index} value={project.value}>
                    {project.year}
                  </option>
                ))} */}
              </Form.Select>

              <ButtonGroup aria-label="Select Frequency">
                <Button
                  className="group-btn"
                  variant={selectedFrequency === "Monthly" ? "primary" : "outline-secondary"}
                  onClick={() => handleFrequencyChange("Monthly")}
                >
                  Monthly
                </Button>
                <Button
                  className="group-btn"
                  variant={selectedFrequency === "Quarterly" ? "primary" : "outline-secondary"}
                  onClick={() => handleFrequencyChange("Quarterly")}
                >
                  Quarterly
                </Button>
              </ButtonGroup>

              {selectedFrequency === "Monthly" && (
                <Form.Select
                  name="Months"
                  className="filter-input"
                  value={selectedValue}
                  onChange={handleSelectionChange} // Trigger API call on selection
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
                  className="filter-input mt-3"
                  value={selectedValue}
                  onChange={handleSelectionChange} // Trigger API call on selection
                >
                  <option value="">Select a Quarter</option>
                  <option value="JFM">JFM</option>
                  <option value="AMJ">AMJ</option>
                  <option value="JAS">JAS</option>
                  <option value="OND">OND</option>
                </Form.Select>
              )}

              <Form.Select
                name="Project Name"
                className="filter-input"
                value={selectedFilterProject}
                onChange={(e) => handleSelectedProjects(e.target.value)}
              >
                <option value="">Select a Project</option>

                {filterProject.map((project, index) => (
                  <option key={index} value={project.value}>
                    {project.label}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          <div className="brand-overview">
            <div className="brand-header">
              <span className="section-title">Brand Overview
                <span className="brand-subtitle">Project Name: {currentProjectDetails}</span>
              </span>
              <div className="competitor">
                <span className="competitor-title">Competitor List:</span>
                <ul className="comptetitor-item">
                  {brandCategoryDetails?.competitors?.map((comp, index) => (
                    <li key={index}>
                      <span class="brand-list" onClick={() => handleCompetitorBrands(comp)}>{comp.brand}</span>
                      {/* <p>Category: {comp.category}</p>
                    <p>Sub-Category: {comp.sub_category}</p> */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="brand-dqscores">
              <div className="score-list">
                <img
                  src={brandImages}
                  className="metric-icon"
                  alt="Brand Logo"
                />
                <div className="score-details">
                  <div className="brand-title">{brandCategoryDetails?.main_brand?.brand}</div>
                  <span className="brand-subtitle">Category: {brandCategoryDetails?.main_brand?.category}</span>
                  <span className="brand-subcategory">Sub Category: <span className="brand-subcategory-list">{brandCategoryDetails?.main_brand?.sub_category}</span></span>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdBubbleChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                    {loading ? (
                      <div className="loader-container-sm  h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) :(
                       
                      (brandDetailData?.data || []).map(item =>
                        getColorScore(
                          (parseFloat(item.Overall_Final_Score) || 0).toFixed(2), 
                          (parseFloat(brandDetailData?.statistics?.overall_score_stats?.["75th_percentile"])).toFixed(2), 
                          (parseFloat(brandDetailData?.statistics?.overall_score_stats?.["50th_percentile"])).toFixed(2)
                        )
                      )
                    )}
                  </div>
                  <span className="brand-subtitle">DC Score</span>
                  <div className="percent-container">
                  {Object.entries(brandDetailData?.statistics?.overall_score_stats || {}).map(([key, value]) => (
                    <div className="percentile-score" key={key}>
                      <span className="percentile-subtitle">
                        {key === "75th_percentile" ? "75th Percentile" : "50th Percentile"}
                      </span>
                      {Number(value).toFixed(2)}
                    </div>
                  ))}
                  </div>
                  {/* <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">12</div>
                  </OverlayTrigger>
                  <div className="score-diff">
                    12
                  </div> */}
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdOutlineStackedLineChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  {loading ? (
                      <div className="loader-container-sm h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) : (
                      (brandDetailData?.data || []).map(item =>
                        getColorScore(
                          item.Marketplace != null && !isNaN(parseFloat(item.Marketplace))
                            ? parseFloat(item.Marketplace).toFixed(2)
                            : 0,
                            brandDetailData?.statistics?.section_stats?.Marketplace?.["75th_percentile"], 
                            brandDetailData?.statistics?.section_stats?.Marketplace?.["50th_percentile"]
                        )
                      )
                    )
                    
                    }
                  </div>
                  <span className="brand-subtitle">Marketplace</span>
                  <div className="percent-container">
                    {Object.entries(brandDetailData?.statistics?.section_stats?.Marketplace || {}).map(([key, value]) => (
                       <div className="percentile-score" key={key}>
                        <span className="percentile-subtitle">
                          {key === "75th_percentile" ? "75th Percentile" : "50th Percentile"}
                        </span>
                        {Number(value).toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdOutlineShowChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  {loading ? (
                      <div className="loader-container-sm h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) :(
                      (brandDetailData?.data || []).map(item =>
                      getColorScore(
                        item.Socialwatch != null && !isNaN(parseFloat(item.Socialwatch))
                          ? parseFloat(item.Socialwatch).toFixed(2)
                          : 0,
                          brandDetailData?.statistics?.section_stats?.Socialwatch?.["75th_percentile"], 
                          brandDetailData?.statistics?.section_stats?.Socialwatch?.["50th_percentile"]
                      )
                    )
                    )}
                  </div>
                  <span className="brand-subtitle">Socialwatch</span>
                  <div className="percent-container">
                    {Object.entries(brandDetailData?.statistics?.section_stats?.Socialwatch || {}).map(([key, value]) => (
                      <div className="percentile-score" key={key}>
                        <span className="percentile-subtitle">
                          {key === "75th_percentile" ? "75th Percentile" : "50th Percentile"}
                        </span>
                        {Number(value).toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdOutlineMultilineChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  {loading ? (
                      <div className="loader-container-sm h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) :(
                      (brandDetailData?.data || []).map(item =>
                      getColorScore(
                        item['Digital Spends'] != null && !isNaN(parseFloat(item['Digital Spends']))
                          ? parseFloat(item['Digital Spends']).toFixed(2)
                          : 0,
                          brandDetailData?.statistics?.section_stats?.["Digital Spends"]?.["75th_percentile"], 
                          brandDetailData?.statistics?.section_stats?.["Digital Spends"]?.["50th_percentile"]
                      )
                    )
                    )}
                  </div>
                  <span className="brand-subtitle">Digital Spends</span>
                  <div className="percent-container">
                    {Object.entries(brandDetailData?.statistics?.section_stats?.["Digital Spends"] || {}).map(([key, value]) => (
                      <div className="percentile-score" key={key}>
                        <span className="percentile-subtitle">
                          {key === "75th_percentile" ? "75th Percentile" : "50th Percentile"}
                        </span>
                        {Number(value).toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <GiMultipleTargets />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                    {loading ? (
                      <div className="loader-container-sm h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) : ((brandDetailData?.data || []).map(item =>
                        getColorScore(
                          item['Organic Performance'] != null && !isNaN(parseFloat(item['Organic Performance']))
                            ? parseFloat(item['Organic Performance']).toFixed(2)
                            : 0,
                            brandDetailData?.statistics?.section_stats?.["Organic Performance"]?.["75th_percentile"], 
                            brandDetailData?.statistics?.section_stats?.["Organic Performance"]?.["50th_percentile"]
                        )
                      ))
                    }                     
                  </div>
                  <span className="brand-subtitle">Organic Performance</span>
                  <div className="percent-container">
                    {Object.entries(brandDetailData?.statistics?.section_stats?.["Organic Performance"] || {}).map(([key, value]) => (
                      <div className="percentile-score" key={key}>
                        <span className="percentile-subtitle">
                          {key === "75th_percentile" ? "75th Percentile" : "50th Percentile"}
                        </span>
                        {Number(value).toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-container">
            {/* {loading ? (
              <div className="loader-container">
                <div className="loader-sm">
                </div>
                <span className="loader-text">Loading...</span>
              </div>
            ) : error ? (
              <div className="loader-container">
                <div className="loader-sm">
                </div>
                <span className="loader-text">Loading...</span>
              </div>
            ) : ( */}
              <TabComponent
                isBenchmarkDataSaved={true}
                tabs={tabs}
                tabColors={tabColors}
                className="custom-tabs healthcard-tab"
              />
             {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
}
