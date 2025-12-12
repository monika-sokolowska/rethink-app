import firstPage from "../../assets/images/firstPage.svg";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, registerAdmin } from "../../reducers/userSlice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  registerPageContainer: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #2d8659 0%, #4a9d6e 25%, #6bb884 50%, #8dd19f 75%, #a8e4b8 100%)",
    backgroundAttachment: "fixed",
    overflowX: "hidden",
    overflowY: "auto",
    maxWidth: "100vw",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0",
      height: "0",
    },
  },
  registerPage: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    maxWidth: "100%",
    minHeight: "calc(100vh - 80px)",
    overflowX: "hidden",
  },
  empty: {
    height: "auto",
    width: "50%",
  },
  firstPage: {
    height: "auto",
    width: "80%",
    margin: "5rem",
  },
  info: {
    height: "auto",
    width: "50%",
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
  registerForm: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridGap: "0.5rem 1rem",
    justifyItems: "center",
    marginBottom: "5rem",
  },
  input: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    margin: "1rem",
    "& input": {
      padding: "12px 20px",
      fontSize: "2.5vh",
      borderWidth: 0,
      borderStyle: "none",
      borderRadius: "10px",
      textAlign: "center",
      outline: "transparent",
      width: "100%",
    },
    "& label": {
      fontSize: "15px",
      color: "white",
      textAlign: "center",
      marginBottom: "0.5rem",
    },
  },
  signUpBtn: {
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
    marginTop: "1rem",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.15) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
  loginLink: {
    fontSize: "15px",
    color: "white",
    textAlign: "center",
    margin: "0.5rem",
    textDecoration: "none",
  },
  devButton: {
    backgroundColor: "#ff6b6b",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
    borderStyle: "none",
    boxSizing: "border-box",
    color: "#ffffff",
    cursor: "pointer",
    fontFamily:
      '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: "12px",
    fontWeight: 400,
    padding: "10px 20px",
    textAlign: "center",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    touchAction: "manipulation",
    marginTop: "0.5rem",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.15) 0 3px 9px 0",
      transform: "translateY(-2px)",
      backgroundColor: "#ff5252",
    },
  },
  devLabel: {
    fontSize: "10px",
    color: "#ffcc00",
    textAlign: "center",
    marginTop: "1rem",
    fontWeight: "bold",
  },
  "@media (max-width: 768px)": {
    registerPageContainer: {
      "& header img": {
        filter: "brightness(0) invert(1)",
      },
    },
    registerPage: {
      flexDirection: "column",
      padding: "2rem 1rem",
    },
    empty: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: "2rem",
    },
    firstPage: {
      width: "60%",
      margin: "2rem",
    },
    info: {
      width: "100%",
      "& h1": {
        fontSize: "24px",
      },
      "& h4": {
        fontSize: "16px",
        margin: "2rem",
      },
    },
    registerForm: {
      marginBottom: "2rem",
    },
    input: {
      width: "100%",
      "& input": {
        fontSize: "20px",
        padding: "18px 24px",
        minHeight: "50px",
      },
      "& label": {
        fontSize: "18px",
      },
    },
    signUpBtn: {
      padding: "18px 36px",
      fontSize: "18px",
      minHeight: "56px",
    },
    loginLink: {
      fontSize: "16px",
    },
  },
  "@media (max-width: 480px)": {
    registerPageContainer: {
      "& header img": {
        filter: "brightness(0) invert(1)",
      },
    },
    registerPage: {
      padding: "1rem",
    },
    empty: {
      marginBottom: "1rem",
    },
    firstPage: {
      width: "80%",
      margin: "1rem",
    },
    info: {
      "& h1": {
        fontSize: "20px",
      },
      "& h4": {
        fontSize: "14px",
        margin: "1rem",
      },
    },
    registerForm: {
      marginBottom: "1rem",
    },
    input: {
      margin: "0.5rem",
      "& input": {
        fontSize: "18px",
        padding: "16px 20px",
        minHeight: "50px",
      },
      "& label": {
        fontSize: "16px",
      },
    },
    signUpBtn: {
      padding: "16px 32px",
      fontSize: "16px",
      minHeight: "54px",
    },
    loginLink: {
      fontSize: "15px",
    },
  },
});

const initialState = {
  name: "",
  "last-name": "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registered = useSelector((state) => state.user.registered);
  const [requestSent, setRequestSent] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setValues((v) => ({ ...v, [name]: value }));
    },
    [setValues]
  );

  useEffect(() => {
    if (registered && requestSent) {
      setRequestSent(false);
      navigate("/login");
    }
  }, [navigate, registered, requestSent]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!Boolean(Object.keys(values).every((key) => values[key]))) {
        toast.error("Please fill out all fields!");
        return;
      }
      const v = {
        name: values.name,
        lastName: values["last-name"],
        email: values.email,
        password: values.password,
      };
      dispatch(registerUser(v));
      setRequestSent(true);
    },
    [dispatch, values]
  );

  const onAdminRegister = useCallback(
    (e) => {
      e.preventDefault();
      if (!Boolean(Object.keys(values).every((key) => values[key]))) {
        toast.error("Please fill out all fields!");
        return;
      }
      const v = {
        name: values.name,
        lastName: values["last-name"],
        email: values.email,
        password: values.password,
      };
      dispatch(registerAdmin(v));
      setRequestSent(true);
    },
    [dispatch, values]
  );

  return (
    <div className={classes.registerPageContainer}>
      <Header />

      <div className={classes.registerPage}>
        <div className={classes.empty}>
          <img className={classes.firstPage} src={firstPage} alt="firstPage" />
        </div>

        <div className={classes.info}>
          <form className={classes.registerForm} onSubmit={onSubmit}>
            <div className={classes.input}>
              <label htmlFor="email">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
            </div>
            <div className={classes.input}>
              <label htmlFor="email">Last name</label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                value={values["last-name"]}
                onChange={handleChange}
              />
            </div>
            <div className={classes.input}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className={classes.input}>
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <button className={classes.signUpBtn} type="submit">
              Register
            </button>
            <Link to="/login" className={classes.loginLink}>
              Log in
            </Link>
            {process.env.NODE_ENV === "development" && (
              <>
                <span className={classes.devLabel}>DEV ONLY</span>
                <button
                  type="button"
                  className={classes.devButton}
                  onClick={onAdminRegister}>
                  Register as Admin
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
