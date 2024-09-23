import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import { getNormalizedValues } from "../../services/projectService";

const ComparisionView = ({ compareNormalizeValue, projectDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [compareData, setCompareData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const itemsPerPage = 10;

  const totalBrands = projectDetails?.brands?.length || 0;
  const totalPages = Math.ceil(totalBrands / itemsPerPage);

  // Use brandsToDisplay for the table content
  const brandsToDisplay = projectDetails?.brands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const renderTableBody = () => {
    if (!compareNormalizeValue || compareNormalizeValue?.length === 0) {
      return (
        <tr>
          <td colSpan={brandsToDisplay?.length + 2}>No data available</td>
        </tr>
      );
    }
    

    // Create rows for each combination of platform and metric
    return compareNormalizeValue?.map((metric, metricIndex) => (
      <tr key={metricIndex}>
        <td>{metric?.platform.name}</td>
        <td>{metric?.metric_name}</td>
        <td>{metric?.uniqueBrands}</td>
        {/* {brandsToDisplay?.map((brand, brandIndex) => {
          const resultData = kpiData?.find(
            (data) =>
              data?.platform === metric?.platform.name &&
              data?.metric === metric?.metric_name &&
              data?.brand === brand
          );

          const color = getColor(resultData?.section);
          console.log(color, "checkkkkkkkk")
          // Change this logic to check the section

          return (
            <td key={brandIndex} style={{ color: color }}>
              {resultData?.result !== null ? resultData?.result : "N/A"}
            </td>
          );
        })} */}
      </tr>
    ));
  };

  return (
    <div>
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
            {/* {brandsToDisplay.map((brandItem, index) => (
              <th key={index}>{brandItem}</th>
            ))} */}
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

export default ComparisionView;


