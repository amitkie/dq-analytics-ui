import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import { getKPIScoreValues } from "../../services/projectService";

const KPITable = ({ getColor, metrics, projectDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalBrands = projectDetails?.brands.length || 0;
  const totalPages = Math.ceil(totalBrands / itemsPerPage);

  // Use brandsToDisplay for the table content
  const brandsToDisplay = projectDetails?.brands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const fetchKPIScores = async () => {
    const data = {
      platform: metrics.map((metric) => metric.platform.name),
      metrics: metrics.map((metric) => metric.metric_name),
      brand: projectDetails?.brands,
      analysis_type: "Overall",
      start_date: "2024-01-01",
      end_date: "2024-12-31",
    };
    if (data) {
      try {
        const kpiScores = await getKPIScoreValues(data);
        console.log(kpiScores);
      } catch (error) {}
    }
  };
  //   const platform = metrics.map(metric => metric.platform.name);

  useEffect(() => {
    fetchKPIScores();
  }, []);

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
            <th>Metrics</th>
            {brandsToDisplay.map((brandItem, index) => (
              <th key={index}>{brandItem}</th>
            ))}
          </tr>
        </thead>
        {/* <tbody>
          {metrics?.map((metricItem, metricIndex) => (
            <tr key={metricItem.metric_id}>
              <td>{metricItem?.metric_name}</td>
              {brandsToDisplay.map((brandItem, brandIndex) => (
                <td key={`${metricIndex}-${brandIndex}`}>
                  Value for {brandItem} - {metricItem?.metric_name}
                </td>
              ))}
            </tr>
          ))}
        </tbody> */}

        <tbody>
          <tr>
            <td>Impression - Amazon</td>
            <td></td>
          </tr>
          <tr>
            <td>Avalability - Amazon</td>
          </tr>
          <tr>
            <td>Impression - DV360</td>
            <td></td>
          </tr>
          <tr>
            <td>Avalability - DV360</td>
          </tr>
        </tbody>
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
