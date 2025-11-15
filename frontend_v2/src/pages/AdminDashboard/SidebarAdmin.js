import { Link } from "react-router-dom";
import "../Dashboard.css";

const SidebarAdmin = () => {
  return (
    <div className={"sidebar-container"}>
      <div className="sidebar">
        {/* <Link to="/admin" className="link">
          Stats
        </Link>
        <Link to="/admin/users" className="link">
          Users
        </Link> */}
        <Link to="/admin/news" className="link">
          News
        </Link>
      </div>
    </div>
  );
};
export default SidebarAdmin;
