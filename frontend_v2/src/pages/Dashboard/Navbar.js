import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { clearStore } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navbar: {
    background: "rgb(17, 20, 48)",
    boxShadow: "3px 10px 25px rgba(0, 0, 0, 0.25)",
    display: "flex",
    alignItems: "center",
    height: "10%",
  },
  links: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "right",
    paddingRight: "3rem",
    width: "100%",
  },
  logOut: {
    color: "white",
    textDecoration: "none",
  },
});

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <nav className={classes.navbar}>
      <Logo />
      <div className={classes.links}>
        <Link
          to="/"
          className={classes.logOut}
          onClick={() => dispatch(clearStore("Logging out..."))}>
          Log out
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
