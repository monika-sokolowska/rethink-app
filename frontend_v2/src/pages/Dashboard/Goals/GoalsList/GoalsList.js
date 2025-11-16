import React from "react";
import Goal from "./Goal/Goal";
import { useSelector, useDispatch } from "react-redux";
import { deleteGoal } from "../../../../reducers/goalsSlice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  goalsList: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "90%",
    margin: "1rem",
    overflowY: "auto",
    maxHeight: "50%",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0",
      height: "0",
    },
  },
  goalsArticle: {
    width: "100%",
    height: "100%",
  },
  "@media (max-width: 768px)": {
    goalsList: {
      width: "95%",
    },
  },
  "@media (max-width: 480px)": {
    goalsList: {
      width: "98%",
      margin: "0.5rem",
    },
  },
});

const GoalsList = () => {
  const classes = useStyles();
  const { goals } = useSelector((store) => store.goals);
  const dispatch = useDispatch();

  const deleteGoalItem = (id) => {
    dispatch(deleteGoal({ id: id }));
  };

  return (
    <div className={classes.goalsList}>
      {goals &&
        goals.map((item) => {
          const { id, description } = item;
          return (
            <article key={id} className={classes.goalsArticle}>
              <Goal name={description} deleteItem={() => deleteGoalItem(id)} />
            </article>
          );
        })}
    </div>
  );
};
export default GoalsList;
