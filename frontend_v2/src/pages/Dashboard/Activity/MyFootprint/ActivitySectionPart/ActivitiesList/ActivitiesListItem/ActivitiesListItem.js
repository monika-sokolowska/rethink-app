import { AiOutlineDelete } from "react-icons/ai";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  activitiesListItem: {
    background: "rgb(228, 245, 233)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    height: "8vh",
    margin: "1rem",
    boxShadow: "0 4px 12px rgba(45, 134, 89, 0.15)",
    transition: "all 0.2s ease-in-out",
    overflow: "hidden",
    boxSizing: "border-box",
    "&:hover": {
      boxShadow: "0 6px 16px rgba(45, 134, 89, 0.25)",
      transform: "translateY(-2px)",
    },
  },
  itemTitle: {
    color: "#2d8659",
    margin: "1rem",
    fontSize: "15px",
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: "1 1 auto",
    minWidth: 0,
  },
  itemInfo: {
    color: "#2d8659",
    margin: "1rem",
    fontSize: "15px",
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: "0 0 auto",
    maxWidth: "120px",
  },
  itemValue: {
    color: "#2d8659",
    margin: "1rem",
    fontSize: "15px",
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: "0 0 auto",
  },
  activitiesListItemRightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: "1rem",
    flex: "0 0 auto",
    gap: "0.5rem",
  },
  "@media (max-width: 768px)": {
    activitiesListItem: {
      width: "95%",
      height: "auto",
      minHeight: "7vh",
      margin: "0.75rem",
      padding: "0.5rem",
    },
    itemTitle: {
      fontSize: "14px",
      margin: "0.5rem",
      flex: "1 1 auto",
      minWidth: 0,
    },
    itemInfo: {
      fontSize: "13px",
      margin: "0.5rem",
      maxWidth: "100px",
    },
    itemValue: {
      fontSize: "14px",
      margin: "0.5rem",
      flex: "0 0 auto",
    },
    activitiesListItemRightSide: {
      margin: "0.5rem",
      gap: "0.25rem",
    },
  },
  "@media (max-width: 480px)": {
    activitiesListItem: {
      width: "98%",
      height: "auto",
      minHeight: "auto",
      margin: "0.5rem",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "0.75rem",
    },
    itemTitle: {
      fontSize: "13px",
      margin: "0.25rem 0",
      width: "100%",
      maxWidth: "100%",
    },
    itemInfo: {
      fontSize: "12px",
      margin: "0.25rem 0",
      maxWidth: "100%",
    },
    itemValue: {
      fontSize: "13px",
      margin: "0.25rem 0",
    },
    activitiesListItemRightSide: {
      margin: "0.25rem 0 0 0",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.5rem",
    },
  },
});

const ActivitiesListItem = ({ name, footprint, info, handleDelete }) => {
  const classes = useStyles();
  return (
    <div className={classes.activitiesListItem}>
      <h3 className={classes.itemTitle} title={name}>
        {name}
      </h3>
      {info && (
        <h3 className={classes.itemInfo} title={info}>
          {info}
        </h3>
      )}
      <div className={classes.activitiesListItemRightSide}>
        <h1 className={classes.itemValue}>{footprint} kg CO2</h1>
        <AiOutlineDelete
          size={25}
          style={{
            color: "#2d8659",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            flexShrink: 0,
          }}
          onClick={handleDelete}
          onMouseEnter={(e) => (e.target.style.color = "#1a5a3f")}
          onMouseLeave={(e) => (e.target.style.color = "#2d8659")}
        />
      </div>
    </div>
  );
};
export default ActivitiesListItem;
