import React from "react";
import ActivitiesListItem from "./ActivitiesListItem/ActivitiesListItem";
import { createUseStyles } from "react-jss";
import {
  deleteFoodFootprint,
  deleteOtherFootprint,
  deleteTransportFootprint,
} from "../../../../../../reducers/dailyFootprintSlice";
import { useDispatch } from "react-redux";

const useStyles = createUseStyles({
  activitiesList: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "90%",
    minHeight: "50%",
    margin: "1rem",
  },
  activities: {
    width: "100%",
    minHeight: "100%",
  },
});

const ActivitiesList = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleFoodDelete = (id) => {
    dispatch(deleteFoodFootprint(id));
  };

  const handleTransportDelete = (id) => {
    dispatch(deleteTransportFootprint(id));
  };

  const handleOtherDelete = (id) => {
    dispatch(deleteOtherFootprint(id));
  };

  const displayActivitiesList = (item) => {
    if (item.kilometers) {
      return (
        <ActivitiesListItem
          key={item.id}
          name={item.name}
          footprint={item.footprint}
          info={`${item.kilometers} km`}
          handleDelete={() => handleTransportDelete(item.id)}
        />
      );
    }
    if (item.meal) {
      return (
        <ActivitiesListItem
          key={item.id}
          name={item.name}
          footprint={item.footprint}
          info={`${item.meal}`}
          handleDelete={() => handleFoodDelete(item.id)}
        />
      );
    } else {
      return (
        <ActivitiesListItem
          key={item.id}
          name={item.name}
          footprint={item.footprint}
          info={""}
          handleDelete={() => handleOtherDelete(item.id)}
        />
      );
    }
  };

  return (
    <div className={classes.activitiesList}>
      {data.map((item) => {
        const { id } = item;
        return (
          <div key={id} className={classes.activities}>
            {displayActivitiesList(item)}
          </div>
        );
      })}
    </div>
  );
};
export default ActivitiesList;
