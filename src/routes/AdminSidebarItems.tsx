import ChangePassword from "@/components/ChangePassword";
import { ChangePinPage } from "@/components/ChangePin";
import MyTransactions from "@/components/MyTransactions";
import MyWallet from "@/components/MyWallet";
import { Profile } from "@/components/Profile";

import AllAgents from "@/pages/admin/AllAgents";
import AllTransactions from "@/pages/admin/AllTransactions";
import AllUsersPage from "@/pages/admin/AllUsers";
import AllWallets from "@/pages/admin/AllWallets";
import Analytics from "@/pages/admin/Analytics";
import type { ISidebarItem } from "@/types";
import { ArrowLeftRight, ChartLine, HatGlasses, Lock, Settings, Users, Wallet } from "lucide-react";

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
    url: "/admin/transactions",
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
        url: "/admin/settings/profile",
        Component: Profile,
        icon: <Settings />,
      },
      {
        title: "Password",
        url: "/admin/settings/password",
        Component: ChangePassword,
        icon: <Lock />,
      },
      {
        title: "PIN",
        url: "/admin/settings/pin",
        Component: ChangePinPage,
        icon: <Lock />,
      },
    ],
  },
];
