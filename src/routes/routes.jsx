import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../pages/login";
import Home from "../pages/home/home";
import Layout from "../layout/Layout";
import WorkSpace from "../pages/workSpace/workSpace";
import Analytics from "../pages/analytics/Analytics";
import Insights from "../pages/insights/Insights";
import HealthCard from "../pages/healthcard/HealthCard";
import HealthCardOverview from "../pages/healthcard/overview/HealthCardOverview";

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
    path: "/analytics",
    element: (
      <Layout>
        <Analytics />
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
    path: "/healthcardoverview",
    element: (
      <Layout>
        <HealthCardOverview />
      </Layout>
    ),
  },
  {
    path: "/settings",
    element: (
      <Layout>
        <Insights />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <Insights />
      </Layout>
    ),
  },
]);

export default router;
