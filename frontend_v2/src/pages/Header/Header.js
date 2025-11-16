import Logo from "../Logo/Logo";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
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
