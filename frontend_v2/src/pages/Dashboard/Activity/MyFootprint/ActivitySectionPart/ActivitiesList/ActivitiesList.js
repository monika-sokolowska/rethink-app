import React, { useState } from "react";
import "./ActivitiesList.css";
import ActivitiesListItem from "./ActivitiesListItem/ActivitiesListItem";
import {
  deleteFoodFootprint,
  deleteOtherFootprint,
  deleteTransportFootprint,
} from "../../../../../../reducers/dailyFootprintSlice";
import { useDispatch } from "react-redux";

const ActivitiesList = ({ data }) => {
  const dispatch = useDispatch();

  const handleFoodDelete = (id) => {
    dispatch(deleteFoodFootprint({ id: id }));
  };

  const handleTransportDelete = (id) => {
    dispatch(deleteTransportFootprint({ id: id }));
  };

  const handleOtherDelete = (id) => {
    dispatch(deleteOtherFootprint({ id: id }));
  };

  const displayActivitiesList = (item) => {
    if (item.kilometers) {
      return (
        <ActivitiesListItem
          name={item.name}
          footprint={item.footprint}
          info={`${item.kilometers} km`}
          handleDelete={handleTransportDelete}
        />
      );
    }
    if (item.meal) {
      return (
        <ActivitiesListItem
          name={item.name}
          footprint={item.footprint}
          info={`${item.meal}`}
          handleDelete={handleFoodDelete}
        />
      );
    } else {
      return (
        <ActivitiesListItem
          name={item.name}
          footprint={item.footprint}
          info={""}
          handleDelete={handleOtherDelete}
        />
      );
    }
  };

  return (
    <div className="activities-list">
      {data.map((item) => {
        const { id } = item;
        return (
          <div key={id} className="activities">
            {displayActivitiesList(item)}
          </div>
        );
      })}
    </div>
  );
};
export default ActivitiesList;
