import ActivityNavbar from "./ActivityNavbar/ActivityNavbar";
import { Outlet } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  activity: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  activityPage: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0",
      height: "0",
    },
  },
  "@media (max-width: 768px)": {
    activity: {
      padding: "0.5rem",
    },
  },
  "@media (max-width: 480px)": {
    activity: {
      padding: "0.25rem",
    },
  },
});

const Activity = () => {
  const classes = useStyles();
  return (
    <section className={classes.activity}>
      <ActivityNavbar />
      <div className={classes.activityPage}>
        <Outlet />
      </div>
    </section>
  );
};
export default Activity;
