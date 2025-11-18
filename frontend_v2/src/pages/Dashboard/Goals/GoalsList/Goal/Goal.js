import { AiFillDelete, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import CircleChecked from "@mui/icons-material/CheckCircleOutline";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  goal: {
    background: "#a8e4b8",
    boxShadow: "3px 5px 15px rgba(45, 134, 89, 0.2)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    height: "50px",
    margin: "0.5rem 0",
    textOverflow: "ellipsis",
    border: "1px solid rgba(45, 134, 89, 0.2)",
    boxSizing: "border-box",
  },
  goalTitle: {
    color: "#2d8659",
    margin: "1rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "15px",
    fontWeight: 500,
  },
  editGoalButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginRight: "1rem",
  },
  "@media (max-width: 768px)": {
    goal: {
      width: "100%",
      height: "60px",
      margin: "0.5rem 0",
    },
    goalTitle: {
      fontSize: "18px",
    },
  },
  "@media (max-width: 480px)": {
    goal: {
      width: "100%",
      height: "60px",
      margin: "0.5rem 0",
      flexDirection: "row",
    },
    goalTitle: {
      fontSize: "17px",
      margin: "0.5rem",
    },
    editGoalButtons: {
      marginRight: "0.5rem",
    },
  },
});

const Goal = ({ name, deleteItem }) => {
  const classes = useStyles();
  return (
    <div className={classes.goal}>
      <Checkbox
        icon={
          <CircleUnchecked
            style={{ color: "#2d8659", marginLeft: "1rem", height: "60%" }}
          />
        }
        checkedIcon={
          <CircleChecked
            style={{ color: "#2d8659", marginLeft: "1rem", height: "60%" }}
          />
        }
        size={"small"}
      />
      <h3 className={classes.goalTitle}>{name.substring(0, 100)}</h3>
      <div className={classes.editGoalButtons}>
        <AiOutlineEdit
          size={20}
          style={{
            color: "#2d8659",
            marginRight: "1rem",
            height: "60%",
            cursor: "pointer",
          }}
        />
        <AiOutlineDelete
          size={20}
          style={{ color: "#2d8659", height: "60%", cursor: "pointer" }}
          onClick={deleteItem}
        />
      </div>
    </div>
  );
};
export default Goal;
