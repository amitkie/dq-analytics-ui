import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import ButtonComponent from "../../common/button/button";
import TabComponent from "../../components/tabs/TabComponent";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
import { FcExpand } from "react-icons/fc";
import { FcCollapse } from "react-icons/fc";
import "../../App.scss";
import "./Insights.scss";



export default function BrandView({ selectedProjectsList, selectedProjectsData }) {
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [showBrands, setShowBrands] = useState([]);
    const [showSelectedBrands, setShowSelectedBrands] = useState([]);
    const [showMetrics, setShowMetrics] = useState([]);
    const [showSelectedMetrics, setShowSelectedMetrics] = useState([]);
    const [showTable, setShowTable] = useState(false)

    const handleToggleShow = () => {
        setShowTable(!showTable);
    }
    const handleBrandChange = (options) => {
        console.log(options, 'options');
        setShowSelectedBrands(options);

        const selectedBrandNames = options.map((option) => option.label); 

        const filteredData = Object.values(selectedProjectsData)
            .flat()
            .filter((project) => selectedBrandNames.includes(project.Brand_Name));

        setFilteredProjects(filteredData); 
        console.log(filteredData, 'Filtered Projects');
    };


    const allProjectsData = filteredProjects.length > 0 ? filteredProjects : Object.values(selectedProjectsData).flat();

    console.log('selectedProjectsData brandView', selectedProjectsData);

    function getUniqueBrands(response) {
        const allBrandNames = [];

        for (const projectId in response) {
            const brands = response[projectId].map((project) => project.Brand_Name);
            allBrandNames.push(...brands);
        }

        const uniqueBrands = [...new Set(allBrandNames)];

        return uniqueBrands.map((brand, index) => ({
            value: index + 1,
            label: brand,
        }));
    }

    useEffect(() => {
        const allBrands = getUniqueBrands(selectedProjectsData);
        console.log(allBrands, ';;;;;;;;;;;');
        if (allBrands.length > 0) {
            setShowBrands(allBrands);
        }
    }, [selectedProjectsData]);

    const tabsScoreLevel = [
        {
            label: "Overall DQ Score",
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
                                                .filter((item) => item.Overall_Final_Score > 81)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
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
                                                .filter((item) => item.Overall_Final_Score > 61 && item.Overall_Final_Score < 80)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
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
                                                .filter((item) => item.Overall_Final_Score > 51 && item.Overall_Final_Score < 60)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
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
                                                .filter((item) => item.Overall_Final_Score > 20 && item.Overall_Final_Score < 50)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
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
                                                .filter((item) => item.Overall_Final_Score < 19)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Overall_Final_Score).toFixed(2)}
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
                                                .filter((item) => item.Marketplace > 81)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
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
                                                .filter((item) => item.Marketplace > 61 && item.Marketplace < 80)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
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
                                                .filter((item) => item.Marketplace > 51 && item.Marketplace < 60)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
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
                                                .filter((item) => item.Marketplace > 20 && item.Marketplace < 50)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
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
                                                .filter((item) => item.Marketplace < 19)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Marketplace).toFixed(2)}
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
                                                .filter((item) => item.Socialwatch > 81)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
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
                                                .filter((item) => item.Socialwatch > 61 && item.Socialwatch < 80)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
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
                                                .filter((item) => item.Socialwatch > 51 && item.Socialwatch < 60)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
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
                                                .filter((item) => item.Socialwatch > 20 && item.Socialwatch < 50)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
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
                                                .filter((item) => item.Socialwatch < 19)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {Number(item.Socialwatch).toFixed(2)}
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
                                                .filter((item) => item['Digital Spends'] > 81)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
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
                                                .filter((item) => item['Digital Spends'] > 61 && item['Digital Spends'] < 80)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
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
                                                .filter((item) => item['Digital Spends'] > 51 && item['Digital Spends'] < 60)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
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
                                                .filter((item) => item['Digital Spends'] > 20 && item['Digital Spends'] < 50)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
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
                                                .filter((item) => item['Digital Spends'] < 19)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Digital Spends'].toFixed(2)}
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
                                                .filter((item) => item['Organic Performance'] > 81)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
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
                                                .filter((item) => item['Organic Performance'] > 61 && item['Organic Performance'] < 80)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
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
                                                .filter((item) => item['Organic Performance'] > 51 && item['Organic Performance'] < 60)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
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
                                                .filter((item) => item['Organic Performance'] > 20 && item['Organic Performance'] < 50)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
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
                                                .filter((item) => item['Organic Performance'] < 19)
                                                .map((item, index, filteredArray) => (
                                                    <span key={index} className="project-scores">
                                                        {item.Brand_Name}, {item['Organic Performance'].toFixed(2)}
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
                                    options={showBrands}
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
                                            <th> Common metrics name</th>
                                            <th>Weight in Project 1</th>
                                            <th>Weight in Project 2</th>
                                            <th>Weight in Project 3</th>
                                            <th>Weight in Project 4</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Average Scores Row */}
                                        <tr>
                                            <td>Ratings</td>
                                            <td>4</td>
                                            <td>1</td>
                                            <td>3</td>
                                            <td>4</td>
                                        </tr>

                                        {/* 50th Percentile Row */}
                                        <tr>
                                            <td>reviews</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>2</td>
                                            <td>1</td>
                                        </tr>

                                        {/* 75th Percentile Row */}
                                        <tr>
                                            <td>net sentiment</td>
                                            <td>5</td>
                                            <td>4</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            )}
                        </div>
                        <div className="table-extend">
                            <h4 className="table-title-normal">Normalized Values View</h4>
                            <Table responsive striped bordered>
                                <thead>
                                    <tr>
                                        <th> Common metrics name</th>
                                        <th>Above 80 (81 -100)</th>
                                        <th>Between 80 to 60 (61-80)</th>
                                        <th>Between 60 to 50 (51-60)</th>
                                        <th>Between 50 to 20 (20-50)</th>
                                        <th>Below 20 (0-19)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Average Scores Row */}
                                    <tr>
                                        <td>metric name 1</td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>metric name 2</td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>metric name 3</td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                        <td>
                                            project 1 brands names with scores
                                            project 2 brands names with scores
                                            project 3 brands names with scores
                                            project 4 brands names with scores
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="row">
            {allProjectsData.length > 0 ? (<div className="col-12">
                <div className="score-table-percentile">
                    <Table responsive striped bordered>
                        <thead>
                            <tr>
                                <th>Overall Details</th>
                                {selectedProjectsList.map((item, index) => (<th key={index}>{item.project_name}</th>))}

                            </tr>
                        </thead>
                        <tbody>
                            {/* Average Scores Row */}
                            <tr>
                                <td>Total Metrics</td>
                                {selectedProjectsList.map((item, index) => (<td key={index}>{item.metricNames.length}</td>))}
                            </tr>

                            {/* 50th Percentile Row */}
                            <tr>
                                <td>Categories</td>
                                {selectedProjectsList.map((item, index) => (
                                    <td key={index}>
                                        {Array.isArray(item.categoryNames)
                                            ? item.categoryNames.join(", ")
                                            : item.categoryNames || "No Categories"}
                                    </td>
                                ))}
                            </tr>
                            {/* 75th Percentile Row */}
                            <tr>
                                <td>Total Brands  </td>
                                {selectedProjectsList.map((item, index) => (<td key={index}>{item.brandNames.length}</td>))}
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
            </div>) : (
                <div>Please Select Project to display this view</div>
            )}
        </div>
    );
}