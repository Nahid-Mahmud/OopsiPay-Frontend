import CommonLayout from "@/components/layouts/CommonLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ForgetPasswordPage from "@/pages/auth/ForgetPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import About from "@/pages/common/About";
import ContactPage from "@/pages/common/ContactUs";
import FAQ from "@/pages/common/FAQ";
import Features from "@/pages/common/Features";
import HomePage from "@/pages/common/Home";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { UserSidebarItems } from "./UserSidebarItems";
import { AgentSidebarItems } from "./AgentSidebarItems";
import withAuth from "@/hooks/withAuth";
import UnauthorizedPage from "@/components/Unauthorized";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/features",
        Component: Features,
      },
      {
        path: "/faq",
        Component: FAQ,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
    ],
  },

  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/forget-password",
    Component: ForgetPasswordPage,
  },
  {
    path: "/reset-password",
    Component: ResetPasswordPage,
  },
  {
    path: "/verify-email",
    Component: VerifyEmailPage,
  },

  {
    path: "/admin",
    Component: withAuth(DashboardLayout, ["ADMIN", "SUPER_ADMIN"]),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/analytics" replace />,
      },
      ...generateRoutes(AdminSidebarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, ["USER"]),
    children: [
      {
        index: true,
        element: <Navigate to="/user/wallet" replace />,
      },
      ...generateRoutes(UserSidebarItems),
    ],
  },
  {
    path: "/agent",
    Component: withAuth(DashboardLayout, ["AGENT"]),
    children: [
      {
        index: true,
        element: <Navigate to="/agent/wallet" replace />,
      },
      ...generateRoutes(AgentSidebarItems),
    ],
  },
  {
    path: "/unauthorized",
    Component: UnauthorizedPage,
  },
]);
