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
  "@media (max-width: 768px)": {
    logo: {
      filter:
        "brightness(0) saturate(100%) invert(25%) sepia(95%) saturate(1500%) hue-rotate(100deg) brightness(70%) contrast(90%)",
    },
  },
  "@media (max-width: 480px)": {
    logo: {
      filter:
        "brightness(0) saturate(100%) invert(25%) sepia(95%) saturate(1500%) hue-rotate(100deg) brightness(70%) contrast(90%)",
    },
  },
});

const Logo = () => {
  const classes = useStyles();
  return <img src={logo} className={classes.logo} alt="logo" />;
};

export default Logo;
