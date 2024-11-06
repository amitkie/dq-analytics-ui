import React, { useEffect, useState } from "react";
import TableComponent from "../../components/tableComponent/TableComponent";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
import { gethealthCardData } from "../../services/HealthCard";
import { getAllBrands, getAllCategories } from "../../services/userService";
import { useSelector } from "react-redux";
import { getProjectDetailsByUserId } from "../../services/projectService";
import "./HealthCard.scss";

export default function HealthCard() {
  // const { userInfo, projectInfo } = useSelector((state) => state.user);
  const data = gethealthCardData; 
 
  const [filteredData, setFilteredData] = useState(data);
  const [alphabetFilter, setAlphabetFilter] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState([]);
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  const selectedProjectId = useSelector((state) => state.user.recentlyUsedProjectId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthCardDetails, setHealthCardDetails] = useState({});

  const fetchHealthCardData = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
     
    try {
      const healthCardData = await getProjectDetailsByUserId(1);
      if (healthCardData) {
        setHealthCardDetails(healthCardData?.project);
        
      } else {
        setError("No data found");
      }
    } catch (error) {
      console.error("Error fetching health card data:", error);
      setError("No data found"); // Set error message if API call fails
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchAllBrands();
    fetchAllCategories();
    fetchHealthCardData();
;  }, []);

 
 
  // const selectedProject = healthCardDetails?.find((item) => item.id === selectedProjectId);
 
  // const projectName = selectedProject ? selectedProject?.project_name : 'Project not found';
 
    console.log('healthCardDetails', healthCardDetails)
  useEffect(() => {
    let filtered = data;

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
  }, [alphabetFilter, selectedFilterCategory, data]);

  // useEffect(() => {
  //   fetchAllBrands();
  //   fetchAllCategories();
  
  //   let filtered = data;
 
  //   if (alphabetFilter !== "") {
  //     filtered = filtered.filter((item) =>
  //       item.Brands?.toLowerCase().startsWith(alphabetFilter.toLowerCase())
  //     );
  //   }
  
  //   // Category filter (filter by category names)
  //   if (selectedFilterCategory.length > 0) {
  //     const selectedCategoryNames = selectedFilterCategory.map((option) => option.label);
  //     filtered = filtered.filter((item) => {
  //       const itemCategory = item.Category ? item.Category : "";
  //       return selectedCategoryNames.includes(itemCategory);
  //     });
  //   }

  //   setFilteredData(filtered);
  // }, [alphabetFilter, selectedFilterCategory, data]);
    
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

  const handleCategoryFilter = (selectedOptions) => {
    console.log("Selected Options:", selectedOptions); // Log selected options
    setSelectedFilterCategory(selectedOptions);
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
