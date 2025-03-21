import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/login";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/workspace",
    element: (
      <Layout>
        <WorkSpace />
      </Layout>
    ),
  },
  {
    path: "/analytics/:projectId",
    element: (
      <Layout>
        <Analytics />
      </Layout>
    ),
  },
  {
    path: "/superthemes",
    element: (
      <Layout>
        <SuperThemes />
      </Layout>
    ),
  },
  {
    path: "/insights/:projectId/:projectName",
    element: (
      <Layout>
        <Insights />
      </Layout>
    ),
  },
  {
    path: "/insights",
    element: (
      <Layout>
        <Insights />
      </Layout>
    ),
  },
  {
    path: "/healthcard",
    element: (
      <Layout>
        <HealthCard />
      </Layout>
    ),
  },
  {
    path: "/healthcardoverview/:brand/:projectId",
    element: (
      <Layout>
        <HealthCardOverview />
      </Layout>
    ),
  },
  {
    path: "/healthcardreport/:brand/:projectId",
    element: (
      <Layout>
        <HealthCardReport />
      </Layout>
    ),
  },
  {
    path: "/settings",
    element: (
      <Layout>
        <Settings />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/help",
    element: (
      <Layout>
        <Help />
      </Layout>
    ),
  },
]);

export default router;
