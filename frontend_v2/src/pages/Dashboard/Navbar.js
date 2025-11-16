import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { clearStore } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  navbar: {
    background:
      "linear-gradient(135deg,rgb(84, 155, 123) 0%,rgb(216, 232, 223) 50%,rgb(134, 171, 145) 100%)",
    boxShadow: "3px 10px 25px rgba(0, 0, 0, 0.25)",
    display: "flex",
    alignItems: "center",
    height: "7%",
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
  "@media (max-width: 768px)": {
    navbar: {
      height: "8%",
    },
    links: {
      paddingRight: "1.5rem",
    },
    logOut: {
      fontSize: "0.9rem",
    },
  },
  "@media (max-width: 480px)": {
    navbar: {
      height: "10%",
    },
    links: {
      paddingRight: "1rem",
    },
    logOut: {
      fontSize: "0.8rem",
    },
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
