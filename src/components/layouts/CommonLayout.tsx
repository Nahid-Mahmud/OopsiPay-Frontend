import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function CommonLayout() {
  const { pathname } = useLocation();

  return (
    <div>
      <Navbar />
      <div className={pathname === "/" ? "pt-0" : "pt-20"}>
        <Outlet />
      </div>
      {pathname !== "/" && <Footer />}
    </div>
  );
}
