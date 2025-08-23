import Profile from "@/components/Profile";
import AllAgents from "@/pages/admin/AllAgents";
import AllTransactions from "@/pages/admin/AllTransactions";
import AllUsersPage from "@/pages/admin/AllUsers";
import AllWallets from "@/pages/admin/AllWallets";
import Analytics from "@/pages/admin/Analytics";
import type { ISidebarItem } from "@/types";
import { List } from "lucide-react";

export const AdminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        Component: Analytics,
        icon: <List />,
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
      },
      {
        title: "All Agents",
        url: "/admin/agents",
        Component: AllAgents,
      },
    ],
  },
  {
    title: "Wallets",
    url: "#",
    items: [
      {
        title: "All Wallets",
        url: "/admin/wallets",
        Component: AllWallets,
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
      },
    ],
  },
];
