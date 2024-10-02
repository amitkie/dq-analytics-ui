import React, { useEffect, useState } from "react";
import TableComponent from "../../components/tableComponent/TableComponent";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
import { gethealthCardData } from "../../services/HealthCard";
import { getAllBrands, getAllCategories } from "../../services/userService";

import "./HealthCard.scss";

export default function HealthCard() {
  const data = gethealthCardData();
  const [filteredData, setFilteredData] = useState(data);
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

  const [filterCategory, setFilterCategory] = useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState([]);
  
  useEffect(() => {
    fetchAllBrands();
    fetchAllCategories();
     
    if (alphabetFilter  === "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.Brands?.toLowerCase().startsWith(alphabetFilter.toLowerCase())));
      // const results = data.filter(item => {
      //   if(selectedFilterCategory && alphabetFilter) {
      //     item.category_id !== selectedFilterCategory
      //   }
      // })
    }
    
  }, [alphabetFilter, data]);

  const fetchAllBrands = async() => {
    try {
      const brandsData = await getAllBrands();
    } catch (error) {
      console.log("error fetching brands", error);
    }
  }

  const fetchAllCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setFilterCategory(
        categoriesData.data.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }))
      );
    }catch(error) {
      console.log("error Filter categories", error);
    }
  }

  const handleAlphabetClick = (alphabet) => {
    setAlphabetFilter(alphabet);
  };

  const handleCategoryFilter = async (selectedOptions) => {
    setSelectedFilterCategory(selectedOptions);
    if (selectedOptions.length > 0) {
      try {
        const categoryIds = selectedOptions.map((option) => option.value);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    
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
          <MultiSelectDropdown
            options={filterCategory}
            selectedValues={selectedFilterCategory}
            onChange={handleCategoryFilter}
            placeholder="Select Categories"
          />
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
          <li onClick={() => setAlphabetFilter('')}><button className="clearBtn" >Clear Filter</button></li>
        </ul>

        <TableComponent 
          data={filteredData} 
          columns={columns} 
        />

      </div>
    </div>
  )
}
