import firstPage from "../../assets/images/firstPage.svg";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../reducers/userSlice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  registerPage: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
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
      borderWidth: "calc(var(--border-width) * 1px)",
      borderStyle: "solid",
      borderColor: "var(--accent)",
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

  return (
    <>
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
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
