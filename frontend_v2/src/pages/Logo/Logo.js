import logo from "../../assets/images/logo.svg";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  logo: {
    width: "auto",
    maxWidth: "200px",
    height: "3vh",
    margin: "2rem",
    padding: "0",
    boxSizing: "border-box",
    display: "block",
  },
});

const Logo = () => {
  const classes = useStyles();
  return <img src={logo} className={classes.logo} alt="logo" />;
};

export default Logo;
