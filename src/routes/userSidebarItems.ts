import Deposit from "@/pages/User/Deposit";
import Overview from "@/pages/User/Overview";
import Profile from "@/pages/User/Profile";
import SendMoney from "@/pages/User/SendMoney";
import TransactionHistory from "@/pages/User/TransactionHistory";
import Withdraw from "@/pages/User/Withdraw";
import { type ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: Overview,
      },
      {
        title: "Deposit",
        url: "/user/deposit",
        component: Deposit,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        component: Withdraw,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "Transaction History",
        url: "/user/transaction-history",
        component: TransactionHistory,
      },
      {
        title: "Profile",
        url: "/user/profile",
        component: Profile,
      },
    ],
  },
];
