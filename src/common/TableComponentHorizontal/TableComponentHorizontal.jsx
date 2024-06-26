import React from "react";
import Table from "react-bootstrap/Table";

const TableComponent = ({ data, columns }) => {
  return (
    <Table responsive striped bordered>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
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
