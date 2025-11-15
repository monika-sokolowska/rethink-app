import firstPage from "../../assets/images/firstPage.svg";
import Header from "../Header/Header";
import "./FirstPage.css";
import { Link } from "react-router-dom";

const FirstPage = () => {
  return (
    <div>
      <Header />
      <div className="empty-page">
        <div className="info">
          <h1>Track your carbon footprint</h1>
          <h4>
            We all need to reduce our energy consumption if we want to protect
            our planet, but the concept of "energy saving" is rather abstract.
            Knowing your exact carbon footprint and then tracking how much
            energy you have saved can give you a better idea of your
            contribution to a greener environment.
          </h4>
          <div className="buttons">
            <Link to="/login" className="log-in">
              Log in
            </Link>
            <Link to="/register" className="sign-up">
              Sign up
            </Link>
          </div>
        </div>
        <div className="empty">
          <img className="first-page" src={firstPage} alt="firstPage" />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
