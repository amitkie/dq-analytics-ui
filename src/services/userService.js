import { apiFastApiClient, apiNodeJSClient } from "./api";

export const checkIsLoggedIn = async () => {
  try {
    const response = await apiNodeJSClient.get(
      "/api/v1/isLoggedIn"
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    localStorage.setItem("userData", JSON.stringify(response?.data?.data));

    return response?.data?.data;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await apiNodeJSClient.post(
      "/api/v1/login",
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const {
      data: { userId },
    } = response.data;
    localStorage.setItem("userInfo", JSON.stringify(userId));

    return userId;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiNodeJSClient.post(
      "/api/v1/logout"
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    sessionStorage.clear();
    localStorage.clear();
    return response?.data?.data;
  } catch (error) {
    console.error("Error in logout:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await apiNodeJSClient.get(
      "/api/v1/master/get-all-categories"
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const categoriesData = response.data;

    return categoriesData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllBrands = async (data) => {
  try {
    const response = await apiNodeJSClient.get(
      "/api/v1/master/get-all-brands",
      data
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const brandsData = response.data;

    return brandsData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllCategoriesByBrandIds = async (category_ids) => {
  try {
    const response = await apiNodeJSClient.post(
      `/api/v1/master/get-all-categories-by-brand-ids`, {category_ids}
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const categoriesData = response.data;

    return categoriesData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllSections = async () => {
  try {
    const response = await apiNodeJSClient.get(
      "/api/v1/master/get-all-sections"
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const sectionsData = response.data;

    return sectionsData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllPlatforms = async () => {
  try {
    const response = await apiNodeJSClient.get(
      "/api/v1/master/get-all-platforms"
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const platformsData = response.data;

    return platformsData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllPlatformsBySectionId = async (section_id) => {
  try {
    const response = await apiNodeJSClient.get(
      `/api/v1/master/get-all-platforms-by-section-id/${section_id}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const platformsData = response.data;

    return platformsData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllMetrics = async () => {
  try {
    const response = await apiNodeJSClient.get(
      "/api/v1/master/get-all-metrics"
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const metricsData = response.data;

    return metricsData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllMetricsByPlatformId = async (platform_ids) => {
  try {
    const response = await apiNodeJSClient.post(
      `/api/v1/master/get-all-metrics-by-platform-ids`, {platform_ids}
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const metricsData = response.data;

    return metricsData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllPlatformsBySectionIds = async (section_ids) => {
  try {
    const response = await apiNodeJSClient.post(
      `/api/v1/master/get-all-platforms-by-section-id`, {section_ids}
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const metricsData = response.data;

    return metricsData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllBenchmarks = async () => {
  try {
    const response = await apiNodeJSClient.get(
      "/api/v1/master/get-all-benchmarks"
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const benchmarksData = response.data;

    return benchmarksData;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

export const getAllFrequencies = async () => {
  try {
    const response = await apiNodeJSClient.get(
      "/api/v1/master/get-all-frequencies"
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

export const getUserAndPaymentInfo = async (id) => {
  try {
    const response = await apiNodeJSClient.post(
      "/api/v1/get-user-data",
      {
        userId: id,
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error in getting user info:", error);
    throw error;
  }
};
export const getAllMetricsDefinition = async (metricName, platformName ) => {
  try {
    const url = `/definition/?platform_name=${platformName}&metric_name=${metricName}`;
    const response = await apiFastApiClient.get(url);

    // Check if response is OK
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching brand details:", error.response || error.message);
    throw error; 
  }
};