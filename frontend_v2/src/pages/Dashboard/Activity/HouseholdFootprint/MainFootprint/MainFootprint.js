import { AiOutlineEdit } from "react-icons/ai";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainFootprint: {
    background: "rgb(228, 245, 233)",
    boxShadow: "0 4px 12px rgba(45, 134, 89, 0.2)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    margin: "1rem",
    marginTop: "2rem",
  },
  title: {
    color: "#2d8659",
    textAlign: "start",
    margin: "1rem",
    marginLeft: "2rem",
    width: "60%",
    fontSize: "18px",
    fontWeight: 600,
  },
  carbonFootprintHousehold: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footprintValue: {
    fontSize: "18px",
    color: "#2d8659",
    textAlign: "center",
    margin: "1rem",
    fontWeight: 600,
  },
  editIcon: {
    color: "#2d8659",
    marginRight: "2rem",
    height: "80%",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      color: "#1a5a3f",
      transform: "scale(1.1)",
    },
  },
  "@media (max-width: 768px)": {
    mainFootprint: {
      width: "95%",
      margin: "0.75rem",
      marginTop: "1.5rem",
    },
    title: {
      fontSize: "22px",
      marginLeft: "1.5rem",
    },
    footprintValue: {
      fontSize: "22px",
    },
    editIcon: {
      marginRight: "1.5rem",
    },
  },
  "@media (max-width: 480px)": {
    mainFootprint: {
      width: "98%",
      margin: "0.5rem",
      marginTop: "1rem",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    title: {
      fontSize: "20px",
      marginLeft: "1rem",
      width: "100%",
    },
    footprintValue: {
      fontSize: "20px",
    },
    editIcon: {
      marginRight: "1rem",
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
