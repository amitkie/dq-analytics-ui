import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import ButtonComponent from "../../common/button/button";
import TabComponent from "../../components/tabs/TabComponent";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
import { FcExpand } from "react-icons/fc";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { FcCollapse } from "react-icons/fc";
import "../../App.scss";
import "./Insights.scss";



export default function BrandView({ selectedProjectsList, selectedProjectsData, selectedProjectsWeightsData, selectedProjectsBrandsData}) {
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [showBrands, setShowBrands] = useState([]);
    const [showSelectedBrands, setShowSelectedBrands] = useState([]);
    const [showMetrics, setShowMetrics] = useState([]);
    const [showSelectedMetrics, setShowSelectedMetrics] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});
    const [expandedPlatforms, setExpandedPlatforms] = useState({});
    const [expandedNormSections, setExpandedNormSections] = useState({});
    const [expandedNormPlatforms, setExpandedNormPlatforms] = useState({});
    const [expandedRows, setExpandedRows] = useState({});
     
    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const togglePlatform = (section, platform) => {
        setExpandedPlatforms((prev) => ({
            ...prev,
            [`${section}-${platform}`]: !prev[`${section}-${platform}`],
        }));
    };

    // Get unique sections
    const uniqueSections = Array.from(
        new Set(selectedProjectsWeightsData?.data?.map((item) => item.sectionname))
    );
    console.log("uniqueSections brand norm weight::", uniqueSections)

    // Group data by section names
    const groupedData = uniqueSections?.map((section) => ({
        section,
        platforms: selectedProjectsWeightsData?.data.filter(
            (item) => item.sectionname === section
        ),
    }));
    const uniqueProjectNames = Array.from(
        new Set(selectedProjectsWeightsData?.data?.map((item) => item.project_name))
    );

    const toggleNormSection = (section) => {
        setExpandedNormSections((prev) => ({
            ...prev,
            [section]: !prev?.[section] ?? true, // Ensure it toggles correctly
        }));
    };
    
    const toggleNormPlatform = (section, platform) => {
        setExpandedNormPlatforms((prev) => ({
            ...prev,
            [`${section}-${platform}`]: !prev?.[`${section}-${platform}`] ?? true,
        }));
    };
   

    const handleRowClick = (projectId, sectionName, platformName) => {
      setExpandedRows({
        ...expandedRows,
        [projectId]: {
          ...expandedRows[projectId],
          [sectionName]: {
            ...expandedRows[projectId]?.[sectionName],
            [platformName]: !expandedRows[projectId]?.[sectionName]?.[platformName],
          },
        },
      });
    };
     

    const handleToggleShow = () => {
        setShowTable(!showTable);
    }
    const handleBrandChange = (selectedOptions) => {
        console.log(selectedOptions, 'selectedOptions');
        setShowSelectedBrands(selectedOptions);

        const selectedBrandNames = selectedOptions?.map((option) => option.label); 
 
        const filteredData = Object.values(selectedProjectsData)
            .flat()
            .filter((project) => selectedBrandNames.includes(project.Brand_Name));

        setFilteredProjects(filteredData); 
        console.log(filteredData, 'Filtered Projects');
    };

    const allProjectsData = filteredProjects.length > 0 ? filteredProjects : Object.values(selectedProjectsData).flat();

    // function getUniqueBrands(response) {
    //     const allBrandNames = [];

    //     for (const Project_ID in response) {
    //         const brands = response[Project_ID].map((project) => project.Brand_Name);
    //         allBrandNames.push(...brands);
    //     }

    //     const uniqueBrands = [...new Set(allBrandNames)];

    //     return uniqueBrands.map((brand, index) => ({
    //         value: index + 1,
    //         label: brand,
    //     }));
    // }
    function getUniqueBrands(response) {

        if (!response || !Array.isArray(response?.data)) {
            console.error("Invalid response format", response);
            return [];
        }
    
        // Extract all brand names
        const allBrandNames = response?.data?.map((project) => project.Brand_Name);
    
        // Remove duplicates and format the output
        const uniqueBrands = [...new Set(allBrandNames)];
    
        return uniqueBrands?.map((brand, index) => ({
            value: index + 1,
            label: brand,
        }));
    }
    console.log("selectedProjectsData brand view", selectedProjectsData)
    
    useEffect(() => {
        if (selectedProjectsData && selectedProjectsData.length > 0) {
            const allBrands = getUniqueBrands(selectedProjectsData);
            
            console.log("allBrands", allBrands);
            setShowBrands(allBrands);
        }
    }, [selectedProjectsData])

    const tabsScoreLevel = [
        {
            label: "Overall DC Score",
            content: (
                <>
                    <div className="row">
                        <div className="col-12">

                            <Table responsive striped bordered>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Above 80 (81 -100)</th>
                                        <th>Between 80 to 60 (61-80)</th>
                                        <th>Between 60 to 50 (51-60)</th>
                                        <th>Between 50 to 20 (20-50)</th>
                                        <th>Below 20 (0-19)</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Digital Trailblaizers/Leaders</td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Overall_Final_Score > 81)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Growth Accelerators/Momentum Drivers</td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Overall_Final_Score > 61 && item.Overall_Final_Score < 80)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Steady Performers/Aspiring Contenders</td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Overall_Final_Score > 51 && item.Overall_Final_Score < 60)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>Digital Challengers/Growth Learners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>

                                            {allProjectsData
                                                ?.filter((item) => item.Overall_Final_Score > 20 && item.Overall_Final_Score < 50)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>At Risk Brands/Digital Beginners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Overall_Final_Score < 19)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            ),
        },
        {
            label: "Marketplace",
            content: (
                <>
                    <div className="row">
                        <div className="col-12">
                            <Table responsive striped bordered>
                                <thead>
                                    <tr>
                                    <th>Category</th>
                                        <th>Above 80 (81 -100)</th>
                                        <th>Between 80 to 60 (61-80)</th>
                                        <th>Between 60 to 50 (51-60)</th>
                                        <th>Between 50 to 20 (20-50)</th>
                                        <th>Below 20 (0-19)</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Digital Trailblaizers/Leaders</td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Marketplace > 81)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Growth Accelerators/Momentum Drivers</td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Marketplace > 61 && item.Marketplace < 80)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Steady Performers/Aspiring Contenders</td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Marketplace > 51 && item.Marketplace < 60)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>Digital Challengers/Growth Learners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>

                                            {allProjectsData
                                                ?.filter((item) => item.Marketplace > 20 && item.Marketplace < 50)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>At Risk Brands/Digital Beginners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Marketplace < 19)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            ),
        },
        {
            label: "Socialwatch",
            content: (
                <>
                    <div className="row">
                        <div className="col-12">
                            <Table responsive striped bordered>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Above 80 (81 -100)</th>
                                        <th>Between 80 to 60 (61-80)</th>
                                        <th>Between 60 to 50 (51-60)</th>
                                        <th>Between 50 to 20 (20-50)</th>
                                        <th>Below 20 (0-19)</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Digital Trailblaizers/Leaders</td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Socialwatch > 81)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Growth Accelerators/Momentum Drivers</td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Socialwatch > 61 && item.Socialwatch < 80)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Steady Performers/Aspiring Contenders</td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Socialwatch > 51 && item.Socialwatch < 60)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>Digital Challengers/Growth Learners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>

                                            {allProjectsData
                                                ?.filter((item) => item.Socialwatch > 20 && item.Socialwatch < 50)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>At Risk Brands/Digital Beginners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item.Socialwatch < 19)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            ),
        },
        {
            label: "Digital Spends",
            content: (
                <>
                    <div className="row">
                        <div className="col-12">
                            <Table responsive striped bordered>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Above 80 (81 -100)</th>
                                        <th>Between 80 to 60 (61-80)</th>
                                        <th>Between 60 to 50 (51-60)</th>
                                        <th>Between 50 to 20 (20-50)</th>
                                        <th>Below 20 (0-19)</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Digital Trailblaizers/Leaders</td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item['Digital Spends'] > 81)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Growth Accelerators/Momentum Drivers</td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item['Digital Spends'] > 61 && item['Digital Spends'] < 80)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Steady Performers/Aspiring Contenders</td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item['Digital Spends'] > 51 && item['Digital Spends'] < 60)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>Digital Challengers/Growth Learners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>

                                            {allProjectsData
                                                ?.filter((item) => item['Digital Spends'] > 20 && item['Digital Spends'] < 50)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>At Risk Brands/Digital Beginners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item['Digital Spends'] < 19)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            ),
        },
        {
            label: "Organic Performance",
            content: (
                <>
                    <div className="row">
                        <div className="col-12">
                            <Table responsive striped bordered>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Above 80 (81 -100)</th>
                                        <th>Between 80 to 60 (61-80)</th>
                                        <th>Between 60 to 50 (51-60)</th>
                                        <th>Between 50 to 20 (20-50)</th>
                                        <th>Below 20 (0-19)</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Digital Trailblaizers/Leaders</td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item['Organic Performance'] > 81)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Growth Accelerators/Momentum Drivers</td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item['Organic Performance'] > 61 && item['Organic Performance'] < 80)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>

                                    <tr>
                                        <td>Steady Performers/Aspiring Contenders</td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item['Organic Performance'] > 51 && item['Organic Performance'] < 60)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>Digital Challengers/Growth Learners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>

                                            {allProjectsData
                                                ?.filter((item) => item['Organic Performance'] > 20 && item['Organic Performance'] < 50)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                        <td> </td>
                                    </tr>
                                    <tr>
                                        <td>At Risk Brands/Digital Beginners</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td>
                                            {allProjectsData
                                                ?.filter((item) => item['Organic Performance'] < 19)
                                                ?.map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        Project Name:{item.Project_Name}, {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
                                                        {index < filteredArray.length - 1 && ", "}
                                                    </span>
                                                ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            ),
        },
    ];

    const tabsSummary = [
        {
            label: "At Score Level",
            content: (
                <>
                    <div className="row">
                        <div className="col-12">
                            <div className="select-container mb-3">
                                <MultiSelectDropdown
                                    options={showBrands.map((item) => {
                                        return {name: item.Brand_Name}
                                    })}
                                    selectedValues={showSelectedBrands}
                                    onChange={handleBrandChange}
                                    placeholder="Select Brands"
                                />
                                <ButtonComponent
                                    btnClass={"btn-primary"}
                                    btnName={"Submit"}
                                />
                            </div>
                            <div className="table-response">
                                <TabComponent
                                    isBenchmarkDataSaved={true}
                                    tabs={tabsScoreLevel}
                                    className="custom-tabs performance-tab"
                                />
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
        {
            label: "At Metric Levels ",
            content: (
                <div className="row">
                    <div className="col-12">
                        <div className="select-container">
                            <MultiSelectDropdown
                                options={showBrands}
                                selectedValues={showSelectedBrands}
                                onChange={handleBrandChange}
                                placeholder="Select Brands"
                            />
                            <MultiSelectDropdown
                                options={showMetrics}
                                selectedValues={showSelectedMetrics}
                                placeholder="Select Metrics"
                            />
                            <ButtonComponent
                                btnClass={"btn-primary"}
                                btnName={"Submit"}
                            />
                        </div>
                        <div className="table-extend">
                            <h4 className="table-title" onClick={handleToggleShow}>Weights View {showTable ? <FcCollapse className="icon-colors" stroke="#093373" /> : <FcExpand className="icon-colors" />} </h4>
                            {showTable && (
                                <Table responsive striped bordered>
                                <thead>
                                    <tr>
                                        <th width="200">Section Name</th>
                                        <th width="200">Platform Name</th>
                                        <th width="200">Metric Name</th>
                                        {/* {Array.from(new Set(selectedProjectsWeightsData?.data.map((item) => item.project_name))).map((projectName, index) => (
                                            <th key={index}>{projectName}</th>
                                        ))} */}
                                       {uniqueProjectNames?.map((projectName, index) => (
                                            <th key={index}>{projectName}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {selectedProjectsWeightsData &&
                                        selectedProjectsWeightsData?.data.map((item, i) => (
                                            Object.keys(item.metrics).map((metric, m) => (
                                                <tr key={`${i}-${m}`}>
                                                    <td width="200">{item.sectionname}</td>
                                                    <td width="200">{item.platformname}</td>
                                                    <td width="200">{metric}</td>
                                                    {Array.from(new Set(selectedProjectsWeightsData?.data.map((item) => item.project_name))).map((projectName, index) => {
                                                        const project = selectedProjectsWeightsData?.data.find(
                                                            (proj) => proj.project_name === projectName
                                                        );
                                                        return (
                                                            <td key={`${index}-${m}`} width="200">
                                                                {project && project.metrics?.[metric] !== undefined
                                                                    ? Number(project.metrics[metric]).toFixed(2)
                                                                    : " "}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))
                                        ))} */}
                                       {/* {selectedProjectsWeightsData && selectedProjectsWeightsData?.data.map((item, i) => (
                                            <React.Fragment key={i}>
                                                 
                                                <tr
                                                    onClick={() => toggleSection(item.sectionname)}
                                                    style={{ cursor: "pointer", backgroundColor: "#f5f5f5" }}
                                                >
                                                    <td width="200">
                                                        <strong>{item.sectionname}</strong>
                                                    </td>
                                                    <td colSpan={uniqueProjectNames.length + 2}></td>
                                                </tr>

                                                 
                                                {expandedSections[item.sectionname] && (
                                                    <tr
                                                        onClick={() => togglePlatform(item.sectionname, item.platformname)}
                                                        style={{ cursor: "pointer", paddingLeft: "20px" }}
                                                    >
                                                        <td></td>
                                                        <td width="200">{item.platformname}</td>
                                                        <td colSpan={uniqueProjectNames.length + 1}></td>
                                                    </tr>
                                                )}

                                                
                                                {expandedSections[item.sectionname] &&
                                                    expandedPlatforms[`${item.sectionname}-${item.platformname}`] &&
                                                    Object.keys(item.metrics).map((metric, m) => (
                                                        <tr key={`${i}-${m}`}>
                                                            <td></td>
                                                            <td></td>
                                                            <td width="200">{metric}</td>
                                                            {uniqueProjectNames.map((projectName, index) => {
                                                                const project = selectedProjectsWeightsData?.data.find(
                                                                    (proj) =>
                                                                        proj.project_name === projectName &&
                                                                        proj.sectionname === item.sectionname &&
                                                                        proj.platformname === item.platformname
                                                                );
                                                                return (
                                                                    <td key={index} width="200">
                                                                        {project?.metrics?.[metric] !== undefined
                                                                            ? project.metrics[metric]
                                                                            : " "}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    ))}
                                            </React.Fragment>
                                        ))} */}
                                        {groupedData?.map((group, i) => (
                                            <React.Fragment key={i}>
                                                {/* Section Row */}
                                                <tr
                                                    onClick={() => toggleSection(group.section)}
                                                    style={{ cursor: "pointer", backgroundColor: "#f5f5f5" }}
                                                >
                                                    <td width="200">
                                                        <strong>{group.section} {expandedSections ? <IoMdAdd /> : <FiMinus /> }</strong>
                                                    </td>
                                                    <td colSpan={uniqueProjectNames.length + 2}></td>
                                                </tr>

                                                {expandedSections[group.section] &&
                                                    group.platforms?.map((platformData, j) => (
                                                        <React.Fragment key={`${i}-${j}`}>
                                                            {/* Platform Row */}
                                                            <tr
                                                                onClick={() =>
                                                                    togglePlatform(
                                                                        group.section,
                                                                        platformData.platformname
                                                                    )
                                                                }
                                                                style={{ cursor: "pointer", paddingLeft: "20px" }}
                                                            >
                                                                <td></td>
                                                                <td width="200">{platformData.platformname} {expandedPlatforms ? <IoMdAdd /> : <FiMinus /> }</td>
                                                                <td colSpan={uniqueProjectNames.length + 1}></td>
                                                            </tr>

                                                            {/* Metrics Rows */}
                                                            {expandedPlatforms[`${group.section}-${platformData.platformname}`] &&
                                                                Object.keys(platformData.metrics)?.map((metric, m) => (
                                                                    <tr key={`${i}-${j}-${m}`}>
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td width="200">{metric}</td>
                                                                        {uniqueProjectNames?.map((projectName, index) => {
                                                                            const project = selectedProjectsWeightsData?.data.find(
                                                                                (proj) =>
                                                                                    proj.project_name === projectName &&
                                                                                    proj.sectionname === group.section &&
                                                                                    proj.platformname ===
                                                                                        platformData.platformname
                                                                            );
                                                                            return (
                                                                                <td key={index} width="200">
                                                                                    {project?.metrics?.[metric] !== undefined
                                                                                        ? project.metrics[metric]
                                                                                        : " "}
                                                                                </td>
                                                                            );
                                                                        })}
                                                                    </tr>
                                                                ))}
                                                        </React.Fragment>
                                                    ))}
                                            </React.Fragment>
                                        ))}
                                </tbody>
                            </Table>
                             
                            )}
                        </div>
                        <div className="table-extend">
                            <h4 className="table-title-normal">Normalized Values View</h4>
                            <Table responsive striped bordered className="brand-norm-table">
                                <thead>
                                    <tr>
                                        <th>Project ID</th>
                                        <th>Project Name</th>
                                        <th>Section name</th>
                                        <th>Platform name</th>
                                        <th>Common metrics name</th>
                                        <th>Above 80 <br /> (81 -100)</th>
                                        <th>Between <br /> 80 to 60 (61-80)</th>
                                        <th>Between <br /> 60 to 50 (51-60)</th>
                                        <th>Between <br /> 50 to 20 (20-50)</th>
                                        <th>Below 20<br />  (0-19)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {/* {selectedProjectsBrandsData.map((item,index) => (
                                            <tr key={index}>
                                                <td>{item.sectionname}</td>
                                                <td>{item.platformname}</td>
                                                <td>{item.metricname}</td>
                                                <td>
                                                    { (
                                                        item.Above81_100
                                                        .split(",")                           
                                                               
                                                    ).map((value, index) => (
                                                    <span key={index} style={{ display: "block" }}>
                                                        {value}
                                                    </span>
                                                    ))}
                                                </td>
                                                <td>
                                                    {(item.Between61_80
                                                            .split(",")                           
                                                            ).map((value, index) => (
                                                        <span key={index} style={{ display: "block" }}>
                                                            {value}
                                                        </span>
                                                        ))}
                                                </td>
                                                <td>
                                                    {(item.Between51_60
                                                            .split(",")                           
                                                            ).map((value, index) => (
                                                        <span key={index} style={{ display: "block" }}>
                                                            {value}
                                                        </span>
                                                        ))}
                                                </td>
                                                <td>
                                                    {(item.Between20_50
                                                            .split(",")                           
                                                              ).map((value, index) => (
                                                        <span key={index} style={{ display: "block" }}>
                                                            {value}
                                                        </span>
                                                        ))}
                                                </td>
                                                <td>
                                                    {(item.Below0_19
                                                            .split(",")                           
                                                            ).map((value, index) => (
                                                        <span key={index} style={{ display: "block" }}>
                                                            {value}
                                                        </span>
                                                        ))}
                                                </td>
                                            </tr>
                                        ))} */}
                                         
                                        {selectedProjectsBrandsData.map((project) => {
                                            const uniqueSections = [...new Set(project.normalized_data.map(item => item.sectionname))];

                                            return (
                                                <React.Fragment key={project.project_id}>
                                                {uniqueSections.map(sectionName => {
                                                    const platformsInSection = project.normalized_data.filter(item => item.sectionname === sectionName);
                                                    const uniquePlatforms = [...new Set(platformsInSection.map(item => item.platformname))];

                                                    return (
                                                    <React.Fragment key={`${project.project_id}-${sectionName}`}>
                                                        <tr>
                                                            <td>{project.project_id}</td>
                                                            <td>{project.project_name}</td>
                                                            <td onClick={() => handleRowClick(project.project_id, sectionName)} style={{ cursor: 'pointer' }}>{sectionName} <IoMdAdd /></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                        {uniquePlatforms.map(platformName => {
                                                        const metricsInPlatform = platformsInSection.filter(item => item.platformname === platformName);

                                                        return (
                                                            <React.Fragment key={`${project.project_id}-${sectionName}-${platformName}`}>
                                                            {expandedRows[project.project_id]?.[sectionName] && (
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>{sectionName}</td>
                                                                    <td onClick={() => handleRowClick(project.project_id, sectionName, platformName)} style={{ cursor: 'pointer' }}>{platformName} <IoMdAdd /></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
                                                            )}
                                                            {expandedRows[project.project_id]?.[sectionName]?.[platformName] && metricsInPlatform.map(item => (
                                                                <tr key={`${project.project_id}-${sectionName}-${platformName}-${item.metricname}`}>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>{sectionName}</td>
                                                                    <td>{platformName}</td>
                                                                    <td>{item.metricname}</td>
                                                                    <td>{item.Above81_100}</td>
                                                                    <td>{item.Between61_80}</td>
                                                                    <td>{item.Between51_60}</td>
                                                                    <td>{item.Between20_50}</td>
                                                                    <td>{item.Below0_19}</td>
                                                                </tr>
                                                            ))}
                                                            </React.Fragment>
                                                        );
                                                        })}
                                                    </React.Fragment>
                                                    );
                                                })}
                                                </React.Fragment>
                                            );
                                            })
                                        }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            ),
        },
    ];
    console.log('allProjectsData.length', allProjectsData.length);
    return (
        <div className="row">
            <div className="col-12">
                <div className="score-table-percentile">
                    <Table responsive striped bordered>
                        <thead>
                            <tr>
                                <th>Overall Details</th>
                                {selectedProjectsList?.map((item, index) => (
                                    <th key={index}>{item.project_name}</th>
                                ))}

                            </tr>
                        </thead>
                        <tbody>
                             
                            <tr>
                                <td>Total Metrics</td>
                                {selectedProjectsList?.map((item, index) => (
                                    <td key={index}>{Array.isArray(item.metricNames) ? item.metricNames.length : 0}</td>
                                ))}
                                
                            </tr>

                            <tr>
                                <td>Categories</td>
                                {selectedProjectsList?.map((item, index) => (
                                    <td key={index}>
                                        {Array.isArray(item.categoryNames)
                                            ? item.categoryNames.join(", ")
                                            : item.categoryNames || "No Categories"}
                                    </td>
                                ))}
                            </tr>
                            
                            <tr>
                                <td>Total Brands  </td>
                                {selectedProjectsList?.map((item, index) => (
                                    <td key={index}>{Array.isArray(item.brandNames) ? item.brandNames.length : 0}</td>
                                ))}
                                
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="summary-container">
                    <span className="section-title mb-3"> Brand Performances</span>
                    <TabComponent
                        isBenchmarkDataSaved={true}
                        tabs={tabsSummary}
                        className="custom-tabs performance-tab"
                    />
                </div>
            </div>
        </div>
    );
}