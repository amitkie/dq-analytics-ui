import { apiFastApiClient, apiNodeJSClient } from "./api";

export const createProject = async (data) => {
  try {
    const response = await apiNodeJSClient.post(
      "/api/v1/project/create-project",
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
    const response = await apiNodeJSClient.put(
      `/api/v1/project/projects/${id}`,
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
    const response = await apiNodeJSClient.delete(
      `/api/v1/project/projects/${id}`);

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
    const response = await apiNodeJSClient.get(
      `/api/v1/project/check-project-name/?project_name=${data}`,
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
    const response = await apiNodeJSClient.post(
      "/api/v1/project/save-metrics",
      data
    );

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
    const response = await apiNodeJSClient.get(
      `/api/v1/project/get-project/?project_id=${projectId}`
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
    const response = await apiNodeJSClient.get(
      `/api/v1/project/get-project-by-user/?user_id=${userId}`
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
    let url = `/api/v1/project/projects-by-id?frequency_id=${frequencyId}`;

    if (categoryIds?.length > 0) {

      categoryIds?.forEach((categoryId, index) => {
        url += `&category_id[${index}]=${categoryId}`;
      });

      const response = await apiNodeJSClient.get(url);

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


export const getBenchmarkValues = async (data) => {

  try {
    const response = await apiFastApiClient.post(
      `/process_metric/`, data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const frequenciesData = response?.data?.results;

    return frequenciesData;
  } catch (error) {
    console.error("Error in fetching benchmark:", error);
    throw error;
  }
};

export const getKPIScoreValues = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/analytics_metric/`, data
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
export const getWeightsOfSuperTheme = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/weight_sum`, data
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
export const getWeightsOfGroupNormalised = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/theme_normalised`, data
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
export const getWeightsOfMetricGroup = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/group_normalised`, data
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
    const response = await apiFastApiClient.post(
      `/health_card/`,
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
    const response = await apiFastApiClient.post(
      `/normalized/normalized_value`,
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
    const response = await apiFastApiClient.post(
      `/metrics/get_data`,
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
    const response = await apiFastApiClient.post(
      `/get_multi_data`,
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
    const response = await apiFastApiClient.post(
      `/brand/get_brand_data`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getBrandDataDetails = response.data;
    return getBrandDataDetails;
  } catch (error) {
    console.error("Error in fetching :", error);
    throw error;
  }
};
export const getBrandImages = async (data) => {
  try {

    let url = `/brand-images/${data}`;
    const response = await apiFastApiClient.get(url, { responseType: 'blob' });
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error("Error in fetching :", error);
    throw error;
  }
};
export const getBrandDetailsData = async (brandName, projectId) => {
  try {
    const url = `/brands/${brandName}/project_id/${projectId}`;
    const response = await apiFastApiClient.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};
export const removeMetricFromProject = async (projectId, metricId) => {
  try {
    const url = `/api/v1/project/remove-metric/${projectId}/metrics/${metricId}`;
    const response = await apiNodeJSClient.delete(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};
export const createUserProjectDQScore = async (data) => {
  try {
    const url = `/api/v1/project/create-user-project-dq-score`;
    const response = await apiNodeJSClient.post(url, data);

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const saveMetricGroup = async (data) => {
  try {
    const url = `/api/v1/project/metric-groups`;
    const response = await apiNodeJSClient.post(url, data);

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const getWeights = async (projectId) => {
  try {
    const url = `/api/v1/project/get-weights-by-project/${projectId}`;
    const response = await apiNodeJSClient.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};


export const getMetricGroupNames = async (projectId) => {
  try {
    const url = `/api/v1/project/metric-groups/${projectId}`;
    const response = await apiNodeJSClient.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const saveMetricsThemeGroup = async (data) => {
  try {
    const url = `/api/v1/project/metric-theme-groups`;
    const response = await apiNodeJSClient.post(url, data);

    if (response.status !== 201) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const getMetricThemeGroupNames = async (projectId) => {
  try {
    const url = `/api/v1/project/metric-theme-groups/${projectId}`;
    const response = await apiNodeJSClient.get(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};
export const deleteSuperTheme = async (superThemeId, projectId) => {
  try {
    const url = `/api/v1/project/metric-theme-groups/${superThemeId}?project_id=${projectId}`;
    const response = await apiNodeJSClient.delete(url);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const getProjectsByDateRangeForUser = async (data) => {
  try {
    const url = `/api/v1/project/get-project-by-date-range-for-user`;
    const response = await apiNodeJSClient.post(url, data);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};

export const getTop5Data = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/top_5/`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getTopFiveData = response.data;
    return getTopFiveData;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};
export const getCompetitorsData = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/brands/competitors`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getCompetitorsDetails = response.data;
    
    return getCompetitorsDetails;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};
export const getCompetitorsReport = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/dq_filter_data`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getCompetitorsDetailsReport = response.data;

    return getCompetitorsDetailsReport;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};
export const getSectionalReport = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/sectional_report`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getSectionalReportData = response.data;

    return getSectionalReportData;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};
export const getPlatformHealthReport = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/platform_report`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getPlatformHealthReportData = response.data;

    return getPlatformHealthReportData;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};
export const getMetricHealthReport = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/metric_report`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getMetricHealthReportData = response.data;

    return getMetricHealthReportData;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};
export const getMultipleBrandReport = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/get_project_brand_data`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getMultipleBrandReportData = response.data;
     
    return getMultipleBrandReportData;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};
// export const getMultipleBrandReport = async (data) => {
//   try {
//     const response = await apiFastApiClient.post(
//       `/multiple_get_brand_data`,
//       data
//     );

//     if (response.status !== 200) {
//       throw new Error("Network response was not ok");
//     }

//     const getMultipleBrandReportData = response.data;
     
//     return getMultipleBrandReportData;
//   } catch (error) {
//     console.error("Error in fetching Top 5 data:", error);
//     throw error;
//   }
// };

export const toggleFavoriteProject = async (projectId,data) => {
  try {
    const response = await apiNodeJSClient.put(
      `/api/v1/project/projects/${projectId}/favorite`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getMultipleBrandReportData = response.data;
     
    return getMultipleBrandReportData;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};

export const getNormWeightValueInsight = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/norm_weight_value`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getWeightsValueInsightsData = response.data;
     
    return getWeightsValueInsightsData;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};

export const getNormBrandValueInsight = async (data) => {
  try {
    const response = await apiFastApiClient.post(
      `/norm_brand_value`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const getBrandValueInsightsData = response.data;
     
    return getBrandValueInsightsData;
  } catch (error) {
    console.error("Error in fetching Top 5 data:", error);
    throw error;
  }
};

export const getDateRanges = async () => {
  try {
    const dateRange = `/date_ranges`;
    const response = await apiFastApiClient.get(dateRange);

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error;
  }
};