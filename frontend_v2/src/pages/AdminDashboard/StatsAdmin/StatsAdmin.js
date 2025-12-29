import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getStats, getAveragePerson } from "../../../reducers/statsSlice";
import { getAllUsers, deleteUser } from "../../../reducers/usersSlice";
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
  usersContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
    padding: "2rem",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  usersList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  userCard: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "box-shadow 0.2s",
    "&:hover": {
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  userName: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#2d8659",
  },
  userEmail: {
    fontSize: "0.9rem",
    color: "#6c757d",
  },
  userGoal: {
    fontSize: "0.85rem",
    color: "#495057",
  },
  userRoles: {
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  roleBadge: {
    backgroundColor: "#2d8659",
    color: "#ffffff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "0.85rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "#c82333",
      transform: "translateY(-2px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  confirmOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  confirmDialog: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  confirmTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#333",
    marginBottom: "1rem",
  },
  confirmMessage: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  confirmButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  confirmCancel: {
    backgroundColor: "#6c757d",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#5a6268",
    },
  },
  confirmDelete: {
    backgroundColor: "#dc3545",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#c82333",
    },
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
    padding: "2rem",
  },
  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #2d8659",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "$spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  usersHeader: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#2d8659",
    marginBottom: "1rem",
  },
  emptyState: {
    textAlign: "center",
    color: "#6c757d",
    padding: "2rem",
  },
});

const StatsAdmin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { stats, averagePerson } = useSelector((store) => store.stats);
  const { users, isLoading } = useSelector((store) => store.users);
  const [isDailyFootprintModalOpen, setIsDailyFootprintModalOpen] =
    useState(false);
  const [isHouseholdFootprintModalOpen, setIsHouseholdFootprintModalOpen] =
    useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(getStats());
      dispatch(getAveragePerson());
      dispatch(getAllUsers());
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

  const handleDeleteClick = (userItem) => {
    setUserToDelete(userItem);
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id));
      setUserToDelete(null);
    }
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
      <div className={classes.usersContainer}>
        <h2 className={classes.usersHeader}>All Users</h2>
        {isLoading ? (
          <div className={classes.loader}>
            <div className={classes.spinner}></div>
          </div>
        ) : users && users.length > 0 ? (
          <div className={classes.usersList}>
            {users.map((userItem) => (
              <div key={userItem.id} className={classes.userCard}>
                <div className={classes.userInfo}>
                  <div className={classes.userName}>
                    {userItem.name} {userItem.lastName}
                  </div>
                  <div className={classes.userEmail}>{userItem.email}</div>
                  {userItem.mainGoal !== null && (
                    <div className={classes.userGoal}>
                      Main Goal: {userItem.mainGoal} kg CO2
                    </div>
                  )}
                </div>
                <div className={classes.userRoles}>
                  {userItem.roles &&
                    Array.from(userItem.roles).map((role, index) => {
                      const roleName = role?.name || role;
                      return (
                        <span key={index} className={classes.roleBadge}>
                          {typeof roleName === "string"
                            ? roleName.replace("ROLE_", "")
                            : roleName?.toString().replace("ROLE_", "") ||
                              "USER"}
                        </span>
                      );
                    })}
                  <button
                    className={classes.deleteButton}
                    onClick={() => handleDeleteClick(userItem)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={classes.emptyState}>No users found</div>
        )}
      </div>
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
      {userToDelete && (
        <div className={classes.confirmOverlay} onClick={handleCancelDelete}>
          <div
            className={classes.confirmDialog}
            onClick={(e) => e.stopPropagation()}>
            <h3 className={classes.confirmTitle}>Delete User Account</h3>
            <p className={classes.confirmMessage}>
              Are you sure you want to delete the account for{" "}
              <strong>
                {userToDelete.name} {userToDelete.lastName}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className={classes.confirmButtons}>
              <button
                className={classes.confirmCancel}
                onClick={handleCancelDelete}>
                Cancel
              </button>
              <button
                className={classes.confirmDelete}
                onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default StatsAdmin;
