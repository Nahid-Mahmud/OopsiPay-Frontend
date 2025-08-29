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
import NotFound from "@/components/NotFound";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayout,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
        Component: HomePage,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/about",
        Component: About,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/features",
        Component: Features,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/faq",
        Component: FAQ,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: "/contact",
        Component: ContactPage,
        errorElement: <RouteErrorBoundary />,
      },
    ],
  },

  {
    path: "/login",
    Component: LoginPage,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/register",
    Component: RegisterPage,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/forget-password",
    Component: ForgetPasswordPage,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/reset-password",
    Component: ResetPasswordPage,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/verify-email",
    Component: VerifyEmailPage,
    errorElement: <RouteErrorBoundary />,
  },

  {
    path: "/admin",
    Component: withAuth(DashboardLayout, ["ADMIN", "SUPER_ADMIN"]),
    errorElement: <RouteErrorBoundary />,
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
    errorElement: <RouteErrorBoundary />,
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
    errorElement: <RouteErrorBoundary />,
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
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <RouteErrorBoundary />,
  },
]);
