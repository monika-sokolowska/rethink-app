import logo from "../../assets/images/logo.svg";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  logo: {
    width: "auto",
    height: "4vh",
    margin: "2rem",
  },
});

const Logo = () => {
  const classes = useStyles();
  return <img src={logo} className={classes.logo} alt="logo" />;
};

export default Logo;
