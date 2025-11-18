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
    color: "#2d8659",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    border: "none",
    borderRadius: "8px",
    boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
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
    "&:hover": {
      boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
  "@media (max-width: 768px)": {
    activitySectionPartHeader: {
      width: "95%",
    },
    activitySectionPartLabel: {
      fontSize: "24px",
    },
    button: {
      padding: "18px 36px",
      fontSize: "18px",
      minHeight: "56px",
    },
  },
  "@media (max-width: 480px)": {
    activitySectionPartHeader: {
      width: "98%",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    activitySectionPartLabel: {
      fontSize: "22px",
      margin: "0.5rem 1rem",
    },
    button: {
      padding: "16px 32px",
      fontSize: "16px",
      minHeight: "54px",
      margin: "0.5rem 1rem",
    },
  },
});

const ActivitySectionPart = ({ label, data, onAddButton, activityType }) => {
  const classes = useStyles();
  return (
    <div className={classes.activitySectionPart}>
      <div className={classes.activitySectionPartHeader}>
        <div className={classes.activitySectionPartLabel}>{label}</div>
        <button className={classes.button} onClick={onAddButton}>
          Add
        </button>
      </div>
      <ActivitiesList data={data} activityType={activityType} />
    </div>
  );
};
export default ActivitySectionPart;
