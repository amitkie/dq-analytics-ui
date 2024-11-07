// InsightsTabular.js
import React from "react";
import Table from "react-bootstrap/Table";
import "./InsightsTabular.scss";

const InsightsTabular = ({ data, columns, projectName }) => {
  return (
    <>
      <h3>{projectName}</h3>
      <Table responsive striped bordered>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr className="c-pointer" key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  {typeof row[column.accessor] === "number"
                    ? row[column.accessor].toFixed(2)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default InsightsTabular;
