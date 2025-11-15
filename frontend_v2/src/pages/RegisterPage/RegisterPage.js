import firstPage from "../../assets/images/firstPage.svg";
import Header from "../Header/Header";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../reducers/userSlice";

const initialState = {
  name: "",
  "last-name": "",
  email: "",
  password: "",
};

const RegisterPage = () => {
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

      <div className="register-page">
        <div className="empty">
          <img className="first-page" src={firstPage} alt="firstPage" />
        </div>

        <div className="info">
          <form className="register-form" onSubmit={onSubmit}>
            <div className="input">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
            </div>
            <div className="input">
              <label htmlFor="email">Last name</label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                value={values["last-name"]}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <button className="sign-up-btn">Register</button>
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
