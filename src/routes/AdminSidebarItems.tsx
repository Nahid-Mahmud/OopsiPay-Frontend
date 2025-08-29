// import ChangePassword from "@/components/ChangePassword";
// import { ChangePinPage } from "@/components/ChangePin";
// import MyTransactions from "@/components/MyTransactions";
// import MyWallet from "@/components/MyWallet";
// import { Profile } from "@/components/Profile";

// import AllAgents from "@/pages/admin/AllAgents";
// import AllTransactions from "@/pages/admin/AllTransactions";
// import AllUsersPage from "@/pages/admin/AllUsers";
// import AllWallets from "@/pages/admin/AllWallets";

// import MyWallet from "@/components/MyWallet";
import type { ISidebarItem } from "@/types";
import { ArrowLeftRight, ChartLine, HatGlasses, Lock, Settings, Users, Wallet } from "lucide-react";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const ChangePassword = lazy(() => import("@/components/ChangePassword"));
const ChangePinPage = lazy(() => import("@/components/ChangePin"));
const MyTransactions = lazy(() => import("@/components/MyTransactions"));
const MyWallet = lazy(() => import("@/components/MyWallet"));
const Profile = lazy(() => import("@/components/Profile"));
const AllAgents = lazy(() => import("@/pages/admin/AllAgents"));
const AllTransactions = lazy(() => import("@/pages/admin/AllTransactions"));
const AllUsersPage = lazy(() => import("@/pages/admin/AllUsers"));
const AllWallets = lazy(() => import("@/pages/admin/AllWallets"));

export const AdminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        Component: Analytics,
        icon: <ChartLine />,
      },
    ],
  },
  {
    title: "My Wallet",
    url: "#",
    items: [
      {
        title: "Wallet",
        url: "/admin/wallet",
        Component: MyWallet,
        icon: <Wallet />,
      },
    ],
  },
  {
    title: "My Transactions",
    url: "#",
    items: [
      {
        title: "All Transactions",
        url: "/admin/my-transactions",
        Component: MyTransactions,
        icon: <ArrowLeftRight />,
      },
    ],
  },
  {
    title: "Users Management",
    url: "#",
    items: [
      {
        title: "All Users",
        url: "/admin/users",
        Component: AllUsersPage,
        icon: <Users />,
      },
      {
        title: "All Agents",
        url: "/admin/agents",
        Component: AllAgents,
        icon: <HatGlasses />,
      },
    ],
  },
  {
    title: "Wallet Management",
    url: "#",
    items: [
      {
        title: "All Wallets",
        url: "/admin/wallets",
        Component: AllWallets,
        icon: <Wallet />,
      },
    ],
  },
  {
    title: "Transactions",
    url: "#",
    items: [
      {
        title: "All Transactions",
        url: "/admin/transactions",
        Component: AllTransactions,
        icon: <ArrowLeftRight />,
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
        Component: Profile,
        icon: <Settings />,
      },
      {
        title: "Password",
        url: "/admin/password",
        Component: ChangePassword,
        icon: <Lock />,
      },
      {
        title: "PIN",
        url: "/admin/pin",
        Component: ChangePinPage,
        icon: <Lock />,
      },
    ],
  },
];
