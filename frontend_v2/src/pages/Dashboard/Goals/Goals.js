import MainGoal from "./MainGoal/MainGoal";
import GoalsList from "./GoalsList/GoalsList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGoals } from "../../../reducers/goalsSlice";
import { getUser } from "../../../reducers/userSlice";
import AddGoalsModal from "../Activity/MyFootprint/AddModal/AddGoalsModal/AddGoalsModal";
import AddGoalBottomSheet from "./AddGoalBottomSheet/AddGoalBottomSheet";
import ChangeMainGoalModal from "../Activity/MyFootprint/ChangeModal/ChangeMainGoalModal/ChangeMainGoalModal";
import ChangeMainGoalBottomSheet from "../Activity/MyFootprint/ChangeModal/ChangeMainGoalModal/ChangeMainGoalBottomSheet";
import { createUseStyles } from "react-jss";
import studySvg from "../../../assets/images/study.svg";

const useStyles = createUseStyles({
  goals: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0",
      height: "0",
    },
  },
  otherLabel: {
    margin: "1rem",
    color: "#2d8659",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    border: "none",
    borderRadius: "4px",
    boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "#ffffff",
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
    "&:hover": {
      boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
  otherGoalsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    gap: "2rem",
    alignItems: "flex-start",
    marginTop: "1rem",
    boxSizing: "border-box",
  },
  goalsListSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 0,
    padding: "0 1rem",
    boxSizing: "border-box",
  },
  goalsListHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "1rem",
  },
  studySection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  studyImage: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    marginBottom: "1rem",
    objectFit: "contain",
    display: "block",
  },
  studyDescription: {
    color: "#2d8659",
    fontSize: "16px",
    textAlign: "center",
    lineHeight: "1.6",
  },
  "@media (max-width: 768px)": {
    goals: {
      paddingBottom: "5rem",
    },
    otherLabel: {
      fontSize: "24px",
      margin: "0.5rem",
    },
    button: {
      padding: "18px 36px",
      fontSize: "18px",
      minHeight: "56px",
      margin: "0.5rem",
    },
    goalsListHeader: {
      flexDirection: "row",
      width: "100%",
    },
    goalsListSection: {
      width: "100%",
      minWidth: 0,
      padding: "0 1rem",
    },
    otherGoalsContainer: {
      flexDirection: "column",
      width: "100%",
      gap: "1.5rem",
      padding: "0 1rem",
      boxSizing: "border-box",
    },
    studySection: {
      padding: "1.5rem",
      width: "100%",
      boxSizing: "border-box",
      overflow: "visible",
    },
    studyImage: {
      maxWidth: "calc(100% - 3rem)",
      width: "100%",
      height: "auto",
    },
    studyDescription: {
      fontSize: "18px",
    },
  },
  "@media (max-width: 480px)": {
    goals: {
      paddingBottom: "5rem",
    },
    otherLabel: {
      fontSize: "22px",
      margin: "0.5rem 0",
    },
    button: {
      padding: "16px 32px",
      fontSize: "16px",
      minHeight: "54px",
      margin: "0.5rem 0",
    },
    goalsListHeader: {
      flexDirection: "row",
      width: "100%",
    },
    goalsListSection: {
      width: "100%",
      minWidth: 0,
      padding: "0 1rem",
    },
    otherGoalsContainer: {
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
      padding: "0 1rem",
      boxSizing: "border-box",
    },
    studySection: {
      padding: "1rem",
      width: "100%",
      boxSizing: "border-box",
      overflow: "visible",
    },
    studyImage: {
      maxWidth: "calc(100% - 2rem)",
      width: "100%",
      height: "auto",
    },
    studyDescription: {
      fontSize: "16px",
    },
  },
});

const Goals = () => {
  const classes = useStyles();
  const { user } = useSelector((store) => store.user);
  const { goals } = useSelector((store) => store.goals);
  const [showAddGoalsModal, setShowAddGoalsModal] = useState(false);
  const [showChangeMainGoalsModal, setShowChangeMainGoalsModal] =
    useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const dispatch = useDispatch();

  const mainGoal = user.mainGoal;

  useEffect(() => {
    dispatch(getGoals(user.id));
    dispatch(getUser(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (goals.isLoading) {
    return <div className="other">Loading...</div>;
  }

  const openAddGoalsAddModal = () => {
    setShowAddGoalsModal(true);
  };

  const handleAddGoalsModalClose = () => {
    setShowAddGoalsModal(false);
  };

  const openMainGoalChangeModal = () => {
    setShowChangeMainGoalsModal(true);
  };

  const handleMainGoalChangeModalClose = () => {
    setShowChangeMainGoalsModal(false);
  };

  return (
    <section className={classes.goals}>
      {isMobile ? (
        <AddGoalBottomSheet
          isOpen={showAddGoalsModal}
          handleClose={handleAddGoalsModalClose}
        />
      ) : (
        <AddGoalsModal
          isOpen={showAddGoalsModal}
          handleClose={handleAddGoalsModalClose}
        />
      )}
      {isMobile ? (
        <ChangeMainGoalBottomSheet
          isOpen={showChangeMainGoalsModal}
          handleClose={handleMainGoalChangeModalClose}
        />
      ) : (
        <ChangeMainGoalModal
          isOpen={showChangeMainGoalsModal}
          handleClose={handleMainGoalChangeModalClose}
        />
      )}
      <MainGoal goal={mainGoal} handleClick={openMainGoalChangeModal} />
      <div className={classes.otherGoalsContainer}>
        <div className={classes.goalsListSection}>
          <div className={classes.goalsListHeader}>
            <div className={classes.otherLabel}>Other goals</div>
            <button className={classes.button} onClick={openAddGoalsAddModal}>
              Add
            </button>
          </div>
          <GoalsList />
        </div>
        <div className={classes.studySection}>
          <img src={studySvg} alt="Study" className={classes.studyImage} />
          <div className={classes.studyDescription}>
            Setting clear environmental goals helps you make conscious choices
            that reduce your carbon footprint. These goals encourage you to
            adopt habits—like conserving energy and reducing waste—that directly
            benefit the planet. By committing to sustainable living, you support
            efforts to slow global warming. Environmental goals also improve
            your personal well-being by fostering a healthier lifestyle. They
            can save you money through energy efficiency and responsible
            consumption. When you choose eco-friendly products, you help drive
            demand for sustainable industries. Your actions inspire others and
            strengthen community efforts toward environmental protection.
            Setting goals also increases your awareness of how daily decisions
            affect the world around you. Over time, these positive habits
            contribute to large-scale environmental change. Ultimately, your
            personal environmental goals help create a cleaner, safer, and more
            sustainable future for all.
          </div>
        </div>
      </div>
    </section>
  );
};
export default Goals;
