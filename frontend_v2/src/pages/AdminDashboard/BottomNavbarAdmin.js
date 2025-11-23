import { NavLink } from "react-router-dom";
import { createUseStyles } from "react-jss";
import {
  AiOutlineBarChart,
  AiOutlineRead,
  AiOutlineUser,
} from "react-icons/ai";

const useStyles = createUseStyles({
  bottomNavbar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTop: "1px solid rgba(45, 134, 89, 0.2)",
    boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
    display: "none",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0.75rem 0",
    zIndex: 1000,
    "@media (max-width: 768px)": {
      display: "flex",
    },
  },
  navLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "#2d8659",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    transition: "all 0.2s ease-in-out",
    minWidth: "60px",
    "&:hover": {
      backgroundColor: "rgba(45, 134, 89, 0.1)",
    },
  },
  activeNavLink: {
    color: "#ffffff",
    backgroundColor: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    boxShadow: "0 2px 8px rgba(45, 134, 89, 0.3)",
    "&:hover": {
      backgroundColor: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
      background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    },
  },
  icon: {
    fontSize: "1.5rem",
    marginBottom: "0.25rem",
  },
  label: {
    fontSize: "0.7rem",
    fontWeight: 500,
    textAlign: "center",
  },
  "@media (max-width: 480px)": {
    bottomNavbar: {
      padding: "0.5rem 0",
    },
    navLink: {
      padding: "0.4rem 0.5rem",
      minWidth: "50px",
    },
    icon: {
      fontSize: "1.25rem",
    },
    label: {
      fontSize: "0.65rem",
    },
  },
});

const BottomNavbarAdmin = () => {
  const classes = useStyles();

  const navItems = [
    {
      to: "/admin",
      end: true,
      icon: AiOutlineBarChart,
      label: "Stats",
    },
    {
      to: "/admin/news",
      icon: AiOutlineRead,
      label: "News",
    },
    {
      to: "/admin/personalInformation",
      icon: AiOutlineUser,
      label: "My Info",
    },
  ];

  return (
    <nav className={classes.bottomNavbar}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `${classes.navLink} ${isActive ? classes.activeNavLink : ""}`
            }>
            <Icon className={classes.icon} />
            <span className={classes.label}>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNavbarAdmin;
