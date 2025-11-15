import { Link } from "react-router-dom";
import "../Dashboard.css";

const Sidebar = () => {
  return (
    <div className={"sidebar-container"}>
      <div className="sidebar">
        <Link to="/home" className="link">
          Stats
        </Link>
        <Link to="/home/goals" className="link">
          Goals
        </Link>
        <Link to="/home/activity" className="link">
          Today's activity
        </Link>
        <Link to="/home/news" className="link">
          News
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;
