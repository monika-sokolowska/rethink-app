import ActivitySectionPart from "../MyFootprint/ActivitySectionPart/ActivitySectionPart";
import MainFootprint from "../HouseholdFootprint/MainFootprint/MainFootprint";
import { createUseStyles } from "react-jss";
import AddTransportModal from "../MyFootprint/AddModal/AddTransportModal/AddTransportModal";
import AddTransportBottomSheet from "../MyFootprint/AddModal/AddTransportModal/AddTransportBottomSheet";
import AddFoodModal from "../MyFootprint/AddModal/AddFoodModal/AddFoodModal";
import AddFoodBottomSheet from "../MyFootprint/AddModal/AddFoodModal/AddFoodBottomSheet";
import AddOtherModal from "../MyFootprint/AddModal/AddOtherModal/AddOtherModal";
import AddOtherBottomSheet from "../MyFootprint/AddModal/AddOtherModal/AddOtherBottomSheet";
import AddCompensatedModal from "../MyFootprint/AddModal/AddCompensatedModal/AddCompensatedModal";
import AddCompensatedBottomSheet from "../MyFootprint/AddModal/AddCompensatedModal/AddCompensatedBottomSheet";
import ChangeHouseholdFootprintModal from "../HouseholdFootprint/ChangeModal/ChangeHouseholdFootprintModal";
import ChangeHouseholdFootprintBottomSheet from "../HouseholdFootprint/ChangeModal/ChangeHouseholdFootprintBottomSheet";
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
import {
  getRecurringFootprints,
  deleteRecurringFootprint,
} from "../../../../reducers/recurringFootprintSlice";
import { Link } from "react-router-dom";
import { FaSync } from "react-icons/fa";

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
  dailySection: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  dailySectionHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  dailySectionLabel: {
    margin: "1rem",
    color: "#2d8659",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  dailyIcon: {
    fontSize: "24px",
    color: "#2d8659",
  },
  dailyList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  dailyItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "rgba(45, 134, 89, 0.1)",
    borderRadius: "8px",
    border: "1px solid rgba(45, 134, 89, 0.25)",
    transition: "box-shadow 0.2s",
    "&:hover": {
      boxShadow: "0 2px 8px rgba(45, 134, 89, 0.15)",
      backgroundColor: "rgba(45, 134, 89, 0.15)",
    },
  },
  dailyItemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  dailyItemName: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#333",
  },
  dailyItemDetails: {
    fontSize: "13px",
    color: "#666",
    display: "flex",
    gap: "12px",
  },
  dailyItemType: {
    backgroundColor: "rgba(45, 134, 89, 0.1)",
    color: "#2d8659",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: 500,
    textTransform: "uppercase",
  },
  dailyItemActions: {
    display: "flex",
    gap: "8px",
  },
  deleteButton: {
    background: "none",
    border: "1px solid #dc3545",
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "12px",
    color: "#dc3545",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "rgba(220, 53, 69, 0.1)",
    },
  },
  emptyDaily: {
    textAlign: "center",
    color: "#888",
    padding: "1.5rem",
    fontSize: "14px",
    width: "90%",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  dailyListContainer: {
    width: "90%",
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
  const { recurringFootprints } = useSelector(
    (store) => store.recurringFootprint
  );
  const dispatch = useDispatch();
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [showCompensatedModal, setShowCompensatedModal] = useState(false);
  const [showHouseholdFootprintModal, setShowHouseholdFootprintModal] =
    useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (user?.id) {
      dispatch(getTransportFootprint());
      dispatch(getFoodFootprint());
      dispatch(getOtherFootprint());
      dispatch(getCompensatedFootprint());
      dispatch(getHouseholdFootprint());
      dispatch(getRecurringFootprints());
    }
  }, [dispatch, user?.id]);

  const handleDeleteRecurring = (id) => {
    dispatch(deleteRecurringFootprint(id));
  };

  const formatFootprintType = (type) => {
    return type?.toLowerCase() || "other";
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {isMobile ? (
          <>
            <AddTransportBottomSheet
              isOpen={showTransportModal}
              handleClose={handleTransportModalClose}
            />
            <AddFoodBottomSheet
              isOpen={showFoodModal}
              handleClose={handleFoodModalClose}
            />
            <AddOtherBottomSheet
              isOpen={showOtherModal}
              handleClose={handleOtherModalClose}
            />
            <AddCompensatedBottomSheet
              isOpen={showCompensatedModal}
              handleClose={handleCompensatedAddModalClose}
            />
          </>
        ) : (
          <>
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
          </>
        )}
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

        {/* Daily/Recurring Footprints Section */}
        <div className={classes.dailySection}>
          <div className={classes.dailySectionHeader}>
            <div className={classes.dailySectionLabel}>
              <FaSync className={classes.dailyIcon} />
              Daily Footprints
            </div>
          </div>
          {recurringFootprints && recurringFootprints.length > 0 ? (
            <div className={classes.dailyListContainer}>
              <div className={classes.dailyList}>
                {recurringFootprints.map((item) => (
                  <div
                    key={item.id}
                    className={`${classes.dailyItem} ${
                      !item.isActive ? classes.dailyItemInactive : ""
                    }`}>
                    <div className={classes.dailyItemInfo}>
                      <span className={classes.dailyItemName}>{item.name}</span>
                      <div className={classes.dailyItemDetails}>
                        <span className={classes.dailyItemType}>
                          {formatFootprintType(item.footprintType)}
                        </span>
                        <span>{item.footprint} kg CO2</span>
                        {item.kilometers && <span>{item.kilometers} km</span>}
                        {item.meal && <span>{item.meal}</span>}
                      </div>
                    </div>
                    <div className={classes.dailyItemActions}>
                      <button
                        className={classes.deleteButton}
                        onClick={() => handleDeleteRecurring(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={classes.emptyDaily}>
              No daily footprints set. Check "Repeat daily" when adding a
              footprint to create one.
            </div>
          )}
        </div>
      </section>

      <section className={classes.householdFootprint}>
        {isMobile ? (
          <ChangeHouseholdFootprintBottomSheet
            isOpen={showHouseholdFootprintModal}
            handleClose={handleHouseholdFootprintModalClose}
            currentFootprint={householdFootprint?.footprint ?? 0}
          />
        ) : (
          <ChangeHouseholdFootprintModal
            isOpen={showHouseholdFootprintModal}
            handleClose={handleHouseholdFootprintModalClose}
            currentFootprint={householdFootprint?.footprint ?? 0}
          />
        )}
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
