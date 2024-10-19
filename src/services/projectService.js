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
export const updateProject = async (id, data) => {
  try {
    const response = await axios.patch(
      `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/projects/${id}`,
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
export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(
      `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/projects/${id}`);

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
export const getProjecName = async (data) => {
  try {
    const response = await axios.get(
      `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/check-project-name/?project_name=${data}`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const projectData = response.data;

    return projectData;
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

    console.log("saveWeights", response)

    if (response?.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const frequenciesData = response?.data;

    return frequenciesData;
  } catch (error) {
    console.error("Error in save weights:", error);
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

export const getProjectListsByFilter = async (frequencyId, categoryIds) => {
  try {
    let url = `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/projects-by-id?frequency_id=${frequencyId}`;
    console.log(categoryIds, 'categoryIds')

    if (categoryIds?.length > 0) {

      categoryIds?.forEach((categoryId, index) => {
        url += `&category_id[${index}]=${categoryId}`;
      });

      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const projectData = response.data;
      return projectData;
    }
  } catch (error) {
    console.error("Error fetching project lists:", error);
    throw error;
  }
};


export const getBenchamarkValues = async (data) => {

  try {
    const response = await axios.post(
      `https://m594bmgj-8017.inc1.devtunnels.ms/process_metric/`, data
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
      `https://m594bmgj-8025.inc1.devtunnels.ms/analytics_metric/`, data
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
      `https://hrsbjqs8-8017.inc1.devtunnels.ms/health_card/`,
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
      `https://hzz4tlcw-8002.inc1.devtunnels.ms/normalized_value`,
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
      `https://hzz4tlcw-8004.inc1.devtunnels.ms/get_data`,
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
export const getDQScoreMultipleProjects = async (data) => {
  try {
    const response = await axios.post(
      `https://hzz4tlcw-8006.inc1.devtunnels.ms/get_multi_data`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const compareNormalizeData = response?.data;

    return compareNormalizeData;
  } catch (error) {
    console.error("Error in fetching :", error);
    throw error;
  }
};
export const getBrandData = async (data) => {
  try {
    const response = await axios.post(
      `https://hzz4tlcw-8008.inc1.devtunnels.ms/get_brand_data`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getBrandDataDetails = response.data;
    console.log('getBrandDataDetails', getBrandDataDetails)
    return getBrandDataDetails;
  } catch (error) {
    console.error("Error in fetching :", error);
    throw error;
  }
};
export const getBrandImages = async (data) => {
  try {

    let url = `http://127.0.0.1:8018/brand-images/${data}`;
    // let url = `https://hrsbjqs8-8019.inc1.devtunnels.ms/brand-images/${data}`;
    const response = await axios.get(url, { responseType: 'blob' });
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const imageUrl = URL.createObjectURL(response.data);
    console.log('imageUrl', imageUrl)
    return imageUrl;
  } catch (error) {
    console.error("Error in fetching :", error);
    throw error;
  }
};
export const getBrandDetailsData = async (data) => {
  try {
    const url = `https://hrsbjqs8-8022.inc1.devtunnels.ms/brands/${data}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log('Brand Details Data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};
export const removeMetricFromProject = async (projectId, metricId) => {
  try {
    const url = `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/remove-metric/${projectId}/metrics/${metricId}`;
    const response = await axios.delete(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log('Brand Details Data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};
export const createUserProjectDQScore = async (data) => {
  try {
    const url = `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/create-user-project-dq-score`;
    const response = await axios.post(url, data);

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }

    console.log('Brand Details Data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const saveMetricGroup = async (data) => {
  try {
    const url = `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/metric-groups`;
    const response = await axios.post(url, data);

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }

    console.log('Brand Details Data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const getWeights = async (projectId) => {
  try {
    const url = `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/get-weights-by-project/${projectId}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log('Brand Details Data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};


export const getMetricGroupNames = async (projectId) => {
  try {
    const url = `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/metric-groups/${projectId}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log('Brand Details Data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const saveMetricsThemeGroup = async (data) => {
  try {
    const url = `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/metric-theme-groups`;
    const response = await axios.post(url, data);

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }

    console.log('Brand Details Data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const getMetricThemeGroupNames = async (projectId) => {
  try {
    const url = `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/metric-theme-groups/${projectId}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log('Brand Details Data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const getProjectsByDateRangeForUser = async (data) => {
  try {
    const url = `https://m594bmgj-8080.inc1.devtunnels.ms/api/v1/project/get-project-by-date-range-for-user`;
    const response = await axios.post(url, data);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log('Brand Details Data:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const getTop5Data = async (data) => {
  try {
    const response = await axios.post(
      `https://hrsbjqs8-8023.inc1.devtunnels.ms/top_5/`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getTopFiveData = response.data;
    console.log('getTopFiveData', getTopFiveData)
    return getTopFiveData;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};


