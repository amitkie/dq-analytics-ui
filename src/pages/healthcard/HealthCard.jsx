import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import TableComponent from "../../components/tableComponent/TableComponent";
import { getData } from "../../services/q3";

import "./HealthCard.scss";

export default function HealthCard() {
  const data = getData();
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  useEffect(() => {
    if (filter === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => item.name.toLowerCase().startsWith(filter))
      );
    }
  }, [filter, data]);
  const handleAlphabetClick = (alphabet) => {
    setFilter(alphabet);
  };
  const columns = [
    {
      header: "S.no",
      accessor: {},
    },
    { header: "Brands", accessor: "Brands" },
    {
      header: "Organisation",
      accessor: {},
    },
    { header: "Category", accessor: "Category" },
  ];
  return (
    <div className="row g-0">
      <div className="col-1">
        <SideBar />
      </div>
      <div className="col-11">
        <div className="workspace-container">
          <div className="d-flex justify-content-between">
            <h2 className="page-title ml-3">Health Card</h2>
            <div className="category-filter">
              <select name="Metrics" className="Select-filter-category">
                <option value="Select Metrics">Select Category</option>
                <option value="haircare">Ecom</option>
                <option value="baby">Social</option>
                <option value="mansGrooming">Paid</option>
              </select>
            </div>
          </div>
          <ul className="alphabet-filters">
            {alphabets.map((alphabet, index) => (
              <li
                key={index}
                className={filter === alphabet ? "active" : ""}
                onClick={() => handleAlphabetClick(alphabet)}
              >
                {alphabet}
              </li>
            ))}
          </ul>

          <TableComponent data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}
