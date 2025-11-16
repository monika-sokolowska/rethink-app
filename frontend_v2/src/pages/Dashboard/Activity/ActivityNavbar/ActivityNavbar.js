import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStats } from "../../../../reducers/statsSlice";

const useStyles = createUseStyles({
  activityNav: {
    boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.15)",
    width: "100%",
    height: "20%",
  },
  activityNavbar: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    boxShadow: "3px 5px 20px rgba(0, 0, 0, 0.15)",
    padding: "1rem",
  },
  footprintDisplay: {
    color: "#2d8659",
    fontSize: "1.1rem",
    fontWeight: 600,
  },
});

const ActivityNavbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { stats } = useSelector((store) => store.stats);

  useEffect(() => {
    if (user?.id) {
      dispatch(getStats());
    }
  }, [dispatch, user?.id]);

  const dailyFootprintValue = stats?.userDailyFootprint;
  const dailyFootprint = typeof dailyFootprintValue === 'number' 
    ? dailyFootprintValue 
    : parseFloat(dailyFootprintValue) || 0;

  return (
    <div className={classes.activityNav}>
      <nav className={classes.activityNavbar}>
        <div className={classes.footprintDisplay}>
          Daily Carbon Footprint: {dailyFootprint.toFixed(2)} kg CO2
        </div>
      </nav>
    </div>
  );
};
export default ActivityNavbar;
