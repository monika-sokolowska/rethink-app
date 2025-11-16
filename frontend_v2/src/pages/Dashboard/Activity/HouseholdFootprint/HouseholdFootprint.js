import MainFootprint from "./MainFootprint/MainFootprint";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHouseholdFootprint } from "../../../../reducers/householdFootprintSlice";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  householdFootprint: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  householdFootprintButton: {
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    border: "none",
    borderRadius: "8px",
    boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "#fff",
    cursor: "pointer",
    fontFamily:
      '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: "14px",
    fontWeight: 400,
    padding: "15px 30px",
    textAlign: "center",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    touchAction: "manipulation",
    margin: "1rem",
    textDecoration: "none",
    "&:hover": {
      boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
});

const HouseholdFootprint = () => {
  const classes = useStyles();
  const { householdFootprint } = useSelector(
    (store) => store.householdFootprint
  );
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHouseholdFootprint(user.id));
  }, [dispatch, user.id]);

  return (
    <section className={classes.householdFootprint}>
      <MainFootprint footprint={householdFootprint.footprint} />
      <Link
        to="https://www.carbonfootprint.com/calculator.aspx"
        className={classes.householdFootprintButton}
        target="_blank">
        Count
      </Link>
    </section>
  );
};
export default HouseholdFootprint;
