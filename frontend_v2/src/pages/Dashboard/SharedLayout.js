import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../Dashboard.css";

const SharedLayout = () => {
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
export default SharedLayout;
