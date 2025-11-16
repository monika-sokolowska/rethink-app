import { NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  sidebarContainer: {
    background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
    display: "flex",
    width: "200px",
    minWidth: "200px",
    borderRight: "1px solid rgba(45, 134, 89, 0.2)",
    boxShadow: "2px 0 8px rgba(0, 0, 0, 0.04)",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "1.5rem 0.75rem",
    gap: "0.5rem",
  },
  link: {
    padding: "0.875rem 1rem",
    background: "transparent",
    height: "auto",
    color: "#2d8659",
    fontWeight: 500,
    fontSize: "0.9rem",
    borderRadius: "8px",
    margin: "0",
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.3)",
      color: "#1a5a3f",
      transform: "translateX(4px)",
    },
  },
  activeLink: {
    background: "linear-gradient(90deg, #2d8659 0%, #4a9d6e 100%)",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(45, 134, 89, 0.3)",
    "&:hover": {
      background: "linear-gradient(90deg, #2d8659 0%, #4a9d6e 100%)",
      transform: "translateX(4px)",
    },
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
