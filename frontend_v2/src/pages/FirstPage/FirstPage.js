import firstPage from "../../assets/images/firstPage.svg";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  emptyPage: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  empty: {
    height: "auto",
    width: "50%",
    margin: "5rem",
  },
  firstPage: {
    height: "auto",
    width: "80%",
    margin: "5rem",
  },
  info: {
    height: "auto",
    width: "50%",
    margin: "5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& h1": {
      fontSize: "30px",
      color: "white",
      textAlign: "center",
    },
    "& h4": {
      fontSize: "20px",
      color: "white",
      fontWeight: 400,
      height: "30%",
      width: "100%",
      margin: "4rem",
      textAlign: "center",
    },
  },
  buttons: {
    width: "20rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "30%",
  },
  logIn: {
    backgroundColor: "rgb(0, 0, 0)",
    border: "1px solid rgb(0, 0, 0)",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "#fff",
    cursor: "pointer",
    fontFamily:
      '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: "14px",
    fontWeight: 400,
    padding: "15px 30px",
    textAlign: "center",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    touchAction: "manipulation",
    textDecoration: "none",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.15) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
  signUp: {
    backgroundColor: "rgb(0, 0, 0)",
    border: "1px solid rgb(0, 0, 0)",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "#fff",
    cursor: "pointer",
    fontFamily:
      '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: "14px",
    fontWeight: 400,
    padding: "15px 30px",
    textAlign: "center",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    touchAction: "manipulation",
    textDecoration: "none",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.15) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
});

const FirstPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className={classes.emptyPage}>
        <div className={classes.info}>
          <h1>Track your carbon footprint</h1>
          <h4>
            We all need to reduce our energy consumption if we want to protect
            our planet, but the concept of "energy saving" is rather abstract.
            Knowing your exact carbon footprint and then tracking how much
            energy you have saved can give you a better idea of your
            contribution to a greener environment.
          </h4>
          <div className={classes.buttons}>
            <Link to="/login" className={classes.logIn}>
              Log in
            </Link>
            <Link to="/register" className={classes.signUp}>
              Sign up
            </Link>
          </div>
        </div>
        <div className={classes.empty}>
          <img className={classes.firstPage} src={firstPage} alt="firstPage" />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
