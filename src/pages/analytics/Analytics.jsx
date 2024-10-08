import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SideBar from "../../components/sidebar/SideBar";
import TableComponent from "../../components/tableComponent/TableComponent";
import TabComponent from "../../components/tabs/TabComponent";
import GraphicalView from "../../components/GraphicalView/GraphicalView";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import ButtonComponent from "../../common/button/button";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import SuperThemes from "../../components/SuperThemes/SuperThemes";
import { getData } from "../../services/q3";
import { getAMData } from "../../services/Quarter-actual-metric-data";
import { getMetricData } from "../../services/metrics";
import { getNormalizedData } from "../../services/quarter-metrics-normalised-data";
import { getSection } from "../../services/section-platform-metrics";
import {
  getProjectDetailsByProjectId,
  getBenchamarkValues,
  saveMetricsOfProject,
  getNormalizedValues,
  getDQScore,
} from "../../services/projectService";
import {
  getAllBrands,
  getAllCategories,
  getAllPlatforms,
  getAllMetrics,
  getAllSections,
  getAllFrequencies,
  getAllCategoriesByBrandIds,
  getAllMetricsByPlatformId,
} from "../../services/userService";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
import { createProject } from "../../services/projectService";
import "./analytics.scss";
import AnalyticsTable from "./AnalyticsTable";
import KPITable from "./KPITable";
import { useParams } from "react-router-dom";
import { FaInfo } from "react-icons/fa";



