import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableComponent from "../../components/tableComponent/TableComponent";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
import { gethealthCardData } from "../../services/HealthCard";
import { getAllBrands, getAllCategories } from "../../services/userService";
import { getProjectDetailsByProjectId, } from "../../services/projectService";
import { useSelector } from "react-redux";
import "./HealthCard.scss";

export default function HealthCard() {
  // const { userInfo, projectInfo } = useSelector((state) => state.user);
  const { brand, projectId } = useParams(); 
  const [healthTableData, setHealthTableData] = useState([]); 
  const [filteredData, setFilteredData] = useState(healthTableData);
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState([]);
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  const selectedProjectId = useSelector((state) => state.user.recentlyUsedProjectId);
  const [tableBrandData, setTableBrandData] = useState();
  const [tableCategories, setTableCategories] = useState();

  console.log('projectId', projectId);
  useEffect(() => {
    fetchAllBrands();
    fetchAllCategories();
    fetchHealthCardData();
  }, []);
  
  const fetchHealthCardData = async () => {
    try {
      const healthCardData = await gethealthCardData();
      // const healthCardData = await getProjectDetailsByProjectId(selectedProjectId);
       
        if(healthCardData ){

          setHealthTableData(healthCardData);  
          setFilteredData(healthCardData); 
        } 

    } catch (error) {
    }
  };


     
  useEffect(() => {
    let filtered = healthTableData;

    // Clear alphabet filter when category is selected
    if (selectedFilterCategory.length > 0) {
      setAlphabetFilter(""); // Clear alphabet filter when a category is selected
    }

    // Alphabet filter
    if (alphabetFilter !== "") {
      filtered = filtered.filter((item) =>
        item.Brands?.toLowerCase().startsWith(alphabetFilter.toLowerCase())
      );
    }

    // Category filter
    if (selectedFilterCategory.length > 0) {
      const selectedCategoryNames = selectedFilterCategory.map((option) => option.label);
      filtered = filtered.filter((item) => {
        const itemCategory = item.Category ? item.Category : "";
        return selectedCategoryNames.includes(itemCategory);
      });
    }

    
    setFilteredData(filtered);
  }, [alphabetFilter, selectedFilterCategory, healthTableData]);

  const fetchAllBrands = async() => {
    try {
      const brandsData = await getAllBrands();
    } catch (error) {
    }
  }

  const fetchAllCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setFilterCategory(
        categoriesData?.data?.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }))
      );
    }catch(error) {
    }
  }

  const handleAlphabetClick = (alphabet) => {
    setAlphabetFilter(alphabet);
  };

  const handleCategoryFilter = (selectedOptions) => {
    setSelectedFilterCategory(selectedOptions);
  };

  // useEffect(() => {
  //   if(filteredData && filteredData.length > 0) {
  //     const transformedData = filteredData.flatMap((project) =>
  //       project.brands.map((brand) => ({
  //         Quarter: "Q4 2024", 
  //         Category: project.project_name,
  //         brand_name: brand.brand_name,
  //         Marketplace: brand.dq_score.Marketplace,
  //         "Digital Spends": brand.dq_score["Digital Spends"],
  //         "Organic Performance": brand.dq_score["Organic Performance"],
  //         Socialwatch: brand.dq_score.Socialwatch,
  //         Overall_Final_Score: brand.dq_score.Overall_Final_Score,
  //       }))
  //     );
      
  //     setTableBrandData(transformedData);
  //   } else {
  //     setTableBrandData([])
  //   }
  // }, [filteredData]);
   
  

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
         
        {/* <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Brand</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
          {filteredData?.metrics?.map((obj) =>
            obj?.brands?.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.id}</td>
                <td colSpan="2">{brand.name}</td>
              </tr>
            ))
          )}
          </tbody>
        </table> */}


      </div>
    </div>
  )
}
