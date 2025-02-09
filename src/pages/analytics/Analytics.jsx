import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import TabComponent from "../../components/tabs/TabComponent";
import GraphicalView from "../../components/GraphicalView/GraphicalView";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import ButtonComponent from "../../common/button/button";
import SuperThemes from "../../components/SuperThemes/SuperThemes";
import { getData } from "../../services/q3";
import { getAMData } from "../../services/Quarter-actual-metric-data";
import { getMetricListData } from "../../services/metricList";
import { getNormalizedData } from "../../services/quarter-metrics-normalised-data";
import { getSection } from "../../services/section-platform-metrics";
import {
  getProjectDetailsByProjectId,
  getBenchmarkValues,
  saveMetricsOfProject,
  getNormalizedValues,
  getDQScore,
  removeMetricFromProject,
  getKPIScoreValues,
  createUserProjectDQScore,
  updateProject,
} from "../../services/projectService";
import {
  getAllCategories,
  getAllSections,
  getAllMetricsByPlatformId,
  getAllMetricsDefinition,
  getAllPlatformsBySectionIds,
} from "../../services/userService";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
import "./analytics.scss";
import "./AnalyticsTable.scss";

import AnalyticsTable from "./AnalyticsTable";
import KPITable from "./KPITable";
import { useParams } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import * as XLSX from "xlsx";

