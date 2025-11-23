import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNavbar from "./BottomNavbar";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    lineHeight: 1.75,
    fontWeight: 400,
    height: "100%",
  },
  dashboard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    overflow: "hidden",
  },
  dashboardPage: {
    flex: 1,
    margin: "0 auto",
    minWidth: 0,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "@media (max-width: 768px)": {
      paddingBottom: "70px",
    },
  },
  "@media (max-width: 768px)": {
    dashboard: {
      flexDirection: "row",
    },
    dashboardPage: {
      padding: "0.5rem",
    },
  },
  "@media (max-width: 480px)": {
    dashboard: {
      flexDirection: "row",
    },
    dashboardPage: {
      padding: "0.25rem",
    },
  },
});

const SharedLayout = () => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Navbar />
      <div className={classes.dashboard}>
        <Sidebar />
        <div className={classes.dashboardPage}>
          <Outlet />
        </div>
      </div>
      <BottomNavbar />
    </main>
  );
};
export default SharedLayout;
