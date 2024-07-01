import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const TableComponent = ({ data, columns }) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/healthcardOverview`);
  };
  return (
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
          <tr key={rowIndex} onClick={() => handleRowClick(row)}>
            {columns.map((column, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
