import axios from "axios";

export const createProject = async (data) => {
  try {
    const response = await axios.post(
      "https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/create-project",
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const frequenciesData = response.data;

    return frequenciesData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};
export const saveMetricsOfProject = async (data) => {
  try {
    const response = await axios.post(
      "https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/save-metrics",
      data
    );

    console.log(response)

    if (response?.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const frequenciesData = response?.data;

    return frequenciesData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getProjectDetailsByProjectId = async (projectId) => {
  try {
    const response = await axios.get(
      `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/get-project/?project_id=${projectId}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const frequenciesData = response.data;

    return frequenciesData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};
export const getProjectDetailsByUserId = async (userId) => {
  // This APi will give the project lists
  try {
    const response = await axios.get(
      `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/get-project-by-user/?user_id=${userId}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const frequenciesData = response.data;

    return frequenciesData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getBenchamarkValues = async (data) => {

//   samplePayload = [
//     {
//         "project_id": 15,
//         "sectionId": 3,
//         "platformId": 3,
//         "isOverall": false,
//         "isCategory": true,
//         "metricId": 12,
//         "weights": 50,
//         "categoryIds": [
//             1,
//             2,
//             3
//         ],
//         "benchmarks": "[{'categoryId': 1 , benchmarkValue: 33.4, actualValue:45},{'categoryId': 2 , benchmarkValue: 33.4, , actualValue:48},{'categoryId': 3 , benchmarkValue: 33.4 ,actualValue:45}, ]"
//     },
//     {
//         "project_id": 15,
//         "sectionId": 3,
//         "platformId": 3,
//         "isOverall": true,
//         "isCategory": false,
//         "metricId": 13,
//         "weights": 50,
//         "categoryIds": [
//             1,
//             2,
//             3
//         ],
//         "benchmarks": "[benchmarkValue:'60.0',actualValue:1005]"
//     }
// ]
  try {
    const response = await axios.post(
      `https://dndrvx80-8011.inc1.devtunnels.ms/process_metric`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log(response, "xxxxxxxxxxx")
    const frequenciesData = response?.data?.results;

    return frequenciesData;
  } catch (error) {
    console.error("Error in fetching benchmark:", error);
    throw error;
  }
};
export const getKPIScoreValues = async (data) => {
  try {
    const response = await axios.post(
      `https://dndrvx80-8000.inc1.devtunnels.ms/analytics_metric/`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const frequenciesData = response.data;

    return frequenciesData;
  } catch (error) {
    console.error("Error in fetching benchmark:", error);
    throw error;
  }
};
export const getHealthCardDetails = async (data) => {
  try {
    const response = await axios.post(
      `https://dndrvx80-8002.inc1.devtunnels.ms/health_card/`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const frequenciesData = response.data;

    return frequenciesData;
  } catch (error) {
    console.error("Error in fetching benchmark:", error);
    throw error;
  }
};

export const getNormalizedValues = async (data) => {
  try {
    const response = await axios.post(
      `https://dndrvx80-8015.inc1.devtunnels.ms/normalized_value`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const compareNormalizeData = response.data;

    return compareNormalizeData;
  } catch (error) {
    console.error("Error in fetching :", error);
    throw error;
  }
};
export const getDQScore = async (data) => {
  try {
    const response = await axios.post(
      `https://hzz4tlcw-8020.inc1.devtunnels.ms/get_data`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const compareNormalizeData = response.data;

    return compareNormalizeData;
  } catch (error) {
    console.error("Error in fetching :", error);
    throw error;
  }
};


