import React from "react";
import Table from "react-bootstrap/Table";

const TableComponent = ({ data, columns }) => {
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
          <tr key={rowIndex}>
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
