import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import TableComponent from "../../components/tableComponent/TableComponent";
import { gethealthCardData } from "../../services/HealthCard";

import "./HealthCard.scss";
import { getAllBrands } from "../../services/userService";

export default function HealthCard() {
  const data = gethealthCardData();
  const [filteredData, setFilteredData] = useState(data);
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  
  useEffect(() => {
    fetchAllBrands();
    console.log('Alphabet Filter:', alphabetFilter); 
    if (alphabetFilter === "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.Brands?.toLowerCase().startsWith(alphabetFilter.toLowerCase())));
      // setFilteredData( data.filter((item) => item.name.toLowerCase().startsWith(alphabetFilter.toLowerCase())));
      console.log("data", data.Brands)
    }
  }, [alphabetFilter, data]);

  const fetchAllBrands = async() => {
    try {
      const brandsData = await getAllBrands();
    } catch (error) {
      console.log("error fetching brands", error);
    }
  }

  const handleAlphabetClick = (alphabet) => {
    setAlphabetFilter(alphabet);
  };
  const columns = [
    {
      header: "S.no",
      accessor: "Serial_no",
    },
    { header: "Brands", accessor: "Brands" },
    {
      header: "Organisation",
      accessor: "Organisation",
    },
    { header: "Category", accessor: "Category" },
  ];
  return (
    <div className="col-12">
      <div className="workspace-container">
        <div className="healthcard-heading">
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
              // className={filter === alphabet ? "active" : ""}
              onClick={() => handleAlphabetClick(alphabet)}
            >
              {alphabet}
            </li>
          ))}
          <li><button onClick={() => setAlphabetFilter('')}>Clear Filter</button></li>
        </ul>

        <TableComponent 
          data={filteredData} 
          columns={columns} 
        />

      </div>
    </div>
  )
}
