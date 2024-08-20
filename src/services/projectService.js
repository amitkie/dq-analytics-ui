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
  export const getProjectDetailsByUserId = async (userId) => { // This APi will give the project lists
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

  export const getBenchamarkValues = async(data) =>{
    try {
      const response = await axios.post(
        `https://dab4-2409-40e0-1014-81f5-84ec-8b9f-ebf4-bf9f.ngrok-free.app/process_metric`,data
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
  }