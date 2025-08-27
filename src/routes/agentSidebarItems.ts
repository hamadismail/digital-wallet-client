// import Analytics from "@/pages/Admin/Analytics";
import AddMoney from "@/pages/Agent/AddMoney";
// import Overview from "@/pages/Agent/Overview";
import Profile from "@/pages/Agent/Profile";
// import TransactionHistory from "@/pages/Agent/TransactionHistory";
import Withdraw from "@/pages/Agent/Withdraw";
import { type ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Agent Dashboard",
    items: [
      // {
      //   title: "Overview",
      //   url: "/agent/overview",
      //   component: Overview,
      // },
      {
        title: "Add Money",
        url: "/agent/add-money",
        component: AddMoney,
      },
      {
        title: "Withdraw",
        url: "/agent/withdraw",
        component: Withdraw,
      },
      // {
      //   title: "Transaction History",
      //   url: "/agent/transaction-history",
      //   component: TransactionHistory,
      // },
      {
        title: "Profile",
        url: "/agent/profile",
        component: Profile,
      },
    ],
  },
];
