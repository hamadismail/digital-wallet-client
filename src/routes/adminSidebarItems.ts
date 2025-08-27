// import Analytics from "@/pages/Admin/Analytics";
import ManageAgents from "@/pages/Admin/ManageAgents";
import ManageUsers from "@/pages/Admin/ManageUsers";
import Overview from "@/pages/Admin/Overview";
import Profile from "@/pages/Admin/Profile";
import Transactions from "@/pages/Admin/Transactions";
import { type ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: Overview,
      },
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        component: ManageUsers,
      },
      {
        title: "Manage Agents",
        url: "/admin/manage-agents",
        component: ManageAgents,
      },
      {
        title: "Transactions",
        url: "/admin/transactions",
        component: Transactions,
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: Profile,
      },
    ],
  },
];