export default function Analytics() {
  const [projectIds, setProjectIds] = useState(1);
  const [projectDetails, setProjectDetails] = useState({});
  const [metrics, setMetrics] = useState([]);
  const data = getData();
  const AMData = getAMData();
  const metricData = getMetricData();
  const normalizedData = getNormalizedData();
  const { projectId } = useParams();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dqScoreLoading, setDQScoreLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checkStates, setCheckStates] = useState({});
  const [weights, setWeights] = useState({});
  const [totalWeights, setTotalWeights] = useState(100);

  const { userInfo, projectInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [normalizedValue, setNormalizedValue] = useState([]);
  const [uniqueComparisonBrandName, setUniqueComparisonBrandName] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  const [dqScoreValue, setDQScoreValue] = useState([]);

  const [filterCategories, setFilterCategories] = useState([]);
  const [selectedFilterCategories, setSelectedFilterCategories] = useState([]);

  const [filterPlatforms, setFilterPlatforms] = useState([]);
  const [selectedfilterPlatforms, setSelectedFilterPlatforms] = useState([]);

  const [filterSection, setFilterSection] = useState([]);
  const [selectedFilterSection, setSelectedFilterSection] = useState([]);

  const [filterMetrics, setFilterMetrics] = useState([]);
  const [selectedFilterMetrics, setSelectedFilterMetrics] = useState([]);


  const columns = [
    {
      header: "Quarter",
      accessor: "Quarter",
    },
    { header: "Category", accessor: "Category" },
    { header: "Brands", accessor: "Brands" },
    {
      header: "Digital quotient for brand (DQ)",
      accessor: "Digital quotient for brand (DQ)",
    },
    { header: "Ecom DQ Score", accessor: "Ecom DQ Score" },
    { header: "Social DQ Score", accessor: "Social DQ Score" },
    { header: "Paid Marketing DQ Score", accessor: "Paid Marketing DQ Score" },
    { header: "Organic DQ", accessor: "Organic DQ" },
  ];

  const columnsMetrics = Object.keys(AMData[0] || []).map((key) => ({
    Header: key,
    accessor: key,
  }));
  const keys = Array.from(new Set(normalizedValue.flatMap(Object.keys)));
  const keysToDisplay = keys?.slice(2);

  function getColorScore(value, thresholds) {
    // thresholds is expected to be an array with three elements: [redThreshold, yellowThreshold, greenThreshold]
    if (typeof value === "") {
      return <span style={{ color: "#252627" }}>{value}</span>;
    } else if (value > thresholds[2]) {
      return <span style={{ color: "#339900" }}>{value}</span>;
    } else if (value > thresholds[1] && value < thresholds[2]) {
      return <span style={{ color: "#ed8b00" }}>{value}</span>;
    } else {
      return <span style={{ color: "#cc3201" }}>{value}</span>;
    }
  }

  const getColor = (section) => {
    switch (section) {
      case "Ecom":
        return "#2A61DD";
      case "Paid":
        return "##279E70";
      case "Social":
        return "#FF9800";
      case "Brand Perf":
        return "#C82519";
      default:
        return "#000000";
    }
  };
  // Ecom : [ "metrics1","metrcs2"
  // ] 
  // Order of KPI: Ecom > Social > Paid > Brand Perf
  // Order of Comparison: View Ecom > Social > Paid > Brand Perf
  const section = getSection();
  let colorCode;
  if (section === "Ecom") {
    colorCode = "blue-color";
  } else if (section === "Paid") {
    colorCode = "purple-color";
  } else if (section === "Brand Perf") {
    colorCode = "orange-color";
  } else if (section === "Social") {
    colorCode = "green-color";
  } else {
    colorCode = "";
  }

  // const handleCheckboxChange = async (event, metric, type) => {
  //   const analysis_type =
  //     type == "overall" ? "Overall" : projectDetails?.categories;
  //   const reqPayload = {
  //     platform: metric?.platform?.name,
  //     // platform: metric?.platform?.name,
  //     metrics: metric?.metric_name,
  //     brand: projectDetails?.brands,
  //     // brand:"PureSense",
  //     analysis_type: analysis_type,
  //     start_date: projectDetails?.start_date,
  //     end_date: projectDetails?.end_date,
  //   };

  //   try {
  //     const benchmarks = await getBenchamarkValues(reqPayload);
  //     setMetrics((prev) => {
  //       return prev.map((ele) => {
  //         if (type === "overall") {
  //           if (ele.metric_id === metric.metric_id) {
  //             ele.isOverallChecked = !ele.isOverallChecked;
  //             ele.isCategoryBasedChecked = false;
  //             ele.benchmark = benchmarks.results;
  //           }
  //         }
  //         if (type === "categoryBased") {
  //           if (ele.metric_id === metric.metric_id) {
  //             ele.isCategoryBasedChecked = !ele.isCategoryBasedChecked;
  //             ele.isOverallChecked = false;
  //             ele.benchmark = benchmarks.results;
  //           }
  //         }
  //         return ele;
  //       });
  //     });
  //   } catch (error) {
  //     console.error("Error in fetching benchmark values:", error);
  //   }
  // };

  // const handleSelectAll = async (e, type) => {
  //   const isChecked = e.target.checked;

  //   const updatedMetrics = await Promise.all(
  //     metrics?.map(async (metric) => {
  //       const analysis_type =
  //         type === "overall" ? "Overall" : projectDetails?.categories;
  //       const reqPayload = {
  //         platform: metric?.platform?.name,
  //         metrics: metric?.metric_name,
  //         brand: projectDetails?.brands,
  //         analysis_type: analysis_type,
  //         start_date: projectDetails?.start_date,
  //         end_date: projectDetails?.end_date,
  //       };

  //       try {
  //         const benchmarks = await getBenchamarkValues(reqPayload);

  //         // Update the metric state based on type (overall or categoryBased)
  //         if (type === "overall") {
  //           return {
  //             ...metric,
  //             isOverallChecked: isChecked,
  //             isCategoryBasedChecked: !isChecked, // Uncheck the category-based checkbox
  //             benchmark: benchmarks.results,
  //           };
  //         } else if (type === "categoryBased") {
  //           return {
  //             ...metric,
  //             isCategoryBasedChecked: isChecked,
  //             isOverallChecked: !isChecked, // Uncheck the overall checkbox
  //             benchmark: benchmarks.results,
  //           };
  //         }
  //       } catch (error) {
  //         console.error("Error in fetching benchmark values:", error);
  //       }
  //       return metric;
  //     })
  //   );
  //   setMetrics(updatedMetrics);
  // };

  // Edge Case Handling
  const handleCheckboxChange = async (event, metric, type) => {
    const isChecked = event.target.checked;
    setMetrics((prev) =>
      prev.map((ele) =>
        ele?.metric_id === metric?.metric_id ? { ...ele, isLoading: true } : ele
      )
    );
    if (isChecked) {
      // If the checkbox is checked, make the API call
      const analysis_type =
        type === "overall" ? "Overall" : projectDetails?.categories;
      const reqPayload = {
        platform: metric?.platform?.name,
        metrics: metric?.metric_name,
        brand: projectDetails?.brands,
        analysis_type: analysis_type,
        start_date: projectDetails?.start_date,
        end_date: projectDetails?.end_date,
      };

      try {
        const benchmarks = await getBenchamarkValues(reqPayload);

        setMetrics((prev) =>
          prev.map((ele) => {
            if (ele?.metric_id === metric?.metric_id) {
              if (type === "overall") {
                return {
                  ...ele,
                  isOverallChecked: true,
                  isCategoryBasedChecked: false,
                  benchmark: benchmarks.results,
                  isLoading: false,
                };
              } else if (type === "categoryBased") {
                return {
                  ...ele,
                  isCategoryBasedChecked: true,
                  isOverallChecked: false,
                  benchmark: benchmarks.results,
                  isLoading: false,
                };
              }
            }
            return ele;
          })
        );
      } catch (error) {
        console.error("Error in fetching benchmark values:", error);
        setMetrics((prev) =>
          prev.map((ele) =>
            ele.metric_id === metric.metric_id ? { ...ele, isLoading: false } : ele
          )
        );
      }
    } else {
      // If the checkbox is unchecked, just reset the values
      setMetrics((prev) =>
        prev.map((ele) => {
          if (ele.metric_id === metric.metric_id) {
            return {
              ...ele,
              isOverallChecked: type === "overall" ? false : ele.isOverallChecked,
              isCategoryBasedChecked:
                type === "categoryBased" ? false : ele.isCategoryBasedChecked,
              benchmark: null,
              isLoading: false,
            };
          }
          return ele;
        })
      );
    }
  };

  const handleSelectAll = async (e, type) => {
    const isChecked = e.target.checked;
    
    const batchSize = 10;
    let updatedMetrics = [];
  
    // Function to process metrics in batches
    const processBatch = async (batch) => {
      const results = await Promise.all(
        batch.map(async (metric) => {
          if (isChecked) {
            const analysis_type =
              type === "overall" ? "Overall" : projectDetails?.categories;
            const reqPayload = {
              platform: metric?.platform?.name,
              metrics: metric?.metric_name,
              brand: projectDetails?.brands,
              analysis_type: analysis_type,
              start_date: projectDetails?.start_date,
              end_date: projectDetails?.end_date,
            };
  
            try {
              const benchmarks = await getBenchamarkValues(reqPayload);
              if (type === "overall") {
                return {
                  ...metric,
                  isOverallChecked: true,
                  isCategoryBasedChecked: false,
                  benchmark: benchmarks.results,
                  error: false, // No error on success
                };
              } else if (type === "categoryBased") {
                return {
                  ...metric,
                  isCategoryBasedChecked: true,
                  isOverallChecked: false,
                  benchmark: benchmarks.results,
                  error: false, // No error on success
                };
              }
            } catch (error) {
              console.error("Error in fetching benchmark values:", error);
              // Return metric with an error flag to indicate failure
              return {
                ...metric,
                error: true, // Mark error as true
              };
            }
          } else {
            return {
              ...metric,
              isOverallChecked: type === "overall" ? false : metric.isOverallChecked,
              isCategoryBasedChecked: type === "categoryBased" ? false : metric.isCategoryBasedChecked,
              benchmark: null,
              isLoading: false,
              error: false, // Reset error on unchecked
            };
          }
        })
      );
      return results;
    };
  
    // Process metrics in chunks of 10
    for (let i = 0; i < metrics.length; i += batchSize) {
      const batch = metrics.slice(i, i + batchSize);
      const batchResults = await processBatch(batch);
      updatedMetrics = [...updatedMetrics, ...batchResults];
    }
  
    setMetrics(updatedMetrics);
  };
  

  // const handleSelectAll = async (e, type) => {
  //   const isChecked = e.target.checked;
  
  //   const batchSize = 10; // Set the batch size to 10
  //   let updatedMetrics = [];
  
  //   // Function to process metrics in batches
  //   const processBatch = async (batch) => {
  //     const results = await Promise.all(
  //       batch.map(async (metric) => {
  //         if (isChecked) {
  //           const analysis_type =
  //             type === "overall" ? "Overall" : projectDetails?.categories;
  //           const reqPayload = {
  //             platform: metric?.platform?.name,
  //             metrics: metric?.metric_name,
  //             brand: projectDetails?.brands,
  //             analysis_type: analysis_type,
  //             start_date: projectDetails?.start_date,
  //             end_date: projectDetails?.end_date,
  //           };
  
  //           try {
  //             const benchmarks = await getBenchamarkValues(reqPayload);
  
  //             if (type === "overall") {
  //               return {
  //                 ...metric,
  //                 isOverallChecked: true,
  //                 isCategoryBasedChecked: false,
  //                 benchmark: benchmarks.results,
  //               };
  //             } else if (type === "categoryBased") {
  //               return {
  //                 ...metric,
  //                 isCategoryBasedChecked: true,
  //                 isOverallChecked: false,
  //                 benchmark: benchmarks.results,
  //                 isLoading: false,
  //               };
  //             }
  //           } catch (error) {
  //             console.error("Error in fetching benchmark values:", error);
  //           }
  //         } else {
  //           return {
  //             ...metric,
  //             isOverallChecked: type === "overall" ? false : metric.isOverallChecked,
  //             isCategoryBasedChecked:
  //               type === "categoryBased" ? false : metric.isCategoryBasedChecked,
  //             benchmark: null,
  //             isLoading: false,
  //           };
  //         }
  //       })
  //     );
  //     return results;
  //   };
  
  //   // Process metrics in chunks of 10
  //   for (let i = 0; i < metrics.length; i += batchSize) {
  //     const batch = metrics.slice(i, i + batchSize);
  //     const batchResults = await processBatch(batch);
  //     updatedMetrics = [...updatedMetrics, ...batchResults];
  //   }
  
  //   setMetrics(updatedMetrics);
  // };
  




  const handleWeightChange = (metricId, value) => {

    const newWeights = { ...weights, [metricId]: Number(value) };

    const totalWeight = Object.values(newWeights).reduce((acc, curr) => acc + curr, 0);

    if (totalWeight > 100) {
      alert('Total weights exceed 100. Please adjust the values.');

      newWeights[metricId] = weights[metricId];

      const updatedTotalWeight = Object.values(newWeights).reduce((acc, curr) => acc + curr, 0);

      setTotalWeights(updatedTotalWeight);
      setWeights(newWeights);
      return;
    }

    setWeights(newWeights);
    setTotalWeights(totalWeight);
  };

  const validateTotalWeights = (newWeights) => {
    const totalWeight = Object.values(newWeights).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setTotalWeights(totalWeight)
    if (totalWeight > 100) {
      alert('Total weights exceed 100. Please adjust the values.');
    }
  };

  async function fetchProjectDetails(id) {
    try {
      const response = await getProjectDetailsByProjectId(id);
      setProjectDetails(response?.project);
      setMetrics(() => {
        if (response?.project?.metrics && response?.project?.metrics?.length > 0) {

          const initialWeight = 100 / response?.project?.metrics?.length;
          const initialWeights = response?.project?.metrics?.reduce((acc, item) => {
            acc[item.metric_id] = initialWeight;
            return acc;
          }, {});
          setWeights(initialWeights);
        }
        return response?.project?.metrics?.map((ele) => {
          ele.isOverallChecked = false;
          ele.isCategoryBasedChecked = false;
          return ele;
        });
      });
      setCheckStates(
        response?.project?.metrics?.reduce((acc, item) => {
          acc[item.id] = { overall: false, categoryBased: false };
          return acc;
        }, {}) || {}
      );
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  }

  async function fetchComparedValue(id) {
    const project_id = id;

    const requestPayload = {
      "project_ids": [project_id]
    };

    try {
      const compareNormalizeValue = await getNormalizedValues(requestPayload);
      console.log(compareNormalizeValue, 'compareNormalizeValue')
      if (compareNormalizeValue) {

        setComparisonData(compareNormalizeValue)
        const uniqueData = transformComparisonViewApiData(compareNormalizeValue);
        console.log('uniqueData',uniqueData )
        const uniqueComparisonBrandNames = Array.from(new Set(compareNormalizeValue.map(item => item.brandName)));
        setUniqueComparisonBrandName(uniqueComparisonBrandNames);
        setNormalizedValue(uniqueData);
      }

    } catch (error) {
      console.error("Error in Fetching Data:", error);
    }
  }

  const transformComparisonViewApiData = (data) => {

      const transformedData = {};
  
      data?.forEach(item => {
          const {sectionName, platformName, metricName, brandName, normalized } = item;
  

        // Initialize section level
        if (!transformedData[sectionName]) {
            transformedData[sectionName] = {};
        }

        // Initialize platform level under the section
        if (!transformedData[sectionName][platformName]) {
            transformedData[sectionName][platformName] = {};
        }

        // Initialize metric level under the platform
        if (!transformedData[sectionName][platformName][metricName]) {
            transformedData[sectionName][platformName][metricName] = {
                platformName: platformName,
                metricName: metricName,
                brands: {}
            };
        }
  
          transformedData[sectionName][platformName][metricName].brands[brandName] = normalized;
      });
  
      const result = [];
      // Iterate over sections, platforms, and metrics to build the final result
        Object.keys(transformedData).forEach(section => {
          Object.keys(transformedData[section]).forEach(platform => {
              Object.keys(transformedData[section][platform]).forEach(metric => {
                  const row = {
                      sectionName: section,
                      platformName: platform,
                      metricName: metric,
                      ...transformedData[section][platform][metric].brands
                  };
                  result.push(row);
              });
          });
      });
  
      return result;
  };
  

  async function fetchDQScoreValue(id) {
    const project_id = id;

    const requestPayload = {
      "project_id": project_id
    };

    try {
      const dqScoreValueResponse = await getDQScore(requestPayload);
      if(dqScoreValueResponse){
        console.log("DQ SCORE______", dqScoreValueResponse);
        setDQScoreLoading(false);
        setDQScoreValue(dqScoreValueResponse?.data);
      }
    } catch (error) {
      setDQScoreLoading(false);
      console.error("Error in Fetching Data:", error);
    }
  }

  useEffect(() => {

    if (projectId) {
      setProjectIds(projectId);
      fetchProjectDetails(projectId);

    }

    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setFilterCategories(
          categoriesData.data.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))
        );

        const platformsData = await getAllPlatforms();
        setFilterPlatforms(
          platformsData.data.map((platform) => ({
            value: platform.id,
            label: platform.name,
          }))
        );
        // const frequenciesData = await getAllFrequencies();
        // setFrequencies(
        //   frequenciesData.data.map((freq) => ({
        //     value: freq.id,
        //     label: freq.name,
        //   }))
        // );
        // Change the Name of metrics it is already in use
        const metricsData = await getAllMetrics();
        setFilterMetrics(
          metricsData.data.map((metric) => ({
            value: metric.id,
            label: metric.name,
          }))
        );
        //get all sections
        const sectionsData = await getAllSections();
        // Create a Map to store unique names with their corresponding section_id
        const uniqueSectionsMap = new Map();

        // Loop through the sectionsData to populate the Map
        sectionsData.data.forEach((metric) => {
          if (!uniqueSectionsMap.has(metric.name)) {
            uniqueSectionsMap.set(metric.name, metric.section_id);
          }
        });

        // Convert the Map to an array of unique sections and set the state
        setFilterSection(
          Array.from(uniqueSectionsMap).map(([name, section_id]) => ({
            value: section_id,
            label: name,
          }))
        );
        // setFilterSection(
        //   sectionsData.data.map((metric) => ({
        //     value: metric.section_id,
        //     label: metric.name,
        //   }))
        // );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [projectId]);

  useEffect(() => {
    if (projectDetails?.is_benchmark_saved) {
      fetchComparedValue(projectId);
      fetchDQScoreValue(projectId);
      setDQScoreLoading(true)
    }
  }, [projectDetails?.is_benchmark_saved])

  const handleFilterCategory = async (selectedOptions) => {
    setSelectedFilterCategories(selectedOptions);
    if (selectedOptions.length > 0) {
      try {
        const categoryIds = selectedOptions.map((option) => option.value);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  };

  const handleSelectedPlatforms = async (selectedOptions) => {
    setSelectedFilterPlatforms(selectedOptions);
    if (selectedOptions.length > 0) {
      try {
        const platformsFiltered = selectedOptions.map((option) => option.value)
      }catch (error) {
        console.error("Error fetching platforms:", error);
      }
    }
  };

  const handleSelectedSection = async (selectedOptions) => {
    setSelectedFilterSection(selectedOptions);
    if (selectedOptions.length > 0) {
      try {
        const sectionFiltered = selectedOptions.map((option) => option.value)
      }catch (error) {
        console.error("Error fetching platforms:", error);
      }
    }
  };

  const handleSelectedMetrics = async (selectedOptions) => {
    setSelectedFilterMetrics(selectedOptions);
    if (selectedOptions.length > 0) {
      try {
        const metricsFiltered = selectedOptions.map((option) => option.value)
      }catch (error) {
        console.error("Error fetching platforms:", error);
      }
    }
  };


  const saveWeights = async () => {
    const saveMetricsPayload = generateApiPayload(metrics);
    console.log('saveMetricsPayload', saveMetricsPayload)

    try {
      const response = await saveMetricsOfProject(saveMetricsPayload);
      if (response) {
        if (response.status == 'success') {
          // dispatch(showAlert({ variant: 'success', message: 'Weights saved successfully' }));
          alert('Weights saved successfully!');
          fetchProjectDetails(projectId);
          fetchComparedValue(projectId);
          fetchDQScoreValue(projectId);
          console.log("saveWeights", response)
        }
      }

    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Project Benchmark has already been saved, you cannot create another instance.') {
        alert('Error: Project Benchmark has already been added, you cannot create another instance.');
      } else {
        alert('An error occurred!');
      }
    }

  };

  const generateApiPayload = (metrics) => {
    const project_id = projectId;   // Example project ID

    return metrics?.map(metric => {
      const categoryIds = metric?.categories?.map(category => category?.id) || [];

      // Iterate over categories and match the benchmark data
      const benchmarkData = metric?.categories?.map(category => {
        // Find the benchmark that matches the current category
        const matchedBenchmark = metric?.benchmark?.find(bm =>
          bm?.categories?.includes(category?.name) || bm?.category === "Overall"
        ) || {};  // Handle missing benchmark

        console.log(matchedBenchmark, 'matchedBenchmark 1')
        console.log(matchedBenchmark?.actualValue?.[metric?.brands?.[0]?.name], 'matchedBenchmark 2')
        console.log(matchedBenchmark?.actualValue, 'matchedBenchmark 3')

        // Check if the metric is marked as "Overall" or "Category Based"
        if (metric?.isOverallChecked) {
          return {
            categoryId: category?.id,
            categoryName: category?.name,
            sectionName: metric?.section?.name,
            sectionId: metric?.section?.id,
            percentile: matchedBenchmark?.percentile,
            overallValue: matchedBenchmark?.value,
            actualValue: matchedBenchmark?.actualValue,
          };
        } else {
          return {
            categoryId: category?.id,
            categoryName: category?.name,
            sectionName: metric?.section?.name,
            sectionId: metric?.section?.id,
            percentile: matchedBenchmark?.percentile,
            benchmarkValue: matchedBenchmark?.value,
            actualValue: matchedBenchmark?.actualValue,
          };
        }
      });


      if (benchmarkData) {
        return {
          project_id: project_id,
          sectionId: metric?.section?.id || null,
          platformId: metric?.platform?.id || null,
          isOverall: metric?.isOverallChecked || false,
          isCategory: metric?.isCategoryBasedChecked || false,
          metricId: metric?.metric_id || null,
          weights: metric?.weights || 0,
          categoryIds: categoryIds,
          brandIds: metric?.brands?.map(brand => brand?.id) || [],
          benchmarks: JSON.stringify(benchmarkData)
        };
      }
    });
  };

  const checkAllMetricsCheckboxSelected = () => {
    console.log(metrics, 'cmmmcmmcmmcmcmmcmmc')
    if (metrics.length > 0) {
      return metrics.every(item => item.isOverallChecked || item.isCategoryBasedChecked);
    }
    return false;
  };

  const tabs = [
    {
      label: "Weights and Benchmark",
      content: (
        <div>
          <AnalyticsTable
            projectDetails={projectDetails}
            checkStates={checkStates}
            metrics={metrics}
            weights={weights}
            totalWeights={totalWeights}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            handleWeightChange={handleWeightChange}
            isBenchmarkSaved={projectDetails?.is_benchmark_saved}
          />
          <div className="row">
            <div className="col12">
              <div className="save-table-btn">
                <ButtonComponent
                  btnClass={"btn-primary"}
                  btnName={"Save Weights"}
                  disabled={projectDetails?.is_benchmark_saved || !checkAllMetricsCheckboxSelected()}
                  onClick={saveWeights}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      label: "DQ Scores",
      disabled: "disabled",
      content: (
        <div>
          <ScoreCard dqScoreValue={dqScoreValue} dqScoreLoading={dqScoreLoading}/>
          {/* <ScoreCard dqScoreValue={dqScoreValue.filter((item) => item.includes(handleCategoryChange))} /> */}
        </div>
      ),
    },
    {
      label: "Graphical view",
      content: (
        <div>
          <GraphicalView />
        </div>
      ),
    },
    {
      label: "KPI Scores",
      content: (
        <KPITable
          metrics={metrics}
          projectDetails={projectDetails}
          getColor={getColor}
          getColorScore={getColorScore}
        />
       
      ),
    },
    {
      label: "Comparison View",
      content: (
        <div>
          <div className="filter-options mb-2">
            <select name="Brands" className="Select-input">
              <option value="himalaya">Himalaya</option>
              <option value="lux">Lux</option>
              <option value="palmolive">Palmolive</option>
              <option value="parachute">Parachute</option>
            </select>
            <select name="category" className="Select-input">
              <option value="all">All</option>
              <option value="beauty">Beauty</option>
              <option value="haircare">Hair care</option>
              <option value="foods">Foods</option>
              <option value="male-grooming">Male Grooming</option>
            </select>
          </div>
          <ul class="legend">
            <li> Ecom</li>
            <li> Social</li>
            <li> Paid</li>
            <li> Brand Pref</li>
          </ul>
          {normalizedValue?.length > 0 ? (
          <Table responsive striped bordered className="insights-table">
            <thead>
              <tr>
                <th>Section</th>
                <th>Platform</th>
                <th>Metric</th>
                  {uniqueComparisonBrandName?.sort((a, b) => a.localeCompare(b)).map(brand => (
                      <th key={brand}>{brand}</th>
                  ))}
                  {/* {uniqueComparisonBrandName?.map(brand => (
                    <th key={brand}>{brand}</th>
                  ))} */}
              </tr>
            </thead>
            <tbody>
                {normalizedValue?.map((row, index) => (
                    <tr key={index}>
                        <td><span
                          style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: getColor(row?.sectionName),
                            marginRight: '5px',
                          }}
                        
                        ></span>{row?.sectionName}</td>
                        <td>{row?.platformName}</td>
                        <td><div className="metric-name">{row?.metricName} <FaInfo className="info-icon" /></div></td>
                        {uniqueComparisonBrandName?.map(brand => (
                            <td key={brand}>{row[brand] || "-"}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
          </Table>
          ) : (
            <div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading...</span>
            </div>
          )}




        </div>
      ),
    },

    {
      label: "Super Themes",
      disabled: "disabled",
      content: (
        <div>
          <SuperThemes metrics={metrics} normalizedDQScoreValue={normalizedValue}/>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="col-12">
        <div className="workspace-container">
          <h2 className="page-title">Analytics</h2>

          <div className="row mb-3">
            <div className="col-12">
              <div className="analytics-filter">
                <div className="project-details">
                  <p className="mb-0">
                    Project Name:
                    <strong>{projectDetails?.project_name}</strong>
                  </p>
                </div>

                <div className="export-btn-container gap-3">
                  <MultiSelectDropdown
                    options={filterCategories}
                    selectedValues={selectedFilterCategories}
                    onChange={handleFilterCategory}
                    placeholder="Select Categories"
                  />
                
                  <div className="export-btn">
                    <ButtonComponent
                      disabled
                      btnClass={"btn-primary export-excel-btn"}
                      btnName={"Export as Excel"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
               
              <div className="filter-options mb-3">
              
                <MultiSelectDropdown
                  options={filterSection}
                  selectedValues={selectedFilterSection}
                  onChange={handleSelectedSection}
                  placeholder="Select Section"
                />
                <MultiSelectDropdown
                  options={filterPlatforms}
                  selectedValues={selectedfilterPlatforms}
                  onChange={handleSelectedPlatforms}
                  placeholder="Select Platforms"
                />
                <MultiSelectDropdown
                  options={filterMetrics}
                  selectedValues={selectedFilterMetrics}
                  onChange={handleSelectedMetrics}
                  placeholder="Select Metrics"
                />
                 
              </div>
            </div>
            <div className="col-12">
              <TabComponent tabs={tabs} isBenchmarkDataSaved={projectDetails?.is_benchmark_saved} className="analytics-tabs" />
            </div>
          </div>

          {/* <div className="project-table-data mt-5">
              <TableComponent />
            </div> */}
          {/* <div className="footer-button">
              <ButtonComponent
                btnClass={"btn-outline-secondary"}
                btnName={"Back"}
              />
              <ButtonComponent
                btnClass={"btn-primary"}
                btnName={"Go to Analytics"}
              />
            </div> */}
        </div>
      </div>
      {/* <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="modal-height"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Super Themes</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-5">
          <SuperThemes />
        </Modal.Body>
        <Modal.Footer>
          <ButtonComponent
            btnClass={"btn-outline-secondary"}
            btnName={"Cancel"}
            onClick={handleClose}
          />
          <ButtonComponent
            btnClass={"btn-primary px-4"}
            btnName={"Save Project"}
            onClick={handleClose}
          />
        </Modal.Footer>
      </Modal> */}
    </>
  );
}
