import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainGoal: {
    background: "#dae2e9",
    boxShadow: "3px 10px 25px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    margin: "1rem",
    marginTop: "2rem",
  },
  title: {
    color: "rgb(17, 20, 48)",
    textAlign: "start",
    margin: "1rem",
    marginLeft: "2rem",
    width: "60%",
    fontSize: "18px",
  },
  carbonFootprintGoal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goalValue: {
    fontSize: "18px",
    color: "rgb(17, 20, 48)",
    textAlign: "center",
    margin: "1rem",
  },
  button: {
    backgroundColor: "#d9d9d9",
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "rgb(17, 20, 48)",
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

const MainGoal = ({ goal, handleClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.mainGoal}>
      <h1 className={classes.title}>Carbon fotprint goal</h1>
      <div className={classes.carbonFootprintGoal}>
        <h3 className={classes.goalValue}>{goal} kg CO2</h3>
        <button className={classes.button} onClick={handleClick}>
          Change
        </button>
      </div>
    </div>
  );
};
export default MainGoal;
