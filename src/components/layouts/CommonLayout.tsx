import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function CommonLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
