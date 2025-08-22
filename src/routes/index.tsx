import CommonLayout from "@/components/layouts/CommonLayout";
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
import { createBrowserRouter } from "react-router";

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
]);
