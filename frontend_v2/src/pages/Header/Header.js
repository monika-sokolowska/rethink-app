import Logo from "../Logo/Logo";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    maxWidth: "100vw",
    overflowX: "hidden",
    boxSizing: "border-box",
    position: "relative",
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <Logo />
    </header>
  );
};

export default Header;
