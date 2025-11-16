import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainGoal: {
    backgroundColor: "#ffffff",
    boxShadow: "3px 5px 20px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    padding: "1rem",
    marginBottom: "1rem",
  },
  goalDisplay: {
    color: "#2d8659",
    fontSize: "1.1rem",
    fontWeight: 600,
    marginRight: "1rem",
  },
  button: {
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    border: "none",
    borderRadius: "4px",
    boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "#ffffff",
    cursor: "pointer",
    fontFamily:
      '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: "14px",
    fontWeight: 400,
    padding: "8px 20px",
    textAlign: "center",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    touchAction: "manipulation",
    "&:hover": {
      boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
  "@media (max-width: 768px)": {
    mainGoal: {
      flexDirection: "row",
      padding: "0.75rem",
      boxShadow: "none",
    },
    goalDisplay: {
      fontSize: "1rem",
      marginRight: "0.75rem",
    },
    button: {
      padding: "6px 16px",
      fontSize: "13px",
    },
  },
  "@media (max-width: 480px)": {
    mainGoal: {
      flexDirection: "column",
      padding: "0.5rem",
      alignItems: "flex-start",
      boxShadow: "none",
    },
    goalDisplay: {
      fontSize: "0.9rem",
      marginRight: "0",
      marginBottom: "0.5rem",
    },
    button: {
      padding: "6px 14px",
      fontSize: "12px",
    },
  },
});

const MainGoal = ({ goal, handleClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.mainGoal}>
      <div className={classes.goalDisplay}>
        Carbon Footprint Goal: {goal} kg CO2
      </div>
      <button className={classes.button} onClick={handleClick}>
        Change
      </button>
    </div>
  );
};
export default MainGoal;
