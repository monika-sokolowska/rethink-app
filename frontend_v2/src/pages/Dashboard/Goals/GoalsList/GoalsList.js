import React, { useState } from "react";
import "./GoalsList.css";
import Goal from "./Goal/Goal";
import { useSelector, useDispatch } from "react-redux";
import { deleteGoal } from "../../../../reducers/goalsSlice";

const GoalsList = () => {
  const { goals } = useSelector((store) => store.goals);
  const dispatch = useDispatch();

  const deleteGoalItem = (id) => {
    dispatch(deleteGoal({ id: id }));
  };

  return (
    <div className="goals-list">
      {goals &&
        goals.map((item) => {
          const { id, description } = item;
          return (
            <article key={id} className="goals-article">
              <Goal name={description} deleteItem={() => deleteGoalItem(id)} />
            </article>
          );
        })}
    </div>
  );
};
export default GoalsList;
