import axios from "axios";

export const login = async (data) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/login", 
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

export const getAllCategories = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/master/get-all-brands");

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
    const response = await axios.post("http://localhost:8080/api/v1/master/get-all-categories", 
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

export const getAllCategoriesByBrandId = async (category_id) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/master/get-all-categories-by-brand-id/${category_id}`);

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
    const response = await axios.post("http://localhost:8080/api/v1/master/get-all-sections");

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
    const response = await axios.post("http://localhost:8080/api/v1/master/get-all-platforms");

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
    const response = await axios.post(`http://localhost:8080/api/v1/master/get-all-platforms-by-section-id/${section_id}`);

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
    const response = await axios.post("http://localhost:8080/api/v1/master/get-all-metrics");

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


export const getAllMetricsByPlatformId = async (platform_id) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/master/get-all-metrics-by-platform-id/${platform_id}`);

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
    const response = await axios.post("http://localhost:8080/api/v1/master/get-all-benchmarks");

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
    const response = await axios.post("http://localhost:8080/api/v1/master/get-all-frequencies");

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