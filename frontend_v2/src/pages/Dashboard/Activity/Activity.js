import "./Activity.css";
import ActivityNavbar from "./ActivityNavbar/ActivityNavbar";
import { Outlet } from "react-router-dom";

const Activity = () => {
  return (
    <section className="activity">
      <ActivityNavbar />
      <div className="activity-page">
        <Outlet />
      </div>
    </section>
  );
};
export default Activity;
