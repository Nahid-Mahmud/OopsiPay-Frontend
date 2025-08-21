import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function CommonLayout() {
  return (
    <div>
      <Navbar />
      <div className="md:pt-20 pt-10 ">
        <Outlet />
      </div>
    </div>
  );
}
