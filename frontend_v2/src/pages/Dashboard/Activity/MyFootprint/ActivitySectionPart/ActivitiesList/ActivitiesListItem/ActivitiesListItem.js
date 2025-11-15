import "./ActivitiesListItem.css";
import { AiOutlineDelete } from "react-icons/ai";

const ActivitiesListItem = ({ name, footprint, info, handleDelete }) => {
  return (
    <div className="activities-list-item">
      <h3>{name}</h3>
      {info && <h3>{info}</h3>}
      <div className="activities-list-item-right-side">
        <h1>{footprint} kg CO2</h1>
        <AiOutlineDelete
          size={25}
          style={{
            color: "rgb(17, 20, 48)",
            marginRight: "1rem",
            height: "80%",
          }}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
export default ActivitiesListItem;
