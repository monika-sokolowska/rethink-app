import { Outlet } from "react-router-dom";
import Navbar from "./NavbarAdmin";
import Sidebar from "./SidebarAdmin";
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
  },
  dashboardPage: {
    flex: 1,
    margin: "0 auto",
    minWidth: 0,
  },
});

const SharedAdminLayout = () => {
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
    </main>
  );
};
export default SharedAdminLayout;
