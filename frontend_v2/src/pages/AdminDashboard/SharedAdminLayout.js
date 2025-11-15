import { Outlet } from "react-router-dom";
import Navbar from "./NavbarAdmin";
import Sidebar from "./SidebarAdmin";
import "../Dashboard.css";

const SharedAdminLayout = () => {
  return (
    <main>
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default SharedAdminLayout;
