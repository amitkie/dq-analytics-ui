import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import { getBrandImages } from "../../services/projectService";
import { FaInfo } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./KPITable.scss";
import { getAllMetricsDefinition } from "../../services/userService";

const KPITable = ({ normalizedData, getColor, metrics, projectDetails, getColorScore, kpiData = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { brand } = useParams();
  const totalBrands = projectDetails?.brands?.length || 0;
  const totalPages = Math.ceil(totalBrands / itemsPerPage);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandLogo, setBrandLogo] = useState([]);
  const [showSelectedMetricDesc, setShowSelectedMetricDesc] = useState(null);
  const [showMetricsDesc, setShowMetricsDesc] = useState([]);

  const brandsToDisplay = projectDetails?.brands?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchBrandLogo = async () => {
    setLoading(true);
    setError(null);

    try {
      let newBrandLogoArray = await Promise.all(
        brandsToDisplay.map(async (brand) => {
          const brandLogoDetails = await getBrandImages(brand);
          return { brandName: brand, brandLogo: brandLogoDetails };
        })
      );
      setBrandLogo(newBrandLogoArray);
    } catch (error) {
      setError("Error fetching brand images.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetricsDefinition = async (metric_name, platform_name) => {
    try {
      if (showSelectedMetricDesc === metric_name) {
        setShowSelectedMetricDesc(null);
        setShowMetricsDesc('');
      } else {
        const metricsDescData = await getAllMetricsDefinition(metric_name, platform_name);
        if (metricsDescData) {
          setShowMetricsDesc(metricsDescData?.definition);
          setShowSelectedMetricDesc(metric_name);
        }
      }
    } catch (error) {
      console.error('Error while fetching or mapping metrics data:', error);
    }
  };

  const renderTableBody = () => {
    if (!normalizedData || normalizedData?.length === 0) {
      return (
        <tr>
          <td colSpan={brandsToDisplay?.length + 3} style={{ width: '100%' }}>
            <div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading...</span>
            </div>
          </td>
        </tr>
      );
    }

    // Group data by metric and brand
    const groupedData = normalizedData.reduce((acc, item) => {
      if (!acc[item.metricname]) acc[item.metricname] = {};
      acc[item.metricname][item.brandName] = item;
      return acc;
    }, {});

    return Object.keys(groupedData).map((metricName, metricIndex) => {
      const metricData = groupedData[metricName];

      return (
        <tr key={metricIndex}>
          <td className="sticky-col" style={{ width: '150px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: getColor(metricData[Object.keys(metricData)[0]]?.sectionName),
                marginRight: '5px',
              }}
            ></span>
            {metricData[Object.keys(metricData)[0]]?.sectionName}
          </td>
          <td className="sticky-col" style={{ width: '150px' }}>
            {metricData[Object.keys(metricData)[0]]?.platformname}
          </td>
          <td className="sticky-col" style={{ width: '150px' }}>
            <div className="metric-name">
              {metricName}
              <div className="metric-info">
                <FaInfo
                  className="info-icon"
                  onClick={() =>
                    fetchMetricsDefinition(metricName, metricData[Object.keys(metricData)[0]]?.platformname)
                  }
                />
                {showSelectedMetricDesc === metricName && <span className="metric-desc">{showMetricsDesc}</span>}
              </div>
            </div>
          </td>

          {brandsToDisplay.map((brandItem, brandIndex) => {
            const brandData = metricData[brandItem];
            const color = getColor(brandData?.sectionName);

            return (
              <td key={brandIndex} style={{ width: '100px' }}>
                <span
                  title={`Benchmark Value: ${brandData?.benchmarkValue || 'N/A'}\nPercentile: ${brandData?.percentile || 'N/A'}`}
                >
                  {brandData?.actualValue !== null ? (Number(brandData?.actualValue).toFixed(2)) : 'N/A'}
                </span>
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div>
      <ul className="legend">
        <li>Marketplace</li>
        <li>Digital Spends</li>
        <li>Socialwatch</li>
        <li>Organic Performance</li>
      </ul>
      <Table responsive striped bordered className="insights-table kpi-table" id="wrapper2">
        <thead>
          <tr>
            <th className="sticky-col" style={{ width: '150px' }}>Section</th>
            <th className="sticky-col" style={{ width: '150px' }}>Platform</th>
            <th className="sticky-col" style={{ width: '150px' }}>Metrics</th>
            {brandsToDisplay.sort((a, b) => a.localeCompare(b)).map((brandItem, index) => (
              <th key={index} style={{ width: '100px' }}>
                <span>{brandItem}</span>
              </th>
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
