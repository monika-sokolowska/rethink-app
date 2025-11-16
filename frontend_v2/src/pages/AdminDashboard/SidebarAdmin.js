import { NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  sidebarContainer: {
    background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
    display: "flex",
    width: "200px",
    minWidth: "200px",
    borderRight: "1px solid #e9ecef",
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
    color: "#6c757d",
    fontWeight: 500,
    fontSize: "0.9rem",
    borderRadius: "8px",
    margin: "0",
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: "#f1f3f5",
      color: "rgb(17, 20, 48)",
      transform: "translateX(4px)",
    },
  },
  activeLink: {
    background:
      "linear-gradient(90deg, rgb(17, 20, 48) 0%, rgb(25, 31, 82) 100%)",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(17, 20, 48, 0.2)",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgb(17, 20, 48) 0%, rgb(25, 31, 82) 100%)",
      transform: "translateX(4px)",
    },
  },
});

const SidebarAdmin = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebar}>
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${classes.link} ${isActive ? classes.activeLink : ""}`
          }>
          Stats
        </NavLink>
        <NavLink
          to="/admin/news"
          className={({ isActive }) =>
            `${classes.link} ${isActive ? classes.activeLink : ""}`
          }>
          News
        </NavLink>
      </div>
    </div>
  );
};
export default SidebarAdmin;
