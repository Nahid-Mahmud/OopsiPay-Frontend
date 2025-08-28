import "driver.js/dist/driver.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";
import store from "./redux/store.ts";
import { router } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster richColors duration={3000} closeButton position="top-right" />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
