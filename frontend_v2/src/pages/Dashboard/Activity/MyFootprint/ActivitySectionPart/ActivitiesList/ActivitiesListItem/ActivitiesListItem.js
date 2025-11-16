import { AiOutlineDelete } from "react-icons/ai";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  activitiesListItem: {
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    height: "8vh",
    margin: "1rem",
    boxShadow: "3px 10px 25px rgba(0, 0, 0, 0.25)",
  },
  itemTitle: {
    color: "black",
    margin: "1rem",
    fontSize: "15px",
  },
  itemValue: {
    color: "black",
    margin: "1rem",
    fontSize: "15px",
  },
  activitiesListItemRightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: "1rem",
  },
});

const ActivitiesListItem = ({ name, footprint, info, handleDelete }) => {
  const classes = useStyles();
  return (
    <div className={classes.activitiesListItem}>
      <h3 className={classes.itemTitle}>{name}</h3>
      {info && <h3 className={classes.itemTitle}>{info}</h3>}
      <div className={classes.activitiesListItemRightSide}>
        <h1 className={classes.itemValue}>{footprint} kg CO2</h1>
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
