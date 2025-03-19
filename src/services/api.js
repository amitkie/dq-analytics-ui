import axios from "axios";
import { toast } from "react-toastify";

const NODEJS_API_BASE_URL = process.env.REACT_APP_DQ_NODEJS_SERVER_URL;
const FASTAPI_API_BASE_URL = process.env.REACT_APP_DQ_FASTAPI_SERVER_URL;

const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Create an Axios instance with interceptor
const apiNodeJSClient = axios.create({
  baseURL: NODEJS_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const apiFastApiClient = axios.create({
  baseURL: FASTAPI_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach token
apiNodeJSClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiFastApiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 and 403 errors
apiNodeJSClient.interceptors.response.use(
  (response) => response, // Return response if successful
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Redirecting to login...");

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      const urlObject = new URL(window.location.href);
      // Extract the token URL (protocol + hostname + port)
      const tokenUrl = `${urlObject.protocol}//${urlObject.host}/token`;

      window.location.href = `${process.env.REACT_APP_ONBOARDING_PORTAL_FRONTEND_URL}/login?redirect=${tokenUrl}`;
    } else if (error.response?.status === 403) {
      toast.error("Tool not subscribed. Redirecting to onboarding portal...");

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      window.location.href = `${process.env.REACT_APP_ONBOARDING_PORTAL_FRONTEND_URL}/`;
    }

    return Promise.reject(error); // Continue rejecting other errors
  }
);

apiFastApiClient.interceptors.response.use(
  (response) => response, // Return response if successful
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Redirecting to login...");

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      window.location.href = `${process.env.REACT_APP_ONBOARDING_PORTAL_FRONTEND_URL}/login`;
    } else if (error.response?.status === 403) {
      toast.error("Tool not subscribed. Redirecting to onboarding portal...");

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      window.location.href = `${process.env.REACT_APP_ONBOARDING_PORTAL_FRONTEND_URL}/`;
    }

    return Promise.reject(error); // Continue rejecting other errors
  }
);

export {
  apiNodeJSClient,
  apiFastApiClient
};
