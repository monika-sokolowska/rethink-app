import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserPassword } from "../../../reducers/usersSlice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1050,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease-out",
    "&.open": {
      opacity: 1,
    },
  },
  bottomSheet: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "100%",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
    transform: "translateY(100%)",
    transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    zIndex: 1051,
    paddingBottom: "env(safe-area-inset-bottom)",
    "&.open": {
      transform: "translateY(0)",
    },
  },
  handle: {
    width: "36px",
    height: "5px",
    backgroundColor: "#d1d1d6",
    borderRadius: "3px",
    margin: "12px auto 8px",
    flexShrink: 0,
  },
  header: {
    padding: "16px 20px 12px",
    borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#000000",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "17px",
    fontWeight: 400,
    color: "#2d8659",
    cursor: "pointer",
    padding: "4px 8px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    "&:active": {
      opacity: 0.6,
    },
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    paddingBottom: "24px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "24px",
  },
  label: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#2d8659",
    marginBottom: "8px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "17px",
    border: "1px solid #2d8659",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#2d8659",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
    "&:focus": {
      borderColor: "#4a9d6e",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(45, 134, 89, 0.2)",
    },
    "&::placeholder": {
      color: "#8e8e93",
    },
  },
  inputError: {
    borderColor: "#dc3545",
    "&:focus": {
      borderColor: "#dc3545",
      boxShadow: "0 0 0 3px rgba(220, 53, 69, 0.2)",
    },
  },
  errorMessage: {
    fontSize: "13px",
    color: "#dc3545",
    marginTop: "6px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
  },
  footer: {
    padding: "16px 20px",
    paddingTop: "12px",
    borderTop: "0.5px solid rgba(0, 0, 0, 0.1)",
    display: "flex",
    gap: "12px",
    flexShrink: 0,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  cancelButton: {
    flex: 1,
    padding: "14px 20px",
    fontSize: "17px",
    fontWeight: 400,
    color: "#2d8659",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    transition: "background-color 0.2s",
    "&:active": {
      backgroundColor: "rgba(45, 134, 89, 0.1)",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  saveButton: {
    flex: 1,
    padding: "14px 20px",
    fontSize: "17px",
    fontWeight: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
    transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
    "&:active": {
      opacity: 0.8,
      transform: "translateY(1px)",
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none",
    },
  },
  "@media (max-width: 480px)": {
    bottomSheet: {
      maxHeight: "90vh",
    },
    title: {
      fontSize: "18px",
    },
    input: {
      fontSize: "16px",
      padding: "14px 16px",
    },
    saveButton: {
      fontSize: "16px",
    },
    cancelButton: {
      fontSize: "16px",
    },
  },
});

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordBottomSheet = ({ isOpen, handleClose, userId }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.users);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setValues(initialState);
      setCurrentPasswordError("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = values;

    // Clear previous errors
    setCurrentPasswordError("");

    if (!currentPassword || currentPassword.trim() === "") {
      toast.error("Please enter your current password");
      return;
    }

    if (!newPassword || newPassword.trim() === "") {
      toast.error("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from current password");
      return;
    }

    const updateData = {
      userId: userId,
      currentPassword: currentPassword.trim(),
      newPassword: newPassword.trim(),
    };

    try {
      const result = await dispatch(updateUserPassword(updateData));
      if (updateUserPassword.fulfilled.match(result)) {
        handleClose();
        setValues(initialState);
        setCurrentPasswordError("");
      } else if (updateUserPassword.rejected.match(result)) {
        const errorMessage = result.payload || "Failed to update password";
        // Check if error is about current password
        if (
          errorMessage.toLowerCase().includes("current password") ||
          errorMessage.toLowerCase().includes("incorrect")
        ) {
          setCurrentPasswordError(errorMessage);
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const onClose = () => {
    handleClose();
    setValues(initialState);
    setCurrentPasswordError("");
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    // Clear error when user starts typing in current password field
    if (name === "currentPassword" && currentPasswordError) {
      setCurrentPasswordError("");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${classes.overlay} ${isOpen ? "open" : ""}`}
      onClick={handleOverlayClick}>
      <div className={`${classes.bottomSheet} ${isOpen ? "open" : ""}`}>
        <div className={classes.handle} />
        <div className={classes.header}>
          <h2 className={classes.title}>Change Password</h2>
          <button className={classes.closeButton} onClick={onClose}>
            Cancel
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className={classes.content}>
            <div className={classes.inputContainer}>
              <label htmlFor="currentPassword" className={classes.label}>
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                className={`${classes.input} ${
                  currentPasswordError ? classes.inputError : ""
                }`}
                placeholder="Enter current password..."
                required
              />
              {currentPasswordError && (
                <span className={classes.errorMessage}>
                  {currentPasswordError}
                </span>
              )}
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="newPassword" className={classes.label}>
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                className={classes.input}
                placeholder="Enter new password..."
                required
                minLength={6}
              />
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="confirmPassword" className={classes.label}>
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                className={classes.input}
                placeholder="Confirm new password..."
                required
                minLength={6}
              />
            </div>
          </div>
          <div className={classes.footer}>
            <button
              type="button"
              className={classes.cancelButton}
              onClick={onClose}
              disabled={isLoading}>
              Cancel
            </button>
            <button
              type="submit"
              className={classes.saveButton}
              disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordBottomSheet;

