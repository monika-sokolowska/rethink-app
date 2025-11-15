import ActivitiesList from "./ActivitiesList/ActivitiesList";
import "./ActivitySectionPart.css";

const ActivitySectionPart = ({ label, data, onAddButton }) => {
  return (
    <div className="activity-section-part">
      <div className="activity-section-part-header">
        <div className="activity-section-part-label">{label}</div>
        <button onClick={onAddButton}>Add</button>
      </div>
      <ActivitiesList data={data} />
    </div>
  );
};
export default ActivitySectionPart;
