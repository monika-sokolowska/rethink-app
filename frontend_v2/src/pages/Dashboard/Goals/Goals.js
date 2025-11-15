import "./Goals.css";
import MainGoal from "./MainGoal/MainGoal";
import GoalsList from "./GoalsList/GoalsList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getGoals } from "../../../reducers/goalsSlice";
import { getUser } from "../../../reducers/userSlice";
import AddGoalsModal from "../Activity/MyFootprint/AddModal/AddGoalsModal/AddGoalsModal";
import ChangeMainGoalModal from "../Activity/MyFootprint/ChangeModal/ChangeMainGoalModal/ChangeMainGoalModal";

const Goals = () => {
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
    <section className="goals">
      <AddGoalsModal
        isOpen={showAddGoalsModal}
        handleClose={handleAddGoalsModalClose}
      />
      <ChangeMainGoalModal
        isOpen={showChangeMainGoalsModal}
        handleClose={handleMainGoalChangeModalClose}
      />
      <MainGoal goal={mainGoal} handleClick={openMainGoalChangeModal} />
      <div className="other">
        <div className="other-label">Other goals</div>
        <button onClick={openAddGoalsAddModal}>Add</button>
      </div>
      <GoalsList />
    </section>
  );
};
export default Goals;
