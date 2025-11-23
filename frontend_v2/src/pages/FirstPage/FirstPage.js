import firstPage from "../../assets/images/firstPage.svg";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  firstPageContainer: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #2d8659 0%, #4a9d6e 25%, #6bb884 50%, #8dd19f 75%, #a8e4b8 100%)",
    backgroundAttachment: "fixed",
    overflowX: "hidden",
    overflowY: "auto",
    maxWidth: "100vw",
    width: "100vw",
    boxSizing: "border-box",
    position: "relative",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0",
      height: "0",
    },
  },
  emptyPage: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    maxWidth: "100%",
    minHeight: "calc(100vh - 80px)",
    overflowX: "hidden",
    boxSizing: "border-box",
    padding: "0 1rem",
  },
  empty: {
    height: "auto",
    flex: "1 1 50%",
    maxWidth: "50%",
    margin: "1rem",
    padding: "0",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  firstPage: {
    height: "auto",
    width: "100%",
    maxWidth: "100%",
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
    display: "block",
  },
  info: {
    height: "auto",
    flex: "1 1 50%",
    maxWidth: "50%",
    margin: "1rem",
    padding: "0 1rem",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    "& h1": {
      fontSize: "30px",
      color: "white",
      textAlign: "center",
      padding: "0 1rem",
    },
    "& h4": {
      fontSize: "18px",
      color: "white",
      fontWeight: 400,
      height: "30%",
      width: "100%",
      margin: "2rem",
      marginBottom: "4rem",
      textAlign: "center",
      padding: "0 1rem",
    },
  },
  buttons: {
    width: "100%",
    maxWidth: "20rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "30%",
    boxSizing: "border-box",
    padding: "0",
  },
  logIn: {
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
    borderStyle: "none",
    boxSizing: "border-box",
    color: "#2d8659",
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
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
    borderStyle: "none",
    boxSizing: "border-box",
    color: "#2d8659",
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
  "@media (max-width: 768px)": {
    firstPageContainer: {
      "& header img": {
        filter: "brightness(0) invert(1)",
      },
    },
    emptyPage: {
      flexDirection: "column",
      padding: "2rem 1rem",
      boxSizing: "border-box",
    },
    empty: {
      width: "100%",
      maxWidth: "100%",
      display: "none",
      justifyContent: "center",
      margin: "2rem 0",
      padding: "0",
      order: 2,
      boxSizing: "border-box",
    },
    firstPage: {
      width: "60%",
      maxWidth: "100%",
      margin: "1rem auto",
      boxSizing: "border-box",
    },
    info: {
      width: "100%",
      maxWidth: "100%",
      margin: "2rem 0",
      padding: "0 1.5rem",
      order: 1,
      boxSizing: "border-box",
      "& h1": {
        fontSize: "32px",
        padding: "0 1rem",
      },
      "& h4": {
        fontSize: "20px",
        margin: "1.5rem",
        padding: "0 1rem",
      },
    },
    buttons: {
      width: "100%",
      maxWidth: "300px",
      flexDirection: "column",
      gap: "1rem",
      "& a": {
        width: "auto",
        minWidth: "150px",
        textAlign: "center",
      },
    },
  },
  "@media (max-width: 480px)": {
    firstPageContainer: {
      "& header img": {
        filter: "brightness(0) invert(1)",
      },
    },
    emptyPage: {
      padding: "1rem",
      paddingTop: 0,
      boxSizing: "border-box",
    },
    empty: {
      display: "none",
      margin: "1rem 0",
      padding: "0",
      boxSizing: "border-box",
    },
    firstPage: {
      width: "80%",
      maxWidth: "100%",
      margin: "0.5rem auto",
      boxSizing: "border-box",
    },
    info: {
      margin: "1rem 0",
      padding: "0 1rem",
      boxSizing: "border-box",
      "& h1": {
        fontSize: "28px",
        padding: "0 0.5rem",
        marginTop: 0,
      },
      "& h4": {
        fontSize: "18px",
        margin: "1rem",
        padding: "0 0.5rem",
      },
    },
    buttons: {
      maxWidth: "300px",
      gap: "2rem",
      "& a": {
        padding: "12px 20px",
        fontSize: "16px",
        width: "auto",
        minWidth: "200px",
        minHeight: "50px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
});

const FirstPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      if (user.roles.includes("ROLE_ADMIN")) navigate("/admin");
      else navigate("/home");
    }
  }, [navigate, user]);

  return (
    <div className={classes.firstPageContainer}>
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
