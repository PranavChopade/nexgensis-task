import Navbar from "./dashboard/Navbar"
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default DashboardLayout
