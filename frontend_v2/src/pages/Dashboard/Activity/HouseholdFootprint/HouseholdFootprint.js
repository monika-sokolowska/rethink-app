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
    backgroundColor: "rgb(17, 20, 48)",
    border: "1px solid rgb(17, 20, 48)",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
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
