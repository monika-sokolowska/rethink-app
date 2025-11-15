import "./HouseholdFootprint.css";
import MainFootprint from "./MainFootprint/MainFootprint";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHouseholdFootprint } from "../../../../reducers/householdFootprintSlice";
import { Link } from "react-router-dom";

const HouseholdFootprint = () => {
  const { householdFootprint } = useSelector(
    (store) => store.householdFootprint
  );
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHouseholdFootprint(user.id));
  }, [dispatch, user.id]);

  return (
    <section className="household-footprint">
      <MainFootprint footprint={householdFootprint.footprint} />
      <Link
        to="https://www.carbonfootprint.com/calculator.aspx"
        className="household-footprint-button"
        target="_blank">
        Count
      </Link>
    </section>
  );
};
export default HouseholdFootprint;
