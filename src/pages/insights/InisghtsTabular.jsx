import React from "react";
import Table from "react-bootstrap/Table";
import "./InsightsTabular.scss";

const InsightsTabular = ({loading, data, columns, filteredBrands }) => {
  if (!data || data.length === 0) {
    return <div className="no-data">No Data Available</div>;
  }

  // Get unique brand names across all projects
  const uniqueBrands = Array.from(
    new Set(
      data.flatMap((project) =>
        project.brands ? project.brands.map((item) => item.brand_name) : []
      )
    )
  );

  // If filteredBrands is provided and not empty, filter the uniqueBrands
  const brandsToShow = filteredBrands && filteredBrands.length > 0
    ? uniqueBrands.filter((brand) => filteredBrands.includes(brand))
    : uniqueBrands;

  return (
    <Table responsive striped bordered className="insights-table">
      <thead>
        <tr>
          <th className="sticky-brand sticky-brand-header">Brands</th>
          {data.map((project, projIndex) => (
            <th key={projIndex} colSpan={columns.length} className="project-header">
              {project.project_name}
            </th>
          ))}
        </tr>
        <tr>
          <th className="sticky-brand sticky-brand-header"></th>
          {data.map(() =>
            columns.map((column, colIndex) => (
              <th key={colIndex}>{column.header}</th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        {brandsToShow.map((brand, brandIndex) => (
          <tr key={brandIndex}>
            <td className="sticky-brand"><b>{brand}</b></td>
            {data.map((project, projIndex) => {
              const brandData = project.brands
                ? project.brands.find((item) => item.brand_name === brand)
                : null;

              return columns.map((column, colIndex) => (
                <td key={`${projIndex}-${colIndex}`}>
                  {brandData && brandData.dq_score[column.accessor] !== undefined
                    ? parseFloat(brandData.dq_score[column.accessor]).toFixed(2)
                    : "N/A"}
                </td>
              ));
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InsightsTabular;
