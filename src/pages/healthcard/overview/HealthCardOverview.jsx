import React, { useEffect, useState } from "react";
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
import { getHealthCardDetails, getBrandData, getBrandImages, getBrandDetailsData } from "../../../services/projectService";
import BrandPerformance from "../../../components/BrandPerformance/BrandPerformance";
import { useParams } from "react-router-dom";

export default function HealthCardOverview() {
  const { brand } = useParams();
  const [healthCardData, setHealthCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandDetailData, setBrandDetailData] = useState([]);
  const [brandImages, setBrandImages] = useState([]);
  const [brandCategoryDetails, setBrandCategoryDetails] = useState([]);


  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate('/healthcardreport');
  };

  useEffect(() => {
    fetchHealthCardData();
    fetchBrandScoreDetails();
    fetchBrandImages();
    fetchBrandDetails();
  }, [brand]);

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
      "project_ids":["59"]
    }  
    try{
      const brandScoreDetails = await getBrandData(requestPayload);
      if(brandScoreDetails) {
        setBrandDetailData(brandScoreDetails?.data)
        console.log("brandScoreDetails", brandScoreDetails);
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

    try {
      const brandImageDetails = await getBrandImages(brand);
  
      if (brandImageDetails) {
        setBrandImages(brandImageDetails);
        console.log("brandImageDetails", brandImageDetails);
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

    try {
      const brandCatDetails = await getBrandDetailsData(brand);
  
      if (brandCatDetails) {
        setBrandCategoryDetails(brandCatDetails);
        console.log("brandCatDetails", brandCatDetails);
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

  const tabColors = ['#C1DED3', '#A6CCE0', '#DFE9DE', '#FCFAFB', '#E2E3EF']
  const tabs = [
    {
      label: "Media - Ecom",
      content: (
        <MediaEcom
          healthCardData={healthCardData && healthCardData?.results["Ecom"]}
        />
      ),
    },
    {
      label: "Media - Off Platform",
      content: (
        <MediaOffPlatform
          healthCardData={healthCardData && healthCardData?.results["Paid"]}
        />
      ),
    },
    {
      label: "Social Media",
      content: (
        <SocialMedia
          healthCardData={healthCardData && healthCardData?.results["Social"]}
        />
      ),
    },
    {
      label: "Brand Performance",
      content: (
        <BrandPerformance
          healthCardData={
            healthCardData && healthCardData?.results["Brand Perf"]
          }
        />
      ),
    },
  ];
  function getColorScore(value, thresholds) {
    if (typeof value === "string") {
      return <span style={{ color: "#252627" }}>{value}</span>;
    } else if (value > thresholds) {
      return <span style={{ color: "#339900" }}>{value}</span>;
    } else if (value < thresholds) {
      return <span style={{ color: "#cc3201" }}>{value}</span>;
    } else {
      return <span style={{ color: "#252627" }}>{value}</span>;
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

  // Helper function to format data into array of arrays (AOA) format
  const formatToAOA = (data) => {
    // If data is already in the correct format, return it as is.
    // Otherwise, you may need to transform the object into an array of arrays.
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
                // disabled
                btnClass={"btn-primary"}
                btnName={"DQ mini Report"}
                onClick={handleReportClick}
              />
              <ButtonComponent
                // disabled
                btnClass={"btn-primary"}
                btnName={"Export as Excel"}
                onClick={handleExport}
              />
              <ButtonGroup aria-label="Select Frequency">
                <Button className="group-btn" variant="outline-secondary">
                  Monthly
                </Button>
                <Button className="group-btn" variant="primary">
                  Quarterly
                </Button>
              </ButtonGroup>
              <select name="filter" className="filter-input">
                <option value="Filter">Filter</option>
                <option value="Alphabet">Alphabet</option>
                <option value="Number">Number</option>
                <option value="Percentage">Percentage</option>
              </select>
              <select name="fileName" className="filter-input">
                <option value="Select File">Select File</option>
                <option value="Alphabet">DA-2</option>
                <option value="Number">DA-3</option>
                <option value="Percentage">DA-4</option>
              </select>
            </div>
          </div>
          <div className="brand-overview">
            <div className="brand-header">
            <span className="section-title">Brand Overview</span>
            <div className="competitor">
              <span className="competitor-title">Competitor List:</span>
              <ul className="comptetitor-item">
                {brandCategoryDetails?.competitors?.map((comp, index) => (
                  <li key={index}>
                    <span class="brand-list">{comp.brand}</span>
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
                  <span className="brand-subtitle">{brandCategoryDetails?.main_brand?.category}</span>
                  <span className="brand-subcategory">{brandCategoryDetails?.main_brand?.sub_category}</span>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdBubbleChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  {brandDetailData.map(item => getColorScore((item.Overall_Final_Score).toFixed(2), 70.3))}
                  </div>
                  <span className="brand-subtitle">DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">70.3</div>
                  </OverlayTrigger>
                  <div className="score-diff danger-color">
                    <IoIosTrendingDown /> - 2.3
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdOutlineStackedLineChart />
                </div>
                <div className="score-details">
                  <div className="brand-title"> 
                  {brandDetailData.map(item => getColorScore(item.Ecom ? (item.Ecom).toFixed(2) : 0, 40.0))}
                  </div>
                  <span className="brand-subtitle">Ecom DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">40.0</div>
                  </OverlayTrigger>
                  <div className="score-diff success-color">
                    <IoIosTrendingUp /> + 4.3
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdOutlineShowChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  {brandDetailData.map(item => getColorScore((item.social).toFixed(2), 60.5))}
                  </div>
                  <span className="brand-subtitle">Social DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">75.3</div>
                  </OverlayTrigger>
                  <div className="score-diff success-color">
                    <IoIosTrendingUp /> + 2.3
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdOutlineMultilineChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                    {brandDetailData.map(item => getColorScore((item.Paid).toFixed(2), 50))}
                  </div>
                  <span className="brand-subtitle">Paid DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">50.0</div>
                  </OverlayTrigger>
                  <div className="score-diff warning-color">
                    <IoIosTrendingUp /> + 0.3
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <GiMultipleTargets />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  {brandDetailData.map(item => getColorScore((item.Brand_Perf).toFixed(2), 50))}
                  </div>
                  <span className="brand-subtitle">Brand Perf DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">52.4</div>
                  </OverlayTrigger>
                  <div className="score-diff danger-color">
                    <IoIosTrendingDown /> - 1.3
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-container">
            {loading ? (
              <div className="loader-container">
                <div className="loader">
                </div>
                <span className="loader-text">Loading...</span>
              </div>
            ) : error ? (
              <div className="loader-container">
                <div className="loader">
                </div>
                <span className="loader-text">Loading...</span>
              </div>
            ) : (
              <TabComponent
                isBenchmarkDataSaved={true}
                tabs={tabs}
                tabColors={tabColors}
                className="custom-tabs healthcard-tab"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
