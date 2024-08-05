import axios from "axios";

export const createProject = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/project/create-project", data
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