import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import { type TRole } from "@/types";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import { agentSidebarItems } from "./agentSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "feature",
      },
      {
        Component: Pricing,
        path: "pricing",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: FAQ,
        path: "faq",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/agent/analytics" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  // {
  //   Component: Verify,
  //   path: "/verify",
  // },
  // {
  //   Component: Unauthorized,
  //   path: "/unauthorized",
  // },
]);
