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
    Component: DashboardLayout,
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
    Component: DashboardLayout,
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
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/agent/wallet" replace />,
      },
      ...generateRoutes(AgentSidebarItems),
    ],
  },
]);
