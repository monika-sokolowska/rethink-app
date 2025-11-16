import { AiOutlineEdit } from "react-icons/ai";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainFootprint: {
    background: "#dae2e9",
    boxShadow: "3px 10px 25px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    margin: "1rem",
    marginTop: "2rem",
  },
  title: {
    color: "rgb(17, 20, 48)",
    textAlign: "start",
    margin: "1rem",
    marginLeft: "2rem",
    width: "60%",
    fontSize: "18px",
  },
  carbonFootprintHousehold: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footprintValue: {
    fontSize: "18px",
    color: "rgb(17, 20, 48)",
    textAlign: "center",
    margin: "1rem",
  },
  editIcon: {
    color: "#fff",
    marginRight: "2rem",
    height: "80%",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
});

const MainFootprint = ({ footprint, onEditClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.mainFootprint}>
      <h1 className={classes.title}>Household carbon footprint</h1>
      <div className={classes.carbonFootprintHousehold}>
        <h3 className={classes.footprintValue}>{footprint} kg CO2</h3>
        <AiOutlineEdit
          size={25}
          className={classes.editIcon}
          onClick={onEditClick}
        />
      </div>
    </div>
  );
};
export default MainFootprint;
