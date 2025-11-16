import ActivitiesList from "./ActivitiesList/ActivitiesList";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  activitySectionPart: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  activitySectionPartHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  activitySectionPartLabel: {
    margin: "1rem",
    color: "black",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "rgb(17, 20, 48)",
    border: "1px solid rgb(17, 20, 48)",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "#ffffff",
    cursor: "pointer",
    fontFamily:
      '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: "14px",
    fontWeight: 400,
    padding: "15px 30px",
    textAlign: "center",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    touchAction: "manipulation",
    margin: "1rem",
  },
});

const ActivitySectionPart = ({ label, data, onAddButton }) => {
  const classes = useStyles();
  return (
    <div className={classes.activitySectionPart}>
      <div className={classes.activitySectionPartHeader}>
        <div className={classes.activitySectionPartLabel}>{label}</div>
        <button className={classes.button} onClick={onAddButton}>
          Add
        </button>
      </div>
      <ActivitiesList data={data} />
    </div>
  );
};
export default ActivitySectionPart;
