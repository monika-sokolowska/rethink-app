import { AiFillDelete, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import CircleChecked from "@mui/icons-material/CheckCircleOutline";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  goal: {
    boxShadow: "3px 10px 25px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    height: "50px",
    margin: "1rem",
    textOverflow: "ellipsis",
  },
  goalTitle: {
    color: "rgb(25, 25, 25)",
    margin: "1rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "15px",
  },
  editGoalButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginRight: "1rem",
  },
});

const Goal = ({ name, deleteItem }) => {
  const classes = useStyles();
  return (
    <div className={classes.goal}>
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
      <h3 className={classes.goalTitle}>{name.substring(0, 100)}</h3>
      <div className={classes.editGoalButtons}>
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
