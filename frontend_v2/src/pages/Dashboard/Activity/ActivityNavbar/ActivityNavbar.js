import { NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";

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
    textAlign: "center",
    fontWeight: "bold",
    boxShadow: "3px 5px 20px rgba(0, 0, 0, 0.15)",
  },
  link: {
    width: "50%",
    padding: "1rem",
    height: "auto",
    color: "rgb(0, 0, 0)",
    textDecoration: "none",
  },
  activeLink: {
    width: "50%",
    padding: "1rem",
    height: "auto",
    color: "rgb(0, 0, 0)",
  },
});

const ActivityNavbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.activityNav}>
      <nav className={classes.activityNavbar}>
        <NavLink
          to="/home/activity"
          end
          className={({ isActive }) =>
            `${classes.link} ${isActive ? classes.activeLink : ""}`
          }>
          My carbon footprint
        </NavLink>
        <NavLink
          to="/home/activity/household"
          className={({ isActive }) =>
            `${classes.link} ${isActive ? classes.activeLink : ""}`
          }>
          Household carbon footprint
        </NavLink>
      </nav>
    </div>
  );
};
export default ActivityNavbar;
