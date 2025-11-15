import "./Goal.css";
import { AiFillDelete, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import CircleChecked from "@mui/icons-material/CheckCircleOutline";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";

const Goal = ({ name, deleteItem }) => {
  return (
    <div className="goal">
      <Checkbox
        icon={
          <CircleUnchecked
            style={{ color: "#000", marginLeft: "1rem", height: "60%" }}
          />
        }
        checkedIcon={
          <CircleChecked
            style={{ color: "#000", marginLeft: "1rem", height: "60%" }}
          />
        }
        size={"small"}
      />
      <h3>{name.substring(0, 100)}</h3>
      <div className="edit-goal-buttons">
        <AiOutlineEdit
          size={20}
          style={{ color: "#000", marginRight: "1rem", height: "60%" }}
        />
        <AiOutlineDelete
          size={20}
          style={{ color: "#000", height: "60%" }}
          onClick={deleteItem}
        />
      </div>
    </div>
  );
};
export default Goal;