export default function Analytics() {
  const [projectIds, setProjectIds] = useState(1);
  const [projectDetails, setProjectDetails] = useState({});
  const [metrics, setMetrics] = useState([]);
  const [kpiData, setKpiData] = useState([]);
  const data = getData();
  const AMData = getAMData();
  const metricData = getMetricListData();
  const normalizedData = getNormalizedData();
  const { projectId } = useParams();

  const [sectionsList, setSectionsList] = useState([]);
  const [platformsList, setPlatformsList] = useState([]);
  const [addMetricList, setAddMetricList] = useState([]);
  const [selectedSectionsList, setSelectedSectionsList] = useState([]);
  const [selectedPlatformsList, setSelectedPlatformsList] = useState([]);
  const [selectedAddMetricList, setAddSelectedMetricList] = useState([]);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addMetricLoading, setAddMetricLoading] = useState(false);
  const [dqScoreLoading, setDQScoreLoading] = useState(false);

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
  
  const [filteredComparisonData, setFilteredComparisonData] = useState([]);

  const [compareFilterCategories, setCompareFilterCategories] = useState([]);
  const [compareSelectedFilterCategories, setCompareSelectedFilterCategories] = useState([]);

  const [filterPlatforms, setFilterPlatforms] = useState([]);
  const [selectedFilterPlatforms, setSelectedFilterPlatforms] = useState([]);

  const [filterSection, setFilterSection] = useState([]);
  const [selectedFilterSection, setSelectedFilterSection] = useState([]);

  const [filterMetrics, setFilterMetrics] = useState([]);
  const [selectedFilterMetrics, setSelectedFilterMetrics] = useState([]);

  const [selectedMetricDesc, setSelectedMetricDesc] = useState(null);
  const [metricsDesc, setMetricsDesc] = useState([]);

  const [brandCategoryMap, setBrandCategoryMap] = useState({})

  const [brandFilterOptions, setBrandFilterOptions] = useState([]);
  const [compareSelectedFilterBrands, setCompareSelectedFilterBrands] = useState([]);

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
    { header: "Ecom DC Score", accessor: "Ecom DC Score" },
    { header: "Social DC Score", accessor: "Social DC Score" },
    { header: "Paid Marketing DC Score", accessor: "Paid Marketing DC Score" },
    { header: "Organic DQ", accessor: "Organic DQ" },
  ];

  const handleClose = () => {
    setShow(prevShow => !prevShow);
  };
  const handleShowModal = () => {
    setShow(true);
  };

  const updateMetricData = async() => {
    setAddMetricLoading(true);
    try {
      const reqPayload = {
        metric_id: selectedAddMetricList.map(m => m.value)
      }
      const res = await updateProject(projectId,reqPayload);
      console.log("metric res", res);
      if(res){
        setAddMetricLoading(false);

        fetchProjectDetails(projectId);
        handleClose();
      }
    } catch (error) {
      setAddMetricLoading(false);
      handleClose();
      
    }

  }

  const recentProjectId = useSelector((state) => state.user.recentlyUsedProjectId);
   

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
      case "Marketplace":
        return "#2A61DD";
      case "Digital Spends":
        return "#279E70";
      case "Socialwatch":
        return "#FF9800";
      case "Organic Performance":
        return "#C82519";
      default:
        return "#000000";
    }
  };
 
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
        const benchmarks = await getBenchmarkValues(reqPayload);

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

    const processBatch = async (batch) => {
      setLoading(true);
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
              const benchmarks = await getBenchmarkValues(reqPayload);
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

    for (let i = 0; i < metrics.length; i += batchSize) {
      const batch = metrics.slice(i, i + batchSize);
      const batchResults = await processBatch(batch);
      updatedMetrics = [...updatedMetrics, ...batchResults];
    }

    setMetrics(updatedMetrics);
  };

  const handleWeightChange = (metricId, value) => {
    const numericValue = isNaN(Number(value)) ? 0 : Number(value);

    const newWeights = { ...weights, [metricId]: numericValue };

    const totalWeight = Object.values(newWeights).reduce((acc, curr) => acc + curr, 0);

    if (totalWeight > 100) {
      alert('Total weights exceed 100. Please adjust the values.');

      newWeights[metricId] = weights[metricId];

      const updatedTotalWeight = Object.values(newWeights).reduce((acc, curr) => acc + curr, 0);

      setTotalWeights(updatedTotalWeight);
      setWeights(newWeights);
      return;
    }

    console.log(newWeights, 'new weights')

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
      const { uniqueCategoriesArray, uniqueBrandsArray, uniqueSectionsArray, uniquePlatformsArray, uniqueMetricsArray } = extractUniqueValues(response?.project?.metrics);
      setFilterCategories(uniqueCategoriesArray);
      setCompareFilterCategories(uniqueCategoriesArray);
      setBrandFilterOptions(uniqueBrandsArray);
      setFilterSection(uniqueSectionsArray);
      setFilterPlatforms(uniquePlatformsArray);
      setFilterMetrics(uniqueMetricsArray)
      setMetrics(() => {
        if (response?.project?.metrics && response?.project?.metrics?.length > 0) {
console.log(response?.project?.metrics, 'response?.project?.metrics')
          const initialWeight = 100 / response?.project?.metrics?.length;
          const initialWeights = response?.project?.metrics?.reduce((acc, item) => {
            acc[item.metric_id] = initialWeight;
            return acc;
          }, {});
          console.log('initialweights', initialWeights)
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
      if (response?.project?.is_benchmark_saved) {
        const compareNormalizeValue = await fetchComparedValue(id);
        const dqScoreValueResponse = await fetchDQScoreValue(id);
        if (compareNormalizeValue && dqScoreValueResponse) {
          setComparisonData(compareNormalizeValue);
          setDQScoreValue(dqScoreValueResponse);
          setDQScoreLoading(false);
          fetchKPIScores(response?.project, response?.project?.metrics);
        }

        return { compareNormalizeValue, dqScoreValueResponse }
      }

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

      if (compareNormalizeValue) {
        setComparisonData(compareNormalizeValue)

        const uniqueData = transformComparisonViewApiData(compareNormalizeValue);
        const uniqueComparisonBrandNames = Array.from(new Set(compareNormalizeValue.map(item => item.brandName)));
        const brandCategoryMap = compareNormalizeValue.reduce((acc, item) => {
          acc[item.brandName] = item.categoryName;
          return acc;
        }, {});
        setUniqueComparisonBrandName(uniqueComparisonBrandNames);
        setNormalizedValue(uniqueData);
        setBrandCategoryMap(brandCategoryMap);
      }

      return compareNormalizeValue;

    } catch (error) {
      console.error("Error in Fetching Data:", error);
    }
  }

  const transformComparisonViewApiData = (data) => {

    const transformedData = {};

    data?.forEach(item => {
      const { sectionName, platformName, metricName, brandName, normalized, benchmarkValue, percentile } = item;


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

      transformedData[sectionName][platformName][metricName].brands[brandName] = {
        normalized,
        benchmarkValue,
        percentile
      };
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
      if (dqScoreValueResponse) {
        setDQScoreLoading(false);
        setDQScoreValue(dqScoreValueResponse?.data);
      }
      return dqScoreValueResponse?.data;
    } catch (error) {
      setDQScoreLoading(false);
      console.error("Error in Fetching Data:", error);
    }
  }

  const removeMetricsFromDB = async (metricid, metricname) => {
    try {
      const response = await removeMetricFromProject(projectId, metricid);
      if (response) {

        alert(`${metricname} removed successfully!!`)
        fetchProjectDetails(projectId);
      }

    } catch (error) {
      alert(`Failed to remove ${metricname}!!`)
    }
  }
  const fetchKPIScores = async (projectdata, metricdata) => {
    const data = {
      platform: Array.from(new Set(metricdata?.map((metric) => metric.platform?.name))),
      metrics: Array.from(new Set(metricdata?.map((metric) => metric.metric_name))),
      brand: projectdata?.brands,
      analysis_type: "Overall",
      start_date: projectdata?.start_date,
      end_date: projectdata?.end_date,
    };

    try {
      const kpiScores = await getKPIScoreValues(data);
      if (kpiScores) {
        setKpiData(kpiScores?.results || []);
      }
    } catch (error) {
      console.error("Error fetching KPI scores:", error);
      // setError("Failed to load KPI scores"); 
    } finally {
      // setLoading(false); 
    }
  };


  const saveUserProjectDQScore = async (cmpData, dqVal) => {

    try {
      const data = constructDQScorePayload(dqVal, cmpData);
      console.log(data,'data......')
      const projectDQScore = await createUserProjectDQScore(data);
      if (projectDQScore) {
        alert("DC Score is saved in DB.")

      }
    } catch (error) {
      alert("Failed to save DC score in DB.")
    }
  }

  const constructDQScorePayload = (dqScoreBasedOnBrandName, benchmarkValue) => {
    console.log(dqScoreBasedOnBrandName,'dqScoreBasedOnBrandName')
    console.log(benchmarkValue,'benchmarkValue')
    const payload = [];

    dqScoreBasedOnBrandName.forEach(dqScore => {
      // Find matching benchmark data for the brand
      const brandBenchmarks = benchmarkValue?.filter(benchmark => benchmark?.brandName === dqScore?.Brand_Name);

      // For each section in the benchmark value, create a payload object
      // Todo: create a function to consider names in both upper & lowercase 
      // Todo: also spacing if we can remove ?
      brandBenchmarks.forEach(benchmark => {
        const scoreData = {
          user_id: userInfo?.user?.id,
          project_id: benchmark.project_id,
          brand_id: benchmark.brand_ids,
          brand_name: dqScore.Brand_Name,
          section_name: benchmark.sectionName,
          section_id: benchmark.sectionid,
          category_id: benchmark.categoryid,
          category_name: benchmark.categoryName,
          dq: dqScore.Overall_Final_Score,
          ecom_dq: dqScore.Marketplace,
          social_dq: dqScore['Digital Spends'],
          paid_dq: dqScore['Socialwatch'],
          brand_perf_dq: dqScore['Organic Performance'],
        };

        payload.push(scoreData);
      });
    });

    return payload;
  };

  const fetchSections = async () => {
    const sectionsData = await getAllSections();
    const uniqueSections = sectionsData.data.filter(
      (section, index, self) =>
        index === self.findIndex((s) => s.name === section.name)
    );
    setSectionsList(
      uniqueSections.map((section) => ({
        value: section.id,
        label: section.name,
      }))
    );

  }


  useEffect(() => {
    fetchSections();

    if (projectId) {
      setProjectIds(projectId);
      fetchProjectDetails(projectId);
    }

  }, [projectId]);

  function extractUniqueValues(data) {
    const sectionsArray = data?.map(metric => ({
      value: metric?.section?.id,
      label: metric?.section?.name
    }));

    const platformsArray = data?.map(metric => ({
      value: metric?.platform?.id,
      label: metric?.platform?.name
    }));

    const brandsArray = data?.flatMap(metric => 
      metric.brands.map(brand => ({
        value: brand?.id,
        label: brand?.name
      }))
    ); 

    const categoriesArray = data?.flatMap(metric =>
      metric.categories.map(category => ({
        value: category?.id,
        label: category?.name
      }))
    );

    const metricsArray = data?.map(metric => ({
      value: metric?.metric_id,
      label: metric?.metric_name
    }));

    const uniqueSectionsArray = [...new Map(sectionsArray?.map(item => [item.label, item])).values()];
    const uniquePlatformsArray = [...new Map(platformsArray?.map(item => [item.label, item])).values()];
    const uniqueBrandsArray = [...new Map(brandsArray?.map(item => [item.label, item])).values()];
    const uniqueCategoriesArray = [...new Map(categoriesArray?.map(item => [item.label, item])).values()];
    const uniqueMetricsArray = [...new Map(metricsArray?.map(item => [item.label, item])).values()];

    return {
      uniqueSectionsArray: uniqueSectionsArray,
      uniquePlatformsArray: uniquePlatformsArray,
      uniqueBrandsArray: uniqueBrandsArray,
      uniqueCategoriesArray: uniqueCategoriesArray,
      uniqueMetricsArray: uniqueMetricsArray
    };

  }

  const fetchMetricsDefinition = async (metric_name, platform_name) => {
    try {
      if (selectedMetricDesc === metric_name) {
        setSelectedMetricDesc(null);
        setMetricsDesc('');
      } else {
        const metricsDescData = await getAllMetricsDefinition(metric_name, platform_name);
        if (metricsDescData) {
          setMetricsDesc(metricsDescData?.definition);
          setSelectedMetricDesc(metric_name); // Set the clicked metric as selected
        }
      }
      // const metricsDescData = await getAllMetricsDefinition(metric_name, platform_name); // Pass the platform name here
      // if (metricsDescData) {
      //   setMetricsDesc(metricsDescData?.definition)
      //   setSelectedMetricDesc(metric_name); 
      // }
    } catch (error) {
      console.error('Error while fetching or mapping metrics data:', error);
    }
  };


 
  

  


  useEffect(() => {
    if (comparisonData.length > 0) {
      setFilteredComparisonData(comparisonData);
    }
  }, [comparisonData]);

  const handleCompareFilterBrand = (selectedOptions) => {
    setCompareSelectedFilterBrands(selectedOptions);
    filterComparisonData(compareSelectedFilterCategories, selectedOptions);
  };

  const handleCompareFilterCategory = (selectedOptions) => {
    setCompareSelectedFilterCategories(selectedOptions);
    filterComparisonData(selectedOptions, compareSelectedFilterBrands);
  };
  
  const filterComparisonData = (selectedCategories, selectedBrands) => {
    const selectedCategoryIds = selectedCategories.map((option) => option.value);
    const selectedBrandIds = selectedBrands.map((option) => option.value);
  
    // Filter the data based on selected categories and brands
    const filteredData = comparisonData.filter((item) => {
      const matchesCategory = selectedCategoryIds.length === 0 || selectedCategoryIds.includes(Number(item.categoryid));
      const matchesBrand = selectedBrandIds.length === 0 || selectedBrandIds.includes(Number(item.brand_ids));
      return matchesCategory && matchesBrand;
    });
  
    // Remove duplicates by unique combination of relevant fields
    const uniqueData = Array.from(
      new Map(
        filteredData.map((item) => [
          `${item.categoryid}-${item.brand_ids}-${item.metricname}`, // Unique key
          item,
        ])
      ).values()
    );
  
    setFilteredComparisonData(uniqueData);
  };
  
  // const filterComparisonData = (selectedCategories, selectedBrands) => {
  //   const selectedCategoryIds = selectedCategories.map((option) => option.value);
  //   const selectedBrandIds = selectedBrands.map((option) => option.value);
  
    
  //   const filteredData = comparisonData.filter((item) => {
  //     const matchesCategory = selectedCategoryIds.length === 0 || selectedCategoryIds.includes(Number(item.categoryid));
  //     const matchesBrand = selectedBrandIds.length === 0 || selectedBrandIds.includes(Number(item.brand_ids));
  //     return matchesCategory && matchesBrand;
  //   });
  
     
  //   setFilteredComparisonData(filteredData);
  // };
  
  

  // const handleCompareFilterCategory = (selectedOptions) => {
  //   setCompareSelectedFilterCategories(selectedOptions);
  
  //   if (selectedOptions.length > 0) {
       
  //     const selectedCategoryIds = selectedOptions.map((option) => option.value);
   
  //     const filteredData = comparisonData.filter((item) =>
  //       selectedCategoryIds.includes(Number(item.categoryid))
  //     );
       
  //     setFilteredComparisonData(filteredData);
  //   } else {
       
  //     setFilteredComparisonData(comparisonData);
  //   }
  // };
  

  // const handleFilterCategory = async (selectedOptions) => {
  //   setSelectedFilterCategories(selectedOptions);
    
  //   if (selectedOptions.length > 0) {
  //     try {
  //       const categoryIds = selectedOptions.map((option) => option.value);
        
  //       const getCatIds = await getAllCategories(categoryIds);
  //       const selectedCategorieIds = getCatIds?.data.map((category) => ({
  //         value: category.id,
  //         label: category.name,
  //       }));
  //       console.log("Fetched Categories:", getCatIds?.data);

  //       setFilterCategories(() => [...selectedCategorieIds]);

  //       setComparisonData((prevComparisonData) => {
  //         if (prevComparisonData && prevComparisonData.length > 0) {
  //           return prevComparisonData.filter((item) =>
  //             categoryIds.includes(item.categoryid)
  //           );
  //         }
  //          console.log("Previous Comparison Data:", prevComparisonData);
  //         return [];
  //       });
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   } else {

  //     setFilterCategories([]);
  //     fetchProjectDetails(); 
  //   }
  // };

  const handleFilterCategory = async (selectedOptions) => {
    setSelectedFilterCategories(selectedOptions);
    if (selectedOptions.length > 0) {
      try {
        const categoryIds = selectedOptions.map((option) => option.value);
        const getCatIds = await getAllCategories(categoryIds);
        const selectedCategorieIds = getCatIds?.data.map(category => ({
          value: category.id,
          label: category.name,
        }));
        setFilterCategories(prevCategories => {
          return [
            ...selectedCategorieIds
          ];
        })
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  };
  
  


  const handleSelectedSection = async (selectedOptions) => {
    try {
      setSelectedFilterSection(selectedOptions);

      const existingValues = selectedOptions.map((option) => option.value);

      const platformsIDs = await getAllPlatformsBySectionIds(existingValues);

      const filteredPlatforms = platformsIDs?.data
        .map(sec => ({
          value: sec.platformId,
          label: sec.platformName,
        }));

      setFilterPlatforms(prevPlatforms => {
        return [
          ...filteredPlatforms
        ];
      })

    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const handleSelectedPlatforms = async (selectedOptions) => {
    try {
      setSelectedFilterPlatforms(selectedOptions);

      const existingValues = selectedOptions.map((option) => option.value);

      const metricsData = await getAllMetricsByPlatformId(existingValues);

      const filteredMetrics = metricsData?.data
        .map(metric => ({
          value: metric.id,
          label: metric.name,
        }));

      setFilterMetrics(prevFilteredMetrics => {
        return [
          ...filteredMetrics
        ];
      });


    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };


  const handleSelectedMetrics = async (selectedOptions) => {
    try {
      const existingValues = selectedOptions.map((option) => option.value);
      setSelectedFilterMetrics(selectedOptions)

    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  const setWeightsValueToZero = () => {
    const updatedWeights = metrics.reduce((acc, metric) => {
      acc[metric.metric_id] = 0;
      return acc;
    }, {});

    setWeights(updatedWeights);
    setTotalWeights(0);
  };

  const resetWeightsValue = () => {
    const defaultWeight = 100 / metrics.length;
    const updatedWeights = metrics.reduce((acc, metric) => {
      acc[metric.metric_id] = defaultWeight;
      return acc;
    }, {});

    const totalWeight = Object.values(updatedWeights).reduce((acc, curr) => acc + curr, 0);

    setWeights(updatedWeights);
    setTotalWeights(totalWeight);
  };


  const saveWeights = async () => {
    const saveMetricsPayload = generateApiPayload(metrics);

    try {
      const response = await saveMetricsOfProject(saveMetricsPayload);
      if (response && response.status === 'success') {
        alert('Weights saved successfully!');
        const data = await fetchProjectDetails(projectId);
        if (data?.compareNormalizeValue?.length > 0 && data?.dqScoreValueResponse.length > 0) {
          await saveUserProjectDQScore(data?.compareNormalizeValue, data?.dqScoreValueResponse);
        }

      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === 'Project Benchmark has already been saved, you cannot create another instance.'
      ) {
        alert('Error: Project Benchmark has already been added, you cannot create another instance.');
      } else {
        alert('An error occurred!');
      }
    }
  };


  const generateApiPayload = (metrics) => {
    const project_id = projectId;

    return metrics?.map(metric => {
      const categoryIds = metric?.categories?.map(category => category?.id) || [];

      const benchmarkData = metric?.categories?.map(category => {

        const matchedBenchmark = metric?.benchmark?.find(bm =>
          bm?.categories?.includes(category?.name) || bm?.category === "Overall"
        ) || {};

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
    if (metrics.length > 0) {
      return metrics.every(item => item.isOverallChecked || item.isCategoryBasedChecked);
    }
    return false;
  };

  const handleExportAnalytics = () => {
    const dqScoreData = dqScoreValue;
    const kpiScoresData = kpiData;
    const comparisonScoreData = normalizedValue;

    const kpiStructuredData = restructureDataForBrandAsHeader(kpiScoresData);

    if (dqScoreData.length > 0 || kpiStructuredData.length > 0 || comparisonScoreData.length > 0) {
      generateExcel(dqScoreData, kpiStructuredData, comparisonScoreData);
    }
  };
  const restructureDataForBrandAsHeader = (data) => {
    if (!data || data.length === 0) return [];

    const rowHeaders = Array.from(new Set(data.map(item => `${item.section}-${item.platform}-${item.metric}`)));

    const brands = Array.from(new Set(data.map(item => item.brand)));

    const structuredData = rowHeaders.map(header => {
      const [section, platform, metric] = header.split('-');
      return [section, platform, metric, ...brands.map(() => '')]; 
    });

    data.forEach(item => {
      const rowIndex = rowHeaders.indexOf(`${item.section}-${item.platform}-${item.metric}`);
      const brandIndex = brands.indexOf(item.brand);

      // Check if rowIndex or brandIndex is not found
      if (rowIndex === -1) {
        console.error(`Row header not found for: ${item.section}-${item.platform}-${item.metric}`);
        return; // Skip this item if the header is not found
      }

      if (brandIndex === -1) {
        console.error(`Brand not found for: ${item.brand}`);
        return; // Skip this item if the brand is not found
      }

      structuredData[rowIndex][3 + brandIndex] = item.result; // Fill in the result for the brand
    });

    // Prepend headers to the data (Section, Platform, Metric, followed by brands)
    return [['Section', 'Platform', 'Metric', ...brands], ...structuredData];
  };


  const generateExcel = (dqScoreData, kpiStructuredData, comparisonScoreData) => {
    const workbook = XLSX.utils.book_new();

    const dqWorksheet = XLSX.utils.json_to_sheet(dqScoreData);
    const kpiWorksheet = XLSX.utils.aoa_to_sheet(kpiStructuredData);
    const comparisonWorksheet = XLSX.utils.json_to_sheet(comparisonScoreData);

    XLSX.utils.book_append_sheet(workbook, dqWorksheet, "DC Score");
    XLSX.utils.book_append_sheet(workbook, kpiWorksheet, "KPI Score");
    XLSX.utils.book_append_sheet(workbook, comparisonWorksheet, "Comparison View");

    XLSX.writeFile(workbook, "Analytics.xlsx");
  };


  const handleAddSection = async (selectedOptions) => {
    setSelectedSectionsList(selectedOptions);
    if (selectedOptions.length > 0) {
      try {
        const sectionIDs = selectedOptions.map((option) => option.value);
        const platformsIDs = await getAllPlatformsBySectionIds(sectionIDs);
        setPlatformsList(
          platformsIDs.data.map((sec) => ({
            value: sec.platformId,
            label: sec.platformName,
          }))
        );
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }
  };


  const handleAddPlatform = async (selectedOptions) => {
    setSelectedPlatformsList(selectedOptions);

    if (selectedOptions.length > 0) {
      try {
        const platformIds = selectedOptions.map((option) => option.value);
        const metricsData = await getAllMetricsByPlatformId(platformIds);
        setAddMetricList(
          metricsData.data.map((metric) => ({
            value: metric.id,
            label: metric.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    }
  };
  const handleAddMetric = (selectedOptions) => {
    setAddSelectedMetricList(selectedOptions);
  };


  // Group data by metricname
  const groupedData = filteredComparisonData.reduce((acc, row) => {
    if (!acc[row.metricname]) {
      acc[row.metricname] = [];
    }
    acc[row.metricname].push(row);
    return acc;
  }, {});

  // Get unique brands
  const uniqueBrands = Array.from(new Set(filteredComparisonData.map((row) => row.brandName))).sort((a, b) => a.localeCompare(b));

  console.log('filteredComparisonData', filteredComparisonData);

  const tabs = [
    {
      label: "Weights and Benchmark",
      content: (
        <div>
          <div className="row">
            <div className="col12">
              <div className="table-buttons">
                <ButtonComponent btnClass={"btn-secondary"} 
                  disabled={projectDetails?.is_benchmark_saved}
                  btnName={"Set weights as 0"} onClick={setWeightsValueToZero} />
                <ButtonComponent btnClass={"btn-secondary"}
                  disabled={projectDetails?.is_benchmark_saved}
                  btnName={"Reset"} onClick={resetWeightsValue} />
                <ButtonComponent btnClass={"btn-secondary"}
                  disabled={projectDetails?.is_benchmark_saved}
                  btnName={"Add Metric"} onClick={handleShowModal} />
              </div>
            </div>
          </div>
          <AnalyticsTable
            projectDetails={projectDetails}
            checkStates={checkStates}
            metrics={metrics}
            weights={weights}
            totalWeights={totalWeights}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            handleWeightChange={handleWeightChange}
            removeMetricsFromDB={removeMetricsFromDB}
            isBenchmarkSaved={projectDetails?.is_benchmark_saved}
            selectedCategory={selectedFilterCategories}
            selectedSections={selectedFilterSection}
            selectedPlatforms={selectedFilterPlatforms}
            selectedMetrics={selectedFilterMetrics}
            isLoading={true}
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
      label: "DC Scores",
      disabled: "disabled",
      content: (
        <div>
          <ScoreCard 
            dqScoreValue={dqScoreValue} 
            dqScoreLoading={dqScoreLoading}  
            selectedCategory={selectedFilterCategories}
            selectedSections={selectedFilterSection}
            selectedPlatforms={selectedFilterPlatforms}
            selectedMetrics={selectedFilterMetrics} />
        </div>
      ),
    },
    {
      label: "Graphical view",
      content: (
        <div>
          <GraphicalView getColor={getColor} projectId={projectId} normalizedData={comparisonData}/>
        </div>
      ),
    },
    {
      label: "KPI Scores",
      content: (
        <>
          <KPITable
            normalizedData={comparisonData}
            kpiData={kpiData}
            metrics={metrics}
            projectDetails={projectDetails}
            getColor={getColor}
            getColorScore={getColorScore}
          />

        </>
      ),
    },

    {
      label: "Comparison View",
      content: (
        <div>
          <div className="filter-options mb-2">
            <MultiSelectDropdown
              options={compareFilterCategories}
              selectedValues={compareSelectedFilterCategories}
              onChange={handleCompareFilterCategory}
              placeholder="Select Category"
            />
            <MultiSelectDropdown
              options={brandFilterOptions} 
              selectedValues={compareSelectedFilterBrands}
              onChange={handleCompareFilterBrand}
              placeholder="Select Brand"
            />
            
          </div>
          <ul className="legend">
            <li> Marketplace</li>
            <li> Digital Spends</li>
            <li> Socialwatch</li>
            <li> Organic Performance</li>
          </ul>
    
          {/* {comparisonData?.length > 0 ? (
            <Table responsive striped bordered className="insights-table comparision-table">
              <thead>
                <tr>
                  <th className="sticky-col" style={{ width: '150px' }}>Section</th>
                  <th className="sticky-col" style={{ width: '150px' }}>Platform</th>
                  <th className="sticky-col" style={{ width: '150px' }}>Metric</th>
                  
                  {Array.from(new Set(comparisonData.map(row => row?.brandName)))
                    .sort((a, b) => a.localeCompare(b))
                    .map(brand => (
                      <th key={brand} style={{ width: '100px' }}>
                        {brand}
                        <span className="brand-category">  </span>
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
               
                {Array.from(new Set(comparisonData.map((row) => row.metricname))).map((metricName) => {
                  return comparisonData.filter(row => row.metricname === metricName).map((row, index) => (
                    <tr key={index}>
                      <td className="sticky-col" style={{ width: '150px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: getColor(row?.sectionName),
                            marginRight: '5px',
                          }}
                        ></span>
                        {row?.sectionName}
                      </td>
                      <td className="sticky-col" style={{ width: '150px' }}>{row?.platformname}</td>
                      <td className="sticky-col" style={{ width: '150px' }}>
                        <div className="metric-name">
                          {row?.metricname}
                          <div className="metric-info">
                            <FaInfo className="info-icon" onClick={() => fetchMetricsDefinition(row?.metricname, row?.platformname)} />
                            {selectedMetricDesc === row?.metricname && (
                              <span className="metric-desc">{metricsDesc}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      {Array.from(new Set(comparisonData.map((row) => row.brandName)))
                        .sort((a, b) => a.localeCompare(b))
                        .map(brand => {
                          const brandData = comparisonData.find((data) => data.brandName === brand && data.metricname === metricName);
                          return (
                            <td key={brand} style={{ width: '100px' }}
                              title={`Benchmark Value: ${brandData?.benchmarkValue || 'N/A'}\nPercentile: ${brandData?.percentile || 'N/A'}`}
                            >
                              {brandData?.normalized || "-"}
                            </td>
                          );
                        })
                      }
                    </tr>
                  ));
                })}
              </tbody>
            </Table>
          ) : (
            <div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading...</span>
            </div>
          )} */}

          {filteredComparisonData?.length > 0 ? (
            <Table responsive striped bordered className="insights-table comparision-table">
              <thead>
                <tr>
                  <th className="sticky-col" style={{ width: '150px' }}>Section</th>
                  <th className="sticky-col" style={{ width: '150px' }}>Platform</th>
                  <th className="sticky-col" style={{ width: '200px' }}>Metric</th>
                    
                    {Array.from(new Set(filteredComparisonData.map(row => row?.brandName)))
                      .sort((a, b) => a.localeCompare(b))
                      .map(brand => {
                        const row = filteredComparisonData.find(data => data.brandName === brand);
                        return (
                          <th key={brand} style={{ width: '100px' }}>
                            {brand}
                            {row?.categoryName && (
                              <span className="brand-category"> ({row.categoryName})</span>
                            )}
                          </th>
                        );
                      })}
                </tr>
              </thead>
              <tbody>
               
                {Object.entries(groupedData).map(([metricName, rows]) => {
                const firstRow = rows[0]; // Representative row for static data
                return (
                  <tr key={metricName}>
                    <td className="sticky-col">{firstRow?.sectionName}</td>
                    <td className="sticky-col">{firstRow?.platformname}</td>
                    <td className="sticky-col" style={{ width: '200px' }}>
                      <div className="metric-name">
                        {metricName}
                        <div className="metric-info">
                          <FaInfo
                            className="info-icon"
                            onClick={() => fetchMetricsDefinition(metricName, firstRow?.platformname)}
                          />
                        </div>
                          {selectedMetricDesc === metricName && (
                            <span className="metric-desc">{metricsDesc}</span>
                          )}
                      </div>
                    </td>
                    {uniqueBrands.map((brand) => {
                      const brandData = rows.find((row) => row.brandName === brand);
                      return (
                        <td
                          key={brand}
                          style={{ width: '100px' }}
                          title={`Benchmark Value: ${brandData?.benchmarkValue || 'N/A'}\nPercentile: ${brandData?.percentile || 'N/A'}`}
                        >
                          {brandData?.normalized || "-"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
                {/* {Array.from(new Set(filteredComparisonData.map((row) => row.metricname))).map((metricName) => {
                  return filteredComparisonData.filter(row => row.metricname === metricName).map((row, index) => (
                    <tr key={index}>
                      <td className="sticky-col">{row?.sectionName}</td>
                      <td className="sticky-col">{row?.platformname}</td>
                      <td className="sticky-col" style={{ width: '200px' }}>
                        <div className="metric-name">
                          {row?.metricname}
                          <div className="metric-info">
                            <FaInfo className="info-icon" onClick={() => fetchMetricsDefinition(row?.metricname, row?.platformname)} />
                            {selectedMetricDesc === row?.metricname && (
                              <span className="metric-desc">{metricsDesc}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      {Array.from(new Set(filteredComparisonData.map((row) => row.brandName)))
                        .sort((a, b) => a.localeCompare(b))
                        .map(brand => {
                          const brandData = filteredComparisonData.find((data) => data.brandName === brand && data.metricname === metricName);
                          return (
                            <td key={brand} style={{ width: '100px' }}
                              title={`Benchmark Value: ${brandData?.benchmarkValue || 'N/A'}\nPercentile: ${brandData?.percentile || 'N/A'}`}
                            >
                              {brandData?.normalized || "-"}
                            </td>
                          );
                        })
                      }
                      
                    </tr>
                  ));
                })} */}
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
          {normalizedValue && (
            <SuperThemes metrics={metrics} normalizedDQScoreValue={normalizedValue} projectId={projectId} />
          )}
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
                  <div className="export-btn">
                    <ButtonComponent
                      btnClass={"btn-primary export-excel-btn"}
                      btnName={"Export as Excel"}
                      onClick={handleExportAnalytics}
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
                  options={filterCategories}
                  selectedValues={selectedFilterCategories}
                  onChange={handleFilterCategory}
                  placeholder="Select Category"
                />
                <MultiSelectDropdown
                  options={filterSection}
                  selectedValues={selectedFilterSection}
                  onChange={handleSelectedSection}
                  placeholder="Select Section"
                />
                <MultiSelectDropdown
                  options={filterPlatforms}
                  selectedValues={selectedFilterPlatforms}
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
        </div>
      </div>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="modal-height"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Metrics</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 ws-select">
              <MultiSelectDropdown
                options={sectionsList}
                selectedValues={selectedSectionsList}
                onChange={handleAddSection}
                placeholder="Select Section"
              />
            </div>
            <div className="col-lg-4 col-md-6 ws-select">
              <MultiSelectDropdown
                options={platformsList}
                selectedValues={selectedPlatformsList}
                onChange={handleAddPlatform}
                placeholder="Select Platforms"
              />
            </div>
            <div className="col-lg-4 col-md-6 ws-select">
              <MultiSelectDropdown
                options={addMetricList}
                selectedValues={selectedAddMetricList}
                onChange={handleAddMetric}
                placeholder="Select Metrics"

              />

            </div>
          </div>

          { addMetricLoading && (<div className="loader-container-sm">
              <div className="loader-sm"></div>
               <span className="loader-text">Loading...</span>
             </div>)
             
             }
        </Modal.Body>
        <Modal.Footer>
          <ButtonComponent
            btnClass={"btn-outline-secondary"}
            btnName={"Cancel"}
            onClick={handleClose}
          />
          <ButtonComponent
            btnClass={"btn-primary px-4"}
            btnName={"Add Metric"}
            onClick={updateMetricData}
          />
        </Modal.Footer>
      </Modal>

    </>
  );
}
