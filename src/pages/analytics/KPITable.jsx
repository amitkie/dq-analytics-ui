import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import { getKPIScoreValues, getBrandImages } from "../../services/projectService";
import { getAllMetricsDefinition } from "../../services/userService";
import { useParams } from "react-router-dom";
import { FaInfo } from "react-icons/fa";

const KPITable = ({ getColor, metrics, projectDetails, getColorScore, kpiData= [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { brand } = useParams();
  const totalBrands = projectDetails?.brands?.length || 0;
  const totalPages = Math.ceil(totalBrands / itemsPerPage);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandLogo, setBrandLogo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showSelectedMetricDesc, setShowSelectedMetricDesc] = useState(null);
  const [showMetricsDesc, setShowMetricsDesc] = useState([]);

  const brandsToDisplay = projectDetails?.brands?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const fetchKPIScores = async () => {
  //   setLoading(true); 
  //   setError(null);  
  
  //   const data = {
  //     platform: Array.from(new Set(metrics?.map((metric) => metric.platform?.name))) ,
  //     metrics: Array.from(new Set( metrics?.map((metric) => metric.metric_name))),
  //     brand: projectDetails?.brands,
  //     analysis_type: "Overall",
  //     start_date: projectDetails?.start_date,
  //     end_date: projectDetails?.end_date,
  //   };
  
  //   try {
  //     const kpiScores = await getKPIScoreValues(data);
  //     setKpiData(kpiScores?.results || []);
  //   } catch (error) {
  //     console.error("Error fetching KPI scores:", error);
  //     setError("Failed to load KPI scores"); 
  //   } finally {
  //     setLoading(false); 
  //   }
  // };
 

  // useEffect(() => {
  //   fetchKPIScores();
  // }, []);

  // useEffect(() => {
  //   fetchBrandLogo();
  // }, [brand]);

  const fetchBrandLogo = async () => {
    setLoading(true);
    setError(null);
  
    try {
    let arra = []
    let newBrandLogoArray = brandsToDisplay.map(async (brand) => {
        const brandLogoDetails = await getBrandImages(brand);
        if (brandLogoDetails) {
          arra.push(brandLogoDetails)
          console.log("brandLogoDetails", brandLogoDetails);
        } else {
          setError("No Data Found");
        }
        return {brandName:brand, arra};
      }) 
      setBrandLogo(newBrandLogoArray);
    } catch (error) {
      setError("Error fetching brand images.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImageOfBrand = async(brand) => {
    const brandLogoDetails = await getBrandImages(brand);
    console.log(brandLogoDetails, 'brandLogoDetails')
    return brandLogoDetails;
  }

  const fetchMetricsDefinition = async (metric_name, platform_name) => {
    try {
      if (showSelectedMetricDesc === metric_name) {
        setShowSelectedMetricDesc(null);  
        setShowMetricsDesc('');  
      } else {
         const metricsDescData = await getAllMetricsDefinition(metric_name, platform_name);
        if (metricsDescData) {
          setShowMetricsDesc(metricsDescData?.definition);
          setShowSelectedMetricDesc(metric_name); // Set the clicked metric as selected
        }
      }
     
    } catch (error) {
      console.error('Error while fetching or mapping metrics data:', error);
    }
  };

  const renderTableBody = () => {
    if (!kpiData || kpiData?.length === 0) {
      return (
        <tr>
          <td colSpan={brandsToDisplay?.length + 2}>
            <div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading...</span>
            </div>
          </td>
        </tr>
      );
    }

    return metrics?.map((metric, metricIndex) => (
      <tr key={metricIndex}>
        <td>
        <span
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: getColor(metric?.section?.name),
            marginRight: '5px',
          }}
        
        ></span>
          {metric?.section?.name}
          {console.log( "backgroundColor: ", getColor(metric?.section?.name))}
          </td>
        <td>
          {metric?.platform?.name}
          </td>
        <td>
          <div className="metric-name">{metric?.metric_name}
            <div className="metric-info">
              <FaInfo className="info-icon" onClick={() => fetchMetricsDefinition(metric?.metric_name, metric?.platform?.name)} />
              {showSelectedMetricDesc === metric?.metric_name && (
                <span className="metric-desc">{showMetricsDesc}</span>
              )}
            </div>
          </div>
        </td>

        {brandsToDisplay?.map((brand, brandIndex) => {
          const resultData = kpiData?.find(
            (data) =>
              data?.platform === metric?.platform?.name &&
              data?.metric === metric?.metric_name &&
              data?.brand === brand
          );

          const color = getColor(resultData?.section);

          return (
            <td key={brandIndex}>

              <span
                title={`Benchmark Value: ${resultData?.benchmarkValue || 'N/A'}\nPercentile: ${resultData?.percentile || 'N/A'}`}
                style={{ color: getColorScore(Number(resultData?.result).toFixed(2), [60, 70, 80]) }}
              >
              {resultData?.result !== null ? getColorScore(Number(resultData?.result).toFixed(2), [60, 70, 80]) : "N/A"}
              </span>
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div>
      <ul class="legend">
        <li> Marketplace</li>
        <li> Digital Spends</li>
        <li> Socialwatch</li>
        <li> Organic Performance</li>
      </ul>
      <Table
        responsive
        striped
        bordered
        className="insights-table"
        id="wrapper2"
      >
        <thead>
          <tr>
            <th>Section</th>
            <th>Platform</th>
            <th>Metrics</th>
            {brandsToDisplay.sort((a, b) => a.localeCompare(b)).map((brandItem, index) => (
              <th key={index}> 
              {/* <img src={fetchImageOfBrand(brandItem)}></img>  */}
              {brandItem}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>

    
      </Table>
      {totalBrands > itemsPerPage && (
        <div className="pagination-container">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default KPITable;
