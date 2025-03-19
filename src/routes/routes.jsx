import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import CheckToken from "../pages/CheckToken";
import Home from "../pages/home/home";
import Layout from "../layout/Layout";
import WorkSpace from "../pages/workSpace/workSpace";
import Analytics from "../pages/analytics/Analytics";
import Insights from "../pages/insights/Insights";
import HealthCard from "../pages/healthcard/HealthCard";
import HealthCardOverview from "../pages/healthcard/overview/HealthCardOverview";
import Settings from "../pages/Settings/Settings";
import About from "../pages/About/About";
import SuperThemes from "../components/SuperThemes/SuperThemes";
import Help from "../components/Help/Help";
import HealthCardReport from "../pages/healthcard/HealthCardReport";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/token" replace />;
};

const router = createBrowserRouter([
  {
    path: "/token",
    element: <CheckToken />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute><Layout /></ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/workspace",
        element: <WorkSpace />,
      },
      {
        path: "/analytics/:projectId",
        element: <Analytics />
      },
      {
        path: "/superthemes",
        element: <SuperThemes />,
      },
      {
        path: "/insights/:projectId/:projectName",
        element: <Insights />,
      },
      {
        path: "/insights",
        element: <Insights />,
      },
      {
        path: "/healthcard",
        element: <HealthCard />,
      },
      {
        path: "/healthcardoverview/:brand/:projectId",
        element: <HealthCardOverview />,
      },
      {
        path: "/healthcardreport/:brand/:projectId",
        element: <HealthCardReport />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/help",
        element: <Help />,
      },
    ]
  },
]);

export default router;
