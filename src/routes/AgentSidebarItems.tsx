import { lazy } from "react";
import type { ISidebarItem } from "@/types";
import { ArrowLeftRight, Lock, Settings, Wallet } from "lucide-react";

const ChangePassword = lazy(() => import("@/components/ChangePassword"));
const ChangePinPage = lazy(() => import("@/components/ChangePin"));
const MyTransactions = lazy(() => import("@/components/MyTransactions"));
const MyWallet = lazy(() => import("@/components/MyWallet"));
const Profile = lazy(() => import("@/components/Profile"));

export const AgentSidebarItems: ISidebarItem[] = [
  {
    title: "My Wallet",
    url: "#",
    items: [
      {
        title: "Wallet",
        url: "/agent/wallet",
        Component: MyWallet,
        icon: <Wallet />,
      },
    ],
  },
  {
    title: "My Transactions",
    url: "/agent/transactions",
    items: [
      {
        title: "All Transactions",
        url: "/agent/my-transactions",
        Component: MyTransactions,
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
        url: "/agent/settings/profile",
        Component: Profile,
        icon: <Settings />,
      },
      {
        title: "Password",
        url: "/agent/settings/password",
        Component: ChangePassword,
        icon: <Lock />,
      },
      {
        title: "PIN",
        url: "/agent/settings/pin",
        Component: ChangePinPage,
        icon: <Lock />,
      },
    ],
  },
];
