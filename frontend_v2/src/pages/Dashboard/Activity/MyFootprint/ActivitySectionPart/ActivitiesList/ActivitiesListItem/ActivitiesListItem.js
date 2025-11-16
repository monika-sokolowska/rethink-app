import { AiOutlineDelete } from "react-icons/ai";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  activitiesListItem: {
    background: "rgb(228, 245, 233)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    height: "8vh",
    margin: "1rem",
    boxShadow: "0 4px 12px rgba(45, 134, 89, 0.15)",

    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: "0 6px 16px rgba(45, 134, 89, 0.25)",
      transform: "translateY(-2px)",
    },
  },
  itemTitle: {
    color: "#2d8659",
    margin: "1rem",
    fontSize: "15px",
    fontWeight: 500,
  },
  itemValue: {
    color: "#2d8659",
    margin: "1rem",
    fontSize: "15px",
    fontWeight: 600,
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
            color: "#2d8659",
            marginRight: "1rem",
            height: "80%",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
          }}
          onClick={handleDelete}
          onMouseEnter={(e) => (e.target.style.color = "#1a5a3f")}
          onMouseLeave={(e) => (e.target.style.color = "#2d8659")}
        />
      </div>
    </div>
  );
};
export default ActivitiesListItem;
