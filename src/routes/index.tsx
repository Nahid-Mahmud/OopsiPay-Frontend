import CommonLayout from "@/components/layouts/CommonLayout";
import About from "@/pages/About";
import HomePage from "@/pages/Home";
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
    ],
  },
]);
