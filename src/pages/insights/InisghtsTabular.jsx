// import React from "react";
// import Table from "react-bootstrap/Table";
// import "./InsightsTabular.scss";

// const InsightsTabular = ({loading, data, columns, filteredBrands, message }) => {
//   if (!data || data.length === 0) {
//     return message ? (<div className="no-data">{message}</div>) : (<div className="no-data">No Data Available</div>);
//   }

//   // Get unique brand names across all projects
//   const uniqueBrands = Array.from(
//     new Set(
//       data.flatMap((project) =>
//         project.brands ? project.brands.map((item) => item.brand_name) : []
//       )
//     )
//   );

//   // If filteredBrands is provided and not empty, filter the uniqueBrands
//   const brandsToShow = filteredBrands && filteredBrands.length > 0
//     ? uniqueBrands.filter((brand) => filteredBrands.includes(brand))
//     : uniqueBrands;

//     const getColor = (section) => {
//       switch (section) {
//         case "Marketplace":
//           return "#2A61DD";
//         case "Digital Spends":
//           return "#279E70";
//         case "Socialwatch":
//           return "#FF9800";
//         case "Organic Performance":
//           return "#C82519";
//         default:
//           return "#000000";
//       }
//     };


//   return (
//     <Table responsive striped bordered className="insights-table">
//       <thead>
//         <tr>
//           <th className="sticky-brand sticky-brand-header">Brands</th>
//           {data.map((project, projIndex) => (
//             <th key={projIndex} colSpan={columns.length} className="project-header">
//               {project.project_name}
//             </th>
//           ))}
//         </tr>
//         <tr>
//           <th className="sticky-brand sticky-brand-header"></th>
//           {data.map(() =>
//             columns.map((column, colIndex) => (
//               <th key={colIndex} style={{ color: getColor(column.header) }}>{column.header}</th>
//             ))
//           )}
//         </tr>
//       </thead>
//       <tbody>
//         {brandsToShow.map((brand, brandIndex) => (
//           <tr key={brandIndex}>
//             <td className="sticky-brand">{brand}</td>
//             {data.map((project, projIndex) => {
//               const brandData = project.brands
//                 ? project.brands.find((item) => item.brand_name === brand)
//                 : null;

//               return columns.map((column, colIndex) => (
//                 <td key={`${projIndex}-${colIndex}`}>
//                   {brandData && brandData.dq_score[column.accessor] !== undefined
//                     ? parseFloat(brandData.dq_score[column.accessor]).toFixed(2)
//                     : "N/A"}
//                 </td>
//               ));
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "./InsightsTabular.scss";

const InsightsTabular = ({ loading, data, columns, filteredBrands, message }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  if (!data || data.length === 0) {
    return message ? (<div className="no-data">{message}</div>) : (<div className="no-data">No Data Available</div>);
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

  const getColor = (section) => {
    switch (section) {
      case "Marketplace":
        return "#2A61DD";
      case "Digital Spends":
        return "#279E70";
      case "Socialwatch":
        return "#FF9800";
      case "Organic Performance":
        return "#C82519";
      default:
        return "#000000";
    }
  };

  // Sort brands based on the selected column and direction for each project independently
  const sortedBrands = [...brandsToShow].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aScore = data.reduce((acc, project) => {
      const brandData = project.brands?.find(item => item.brand_name === a);
      return acc + (brandData ? parseFloat(brandData.dq_score[sortConfig.key] || 0) : 0);
    }, 0);

    const bScore = data.reduce((acc, project) => {
      const brandData = project.brands?.find(item => item.brand_name === b);
      return acc + (brandData ? parseFloat(brandData.dq_score[sortConfig.key] || 0) : 0);
    }, 0);

    if (aScore < bScore) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aScore > bScore) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

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
              <th
                key={colIndex}
                style={{ color: getColor(column.header) }}
                onClick={() => handleSort(column.accessor)}
                className={sortConfig.key === column.accessor ? `sorted-${sortConfig.direction}` : ''}
              >
                {column.header} {sortConfig.key === column.accessor ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        {sortedBrands.map((brand, brandIndex) => (
          <tr key={brandIndex}>
            <td className="sticky-brand">{brand}</td>
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

