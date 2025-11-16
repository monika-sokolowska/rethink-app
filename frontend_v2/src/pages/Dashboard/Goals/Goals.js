import MainGoal from "./MainGoal/MainGoal";
import GoalsList from "./GoalsList/GoalsList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGoals } from "../../../reducers/goalsSlice";
import { getUser } from "../../../reducers/userSlice";
import AddGoalsModal from "../Activity/MyFootprint/AddModal/AddGoalsModal/AddGoalsModal";
import ChangeMainGoalModal from "../Activity/MyFootprint/ChangeModal/ChangeMainGoalModal/ChangeMainGoalModal";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  goals: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  other: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
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
});

const Goals = () => {
  const classes = useStyles();
  const { user } = useSelector((store) => store.user);
  const { goals } = useSelector((store) => store.goals);
  const [showAddGoalsModal, setShowAddGoalsModal] = useState(false);
  const [showChangeMainGoalsModal, setShowChangeMainGoalsModal] =
    useState(false);

  const dispatch = useDispatch();

  const mainGoal = user.mainGoal;
  const reload = () => window.location.reload();

  useEffect(() => {
    dispatch(getGoals(user.id));
    dispatch(getUser(user.id));
  }, [dispatch, user.id]);

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
      <AddGoalsModal
        isOpen={showAddGoalsModal}
        handleClose={handleAddGoalsModalClose}
      />
      <ChangeMainGoalModal
        isOpen={showChangeMainGoalsModal}
        handleClose={handleMainGoalChangeModalClose}
      />
      <MainGoal goal={mainGoal} handleClick={openMainGoalChangeModal} />
      <div className={classes.other}>
        <div className={classes.otherLabel}>Other goals</div>
        <button className={classes.button} onClick={openAddGoalsAddModal}>
          Add
        </button>
      </div>
      <GoalsList />
    </section>
  );
};
export default Goals;
