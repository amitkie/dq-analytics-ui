import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import { getKPIScoreValues } from "../../services/projectService";

const KPITable = ({ getColor, metrics, projectDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [kpiData, setKpiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const itemsPerPage = 10;

  const totalBrands = projectDetails?.brands?.length || 0;
  const totalPages = Math.ceil(totalBrands / itemsPerPage);

  const brandsToDisplay = projectDetails?.brands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchKPIScores = async () => {
    setLoading(true); 
    setError(null);  
  
    const data = {
      platform: Array.from(new Set(metrics?.map((metric) => metric.platform?.name))) ,
      metrics: Array.from(new Set( metrics?.map((metric) => metric.metric_name))),
      brand: projectDetails?.brands,
      analysis_type: "Overall",
      start_date: projectDetails?.start_date,
      end_date: projectDetails?.end_date,
    };
  
    try {
      const kpiScores = await getKPIScoreValues(data);
      setKpiData(kpiScores?.results || []);
    } catch (error) {
      console.error("Error fetching KPI scores:", error);
      setError("Failed to load KPI scores"); 
    } finally {
      setLoading(false); 
    }
  };
 

  useEffect(() => {
    fetchKPIScores();
  }, []);


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
          {metric?.platform?.name}
          {console.log(metric?.section?.name, 'metric?.platform.section')}
          </td>
        <td>{metric?.metric_name}</td>
        {brandsToDisplay?.map((brand, brandIndex) => {
          const resultData = kpiData?.find(
            (data) =>
              data?.platform === metric?.platform?.name &&
              data?.metric === metric?.metric_name &&
              data?.brand === brand
          );

          const color = getColor(resultData?.section);
          console.log(color, "checkkkkkkkk", resultData?.section)

          return (
            <td key={brandIndex}>
              {resultData?.result !== null ? resultData?.result : "N/A"}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div>
      <ul class="legend">
        <li> Ecom</li>
        <li> Social</li>
        <li> Paid</li>
        <li> Brand Pref</li>
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
            <th>Platform</th>
            <th>Metrics</th>
            {brandsToDisplay.map((brandItem, index) => (
              <th key={index}>{brandItem}</th>
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
