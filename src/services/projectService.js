import axios from "axios";

export const createProject = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/project/create-project",
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

export const getProjectDetailsByProjectId = async (projectId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/project/get-project/?project_id=${projectId}`
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
      `http://localhost:8080/api/v1/project/get-project-by-user/?user_id=${userId}`
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
  try {
    const response = await axios.post(
      `https://c76b-2405-201-8026-1009-d125-a81-6f77-83c4.ngrok-free.app/process_metric/`,
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
export const getKPIScoreValues = async (data) => {
  try {
    const response = await axios.post(
      `https://8305-2405-201-8026-1009-59bc-f008-1a51-98df.ngrok-free.app/analytics_metric/`,
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
      `https://ebab-2405-201-8026-1009-59bc-f008-1a51-98df.ngrok-free.app/health_card/`,
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
