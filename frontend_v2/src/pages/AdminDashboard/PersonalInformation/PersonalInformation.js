import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../reducers/usersSlice";
import ChangeNameModal from "./ChangeNameModal";

const useStyles = createUseStyles({
  usersContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: "2rem",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  usersHeader: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#2d8659",
    marginBottom: "1.5rem",
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
    padding: "1.5rem",
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
    gap: "0.5rem",
    flex: 1,
  },
  userName: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#2d8659",
  },
  userEmail: {
    fontSize: "0.95rem",
    color: "#6c757d",
  },
  userGoal: {
    fontSize: "0.9rem",
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
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: 500,
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
    marginTop: "1rem",
    width: "fit-content",
    "&:hover": {
      backgroundColor: "#4a9d6e",
      transform: "translateY(-2px)",
    },
    "&:active": {
      transform: "translateY(0)",
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
  emptyState: {
    textAlign: "center",
    color: "#6c757d",
    padding: "2rem",
    fontSize: "1rem",
  },
  "@media (max-width: 768px)": {
    usersContainer: {
      padding: "1rem",
    },
    userCard: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "1rem",
    },
    userRoles: {
      width: "100%",
    },
  },
});

const PersonalInformation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { users, isLoading } = useSelector((store) => store.users);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllUsers());
    }
  }, [dispatch, user?.id]);

  // Find current user from the users list
  const currentUserInfo = users?.find((userItem) => userItem.id === user?.id);

  const handleEditName = () => {
    setIsNameModalOpen(true);
  };

  const handleCloseNameModal = () => {
    setIsNameModalOpen(false);
  };

  return (
    <div className={classes.usersContainer}>
      <h2 className={classes.usersHeader}>My Information</h2>
      {isLoading ? (
        <div className={classes.loader}>
          <div className={classes.spinner}></div>
        </div>
      ) : currentUserInfo ? (
        <div className={classes.usersList}>
          <div key={currentUserInfo.id} className={classes.userCard}>
            <div className={classes.userInfo}>
              <div className={classes.userName}>
                {currentUserInfo.name} {currentUserInfo.lastName}
              </div>
              <div className={classes.userEmail}>{currentUserInfo.email}</div>
              {currentUserInfo.mainGoal !== null && currentUserInfo.mainGoal !== undefined && (
                <div className={classes.userGoal}>
                  Main Goal: {currentUserInfo.mainGoal} kg CO2
                </div>
              )}
              <button className={classes.editButton} onClick={handleEditName}>
                Edit Name
              </button>
            </div>
            <div className={classes.userRoles}>
              {currentUserInfo.roles &&
                Array.from(currentUserInfo.roles).map((role, index) => {
                  const roleName = role?.name || role;
                  return (
                    <span key={index} className={classes.roleBadge}>
                      {typeof roleName === "string"
                        ? roleName.replace("ROLE_", "")
                        : roleName?.toString().replace("ROLE_", "") || "USER"}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.emptyState}>No information available</div>
      )}
      <ChangeNameModal
        isOpen={isNameModalOpen}
        handleClose={handleCloseNameModal}
        currentName={currentUserInfo?.name}
        currentLastName={currentUserInfo?.lastName}
        userId={user?.id}
      />
    </div>
  );
};
export default PersonalInformation;

