import { NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  sidebarContainer: {
    background: "#b4c1cc",
    display: "flex",
    width: "20%",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
  },
  link: {
    padding: "1rem",
    background: "#dae2e9",
    boxShadow: "3px 10px 25px rgba(0, 0, 0, 0.25)",
    height: "auto",
    color: "rgb(17, 20, 48)",
    fontWeight: "bold",
    borderRadius: "10px",
    margin: "1rem",
    textDecoration: "none",
    "&:active": {
      background: "#b4c1cc",
      color: "rgb(25, 31, 82)",
    },
  },
  activeLink: {
    background: "#b4c1cc",
    color: "rgb(25, 31, 82)",
  },
});

const Sidebar = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebar}>
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            `${classes.link} ${isActive ? classes.activeLink : ""}`
          }>
          Stats
        </NavLink>
        <NavLink
          to="/home/goals"
          className={({ isActive }) =>
            `${classes.link} ${isActive ? classes.activeLink : ""}`
          }>
          Goals
        </NavLink>
        <NavLink
          to="/home/activity"
          className={({ isActive }) =>
            `${classes.link} ${isActive ? classes.activeLink : ""}`
          }>
          Today's activity
        </NavLink>
        <NavLink
          to="/home/news"
          className={({ isActive }) =>
            `${classes.link} ${isActive ? classes.activeLink : ""}`
          }>
          News
        </NavLink>
      </div>
    </div>
  );
};
export default Sidebar;
