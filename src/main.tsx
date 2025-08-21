import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes/index.tsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
