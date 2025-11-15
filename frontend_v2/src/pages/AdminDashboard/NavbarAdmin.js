import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "../Dashboard.css";
import { clearStore } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";

const NavbarAdmin = () => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <Logo />
      <div className="links">
        <Link
          to="/"
          className="log-out"
          onClick={() => dispatch(clearStore("Logging out..."))}
        >
          Log out
        </Link>
      </div>
    </nav>
  );
};
export default NavbarAdmin;
