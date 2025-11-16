import ActivitySectionPart from "../MyFootprint/ActivitySectionPart/ActivitySectionPart";
import MainFootprint from "../HouseholdFootprint/MainFootprint/MainFootprint";
import { createUseStyles } from "react-jss";
import AddTransportModal from "../MyFootprint/AddModal/AddTransportModal/AddTransportModal";
import AddFoodModal from "../MyFootprint/AddModal/AddFoodModal/AddFoodModal";
import AddOtherModal from "../MyFootprint/AddModal/AddOtherModal/AddOtherModal";
import AddCompensatedModal from "../MyFootprint/AddModal/AddCompensatedModal/AddCompensatedModal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  getTransportFootprint,
  getFoodFootprint,
  getOtherFootprint,
  getCompensatedFootprint,
} from "../../../../reducers/dailyFootprintSlice";
import { getHouseholdFootprint } from "../../../../reducers/householdFootprintSlice";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  footprintPage: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    marginBottom: "2rem",
    gap: "2rem",
    padding: "1rem",
  },
  myFootprint: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "50%",
    height: "auto",
    backgroundColor: "white",
  },
  householdFootprint: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "50%",
    height: "auto",
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

const FootprintPage = () => {
  const classes = useStyles();
  const { user } = useSelector((store) => store.user);
  const { transport, food, other, compensated } = useSelector(
    (store) => store.footprint
  );
  const { householdFootprint } = useSelector(
    (store) => store.householdFootprint
  );
  const dispatch = useDispatch();
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [showCompensatedModal, setShowCompensatedModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(getTransportFootprint());
      dispatch(getFoodFootprint());
      dispatch(getOtherFootprint());
      dispatch(getCompensatedFootprint());
      dispatch(getHouseholdFootprint());
    }
  }, [dispatch, user?.id]);

  const openTransportAddModal = () => {
    setShowTransportModal(true);
  };

  const handleTransportModalClose = () => {
    setShowTransportModal(false);
  };

  const openFoodAddModal = () => {
    setShowFoodModal(true);
  };

  const handleFoodModalClose = () => {
    setShowFoodModal(false);
  };

  const openOtherAddModal = () => {
    setShowOtherModal(true);
  };

  const handleOtherModalClose = () => {
    setShowOtherModal(false);
  };

  const openCompensatedAddModal = () => {
    setShowCompensatedModal(true);
  };

  const handleCompensatedAddModalClose = () => {
    setShowCompensatedModal(false);
  };

  return (
    <div className={classes.footprintPage}>
      <section className={classes.myFootprint}>
        <AddTransportModal
          isOpen={showTransportModal}
          handleClose={handleTransportModalClose}
        />
        <AddFoodModal
          isOpen={showFoodModal}
          handleClose={handleFoodModalClose}
        />
        <AddOtherModal
          isOpen={showOtherModal}
          handleClose={handleOtherModalClose}
        />
        <AddCompensatedModal
          isOpen={showCompensatedModal}
          handleClose={handleCompensatedAddModalClose}
        />
        <ActivitySectionPart
          label="Transport"
          data={transport}
          onAddButton={openTransportAddModal}
        />
        <ActivitySectionPart
          label="Food"
          data={food}
          onAddButton={openFoodAddModal}
        />
        <ActivitySectionPart
          label="Other"
          data={other}
          onAddButton={openOtherAddModal}
        />
        <ActivitySectionPart
          label="Compensated"
          data={compensated}
          onAddButton={openCompensatedAddModal}
        />
      </section>

      <section className={classes.householdFootprint}>
        <MainFootprint footprint={householdFootprint?.footprint ?? 0} />
        <Link
          to="https://www.carbonfootprint.com/calculator.aspx"
          className={classes.householdFootprintButton}
          target="_blank">
          Count
        </Link>
      </section>
    </div>
  );
};

export default FootprintPage;
