import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function CommonLayout() {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div>
      <Navbar />
      <div className={pathname === "/" ? "pt-0" : "pt-20"}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
