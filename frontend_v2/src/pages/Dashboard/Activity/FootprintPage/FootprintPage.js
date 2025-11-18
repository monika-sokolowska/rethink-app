import ActivitySectionPart from "../MyFootprint/ActivitySectionPart/ActivitySectionPart";
import MainFootprint from "../HouseholdFootprint/MainFootprint/MainFootprint";
import { createUseStyles } from "react-jss";
import AddTransportModal from "../MyFootprint/AddModal/AddTransportModal/AddTransportModal";
import AddFoodModal from "../MyFootprint/AddModal/AddFoodModal/AddFoodModal";
import AddOtherModal from "../MyFootprint/AddModal/AddOtherModal/AddOtherModal";
import AddCompensatedModal from "../MyFootprint/AddModal/AddCompensatedModal/AddCompensatedModal";
import ChangeHouseholdFootprintModal from "../HouseholdFootprint/ChangeModal/ChangeHouseholdFootprintModal";
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
  "@media (max-width: 768px)": {
    footprintPage: {
      flexDirection: "column",
      gap: "1.5rem",
      padding: "0.75rem",
      marginBottom: "5rem",
    },
    myFootprint: {
      width: "100%",
    },
    householdFootprint: {
      width: "100%",
      marginBottom: "4rem",
    },
    householdFootprintButton: {
      padding: "18px 36px",
      fontSize: "18px",
      minHeight: "56px",
    },
  },
  "@media (max-width: 480px)": {
    footprintPage: {
      gap: "1rem",
      padding: "0.5rem",
      marginBottom: "3rem",
    },
    householdFootprintButton: {
      padding: "16px 32px",
      fontSize: "16px",
      minHeight: "54px",
    },
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
  const [showHouseholdFootprintModal, setShowHouseholdFootprintModal] =
    useState(false);

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

  const openHouseholdFootprintModal = () => {
    setShowHouseholdFootprintModal(true);
  };

  const handleHouseholdFootprintModalClose = () => {
    setShowHouseholdFootprintModal(false);
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
          activityType="transport"
        />
        <ActivitySectionPart
          label="Food"
          data={food}
          onAddButton={openFoodAddModal}
          activityType="food"
        />
        <ActivitySectionPart
          label="Other"
          data={other}
          onAddButton={openOtherAddModal}
          activityType="other"
        />
        <ActivitySectionPart
          label="Compensated"
          data={compensated}
          onAddButton={openCompensatedAddModal}
          activityType="compensated"
        />
      </section>

      <section className={classes.householdFootprint}>
        <ChangeHouseholdFootprintModal
          isOpen={showHouseholdFootprintModal}
          handleClose={handleHouseholdFootprintModalClose}
          currentFootprint={householdFootprint?.footprint ?? 0}
        />
        <MainFootprint
          footprint={householdFootprint?.footprint ?? 0}
          onEditClick={openHouseholdFootprintModal}
        />
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
