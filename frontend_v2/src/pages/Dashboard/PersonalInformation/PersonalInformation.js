import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../../../reducers/userSlice";
import ChangeNameModal from "./ChangeNameModal";
import ChangeNameBottomSheet from "./ChangeNameBottomSheet";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangePasswordBottomSheet from "./ChangePasswordBottomSheet";

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
  const { user, isLoading } = useSelector((store) => store.user);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (user?.id) {
      dispatch(getUser());
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditName = () => {
    setIsNameModalOpen(true);
  };

  const handleCloseNameModal = () => {
    setIsNameModalOpen(false);
  };

  const handleChangePassword = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <div className={classes.usersContainer}>
      <h2 className={classes.usersHeader}>My Information</h2>
      {isLoading ? (
        <div className={classes.loader}>
          <div className={classes.spinner}></div>
        </div>
      ) : user ? (
        <div className={classes.usersList}>
          <div key={user.id} className={classes.userCard}>
            <div className={classes.userInfo}>
              <div className={classes.userName}>
                {user.name} {user.lastName}
              </div>
              <div className={classes.userEmail}>{user.email}</div>
              {user.mainGoal !== null && user.mainGoal !== undefined && (
                <div className={classes.userGoal}>
                  Main Goal: {user.mainGoal} kg CO2
                </div>
              )}
              <div
                style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button className={classes.editButton} onClick={handleEditName}>
                  Edit Name
                </button>
                <button
                  className={classes.editButton}
                  onClick={handleChangePassword}>
                  Change Password
                </button>
              </div>
            </div>
            <div className={classes.userRoles}>
              {user.roles &&
                Array.from(user.roles).map((role, index) => {
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
      {isMobile ? (
        <ChangeNameBottomSheet
          isOpen={isNameModalOpen}
          handleClose={handleCloseNameModal}
          currentName={user?.name}
          currentLastName={user?.lastName}
          userId={user?.id}
        />
      ) : (
        <ChangeNameModal
          isOpen={isNameModalOpen}
          handleClose={handleCloseNameModal}
          currentName={user?.name}
          currentLastName={user?.lastName}
          userId={user?.id}
        />
      )}
      {isMobile ? (
        <ChangePasswordBottomSheet
          isOpen={isPasswordModalOpen}
          handleClose={handleClosePasswordModal}
          userId={user?.id}
        />
      ) : (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          handleClose={handleClosePasswordModal}
          userId={user?.id}
        />
      )}
    </div>
  );
};
export default PersonalInformation;
