import firstPage from "../../assets/images/firstPage.svg";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginUserFlow } from "../../reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  loginPageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 25%, #6bb884 50%, #8dd19f 75%, #a8e4b8 100%)",
    backgroundAttachment: "fixed",
  },
  loginPage: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    minHeight: "calc(100vh - 80px)",
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
  loginForm: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridGap: "0.5rem 1rem",
    justifyItems: "center",
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
  logInBtn: {
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
  registerLink: {
    fontSize: "15px",
    color: "white",
    textAlign: "center",
    margin: "0.5rem",
    textDecoration: "none",
  },
});

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const LoginPage = () => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      if (user.roles.includes("ROLE_ADMIN")) navigate("/admin");
      else navigate("/home");
    }
  }, [navigate, user]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, isMember } = values;
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUserFlow({ email: email, password: password }));
      return;
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  return (
    <div className={classes.loginPageContainer}>
      <Header />

      <div className={classes.loginPage}>
        <div className={classes.empty}>
          <img className={classes.firstPage} src={firstPage} alt="firstPage" />
        </div>

        <div className={classes.info}>
          <form className={classes.loginForm} onSubmit={onSubmit}>
            <div className={classes.input}>
              <label htmlFor="email">Login</label>
              <input
                type="text"
                id="email"
                onChange={handleChange}
                name="email"
                value={values.email}
              />
            </div>
            <div className={classes.input}>
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                name="password"
                value={values.password}
              />
            </div>
            <input
              type="submit"
              value="Log in"
              className={classes.logInBtn}
            />
            <Link to="/register" className={classes.registerLink}>
              Create an account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
