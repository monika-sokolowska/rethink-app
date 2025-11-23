import statsImage from "../../../assets/images/stats.svg";
import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getStats, getAveragePerson } from "../../../reducers/statsSlice";
import ChangeAverageDailyFootprintModal from "./ChangeAverageDailyFootprintModal";
import ChangeAverageHouseholdFootprintModal from "./ChangeAverageHouseholdFootprintModal";

const useStyles = createUseStyles({
  stats: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  statsNav: {
    boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.15)",
    width: "100%",
    height: "auto",
    minHeight: "auto",
    flexShrink: 0,
  },
  statsNavbar: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    fontWeight: "bold",
    boxShadow: "3px 5px 20px rgba(0, 0, 0, 0.15)",
    padding: "1rem",
    height: "auto",
    minHeight: "auto",
    flexWrap: "wrap",
    gap: "1rem",
  },
  footprintDisplay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  footprintLabel: {
    color: "#2d8659",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  footprintValue: {
    color: "#2d8659",
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  editButton: {
    backgroundColor: "#2d8659",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s",
    "&:hover": {
      backgroundColor: "#4a9d6e",
      transform: "translateY(-2px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  "@media (max-width: 768px)": {
    statsNav: {
      boxShadow: "none",
    },
    statsNavbar: {
      padding: "0.75rem",
      boxShadow: "none",
      flexDirection: "column",
      gap: "1.5rem",
    },
    footprintValue: {
      fontSize: "1.3rem",
    },
  },
  "@media (max-width: 480px)": {
    statsNav: {
      boxShadow: "none",
    },
    statsNavbar: {
      padding: "0.5rem",
      boxShadow: "none",
    },
    footprintValue: {
      fontSize: "1.2rem",
    },
    editButton: {
      fontSize: "0.8rem",
      padding: "6px 12px",
    },
  },
});

const StatsAdmin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { stats, averagePerson } = useSelector((store) => store.stats);
  const [isDailyFootprintModalOpen, setIsDailyFootprintModalOpen] =
    useState(false);
  const [isHouseholdFootprintModalOpen, setIsHouseholdFootprintModalOpen] =
    useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(getStats());
      dispatch(getAveragePerson());
    }
  }, [dispatch, user?.id]);

  const avgDailyFootprintValue =
    stats?.avgDailyFootprint || averagePerson?.dailyFootprint;
  const avgDailyFootprint =
    typeof avgDailyFootprintValue === "number"
      ? avgDailyFootprintValue
      : parseFloat(avgDailyFootprintValue) || 0;

  const avgHouseholdFootprintValue = averagePerson?.householdFootprint;
  const avgHouseholdFootprint =
    typeof avgHouseholdFootprintValue === "number"
      ? avgHouseholdFootprintValue
      : parseFloat(avgHouseholdFootprintValue) || 0;

  const handleEditDailyFootprint = () => {
    setIsDailyFootprintModalOpen(true);
  };

  const handleCloseDailyFootprintModal = () => {
    setIsDailyFootprintModalOpen(false);
  };

  const handleEditHouseholdFootprint = () => {
    setIsHouseholdFootprintModalOpen(true);
  };

  const handleCloseHouseholdFootprintModal = () => {
    setIsHouseholdFootprintModalOpen(false);
  };

  return (
    <section className={classes.stats}>
      <div className={classes.statsNav}>
        <nav className={classes.statsNavbar}>
          <div className={classes.footprintDisplay}>
            <div className={classes.footprintLabel}>
              Average Daily Footprint
            </div>
            <div className={classes.footprintValue}>
              {avgDailyFootprint.toFixed(2)} kg CO2
            </div>
            <button
              className={classes.editButton}
              onClick={handleEditDailyFootprint}>
              Edit
            </button>
          </div>
          <div className={classes.footprintDisplay}>
            <div className={classes.footprintLabel}>
              Average Household Footprint
            </div>
            <div className={classes.footprintValue}>
              {avgHouseholdFootprint.toFixed(2)} kg CO2
            </div>
            <button
              className={classes.editButton}
              onClick={handleEditHouseholdFootprint}>
              Edit
            </button>
          </div>
        </nav>
      </div>
      <img src={statsImage} alt="stats" />
      <ChangeAverageDailyFootprintModal
        isOpen={isDailyFootprintModalOpen}
        handleClose={handleCloseDailyFootprintModal}
        currentFootprint={avgDailyFootprint}
      />
      <ChangeAverageHouseholdFootprintModal
        isOpen={isHouseholdFootprintModalOpen}
        handleClose={handleCloseHouseholdFootprintModal}
        currentFootprint={avgHouseholdFootprint}
      />
    </section>
  );
};
export default StatsAdmin;
