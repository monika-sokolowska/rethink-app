import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUserName } from "../../../reducers/usersSlice";
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
  name: "",
  lastName: "",
};

const ChangeNameBottomSheet = ({
  isOpen,
  handleClose,
  currentName,
  currentLastName,
  userId,
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: currentName || "",
    lastName: currentLastName || "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setValues({
        name: currentName || "",
        lastName: currentLastName || "",
      });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, currentName, currentLastName]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, lastName } = values;

    if (!name || name.trim() === "") {
      toast.error("Please enter a name");
      return;
    }

    if (!lastName || lastName.trim() === "") {
      toast.error("Please enter a last name");
      return;
    }

    const updateData = {
      userId: userId,
      name: name.trim(),
      lastName: lastName.trim(),
    };
    dispatch(updateUserName(updateData));
    handleClose();
    setValues(initialState);
  };

  const onClose = () => {
    handleClose();
    setValues({
      name: currentName || "",
      lastName: currentLastName || "",
    });
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
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
          <h2 className={classes.title}>Change Name</h2>
          <button className={classes.closeButton} onClick={onClose}>
            Cancel
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className={classes.content}>
            <div className={classes.inputContainer}>
              <label htmlFor="name" className={classes.label}>
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className={classes.input}
                placeholder="Enter name..."
                required
              />
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="lastName" className={classes.label}>
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                className={classes.input}
                placeholder="Enter last name..."
                required
              />
            </div>
          </div>
          <div className={classes.footer}>
            <button
              type="button"
              className={classes.cancelButton}
              onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={classes.saveButton}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeNameBottomSheet;

