import stats from "../../../assets/images/stats.svg";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  stats: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});

const StatsAdmin = () => {
  const classes = useStyles();
  return (
    <section className={classes.stats}>
      <img src={stats} alt="firstPage" />
    </section>
  );
};
export default StatsAdmin;
