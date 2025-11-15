import { Link } from "react-router-dom";
import "./ActivityNavbar.css";

const ActivityNavbar = () => {
  return (
    <div className="activity-nav">
      <nav className="activity-navbar">
        <Link to="/home/activity" className="link">
          My carbon footprint
        </Link>
        <Link to="/home/activity/household" className="link">
          Household carbon footprint
        </Link>
      </nav>
    </div>
  );
};
export default ActivityNavbar;
