import Modal from "react-overlays/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { addGoal } from "../../../../../../reducers/goalsSlice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  modal: {
    position: "fixed",
    width: "700px",
    zIndex: 1040,
    top: "35%",
    left: "40%",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 25px rgba(0, 0, 0, 0.7)",
  },
  backdrop: {
    position: "fixed",
    zIndex: 1040,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    opacity: 0.5,
  },
  modalHeader: {
    borderBottom: "1px solid #e9ecef",
    display: "flex",
    justifyContent: "space-between",
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    borderRadius: "10px 10px 0 0",
    color: "white",
    padding: "20px",
  },
  modalTitle: {
    fontWeight: 500,
    fontSize: "1rem",
  },
  closeButton: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: 1,
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
  },
  modalDesc: {
    height: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  footprintInputSingle: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    margin: "1rem",
    width: "80%",
    "& input": {
      padding: "12px 20px",
      fontSize: "2.5vh",
      borderWidth: "calc(var(--border-width) * 1px)",
      borderStyle: "solid",
      borderColor: "#2d8659",
      borderRadius: "10px",
      textAlign: "center",
      outline: "transparent",
      width: "100%",
    },
    "& label": {
      fontSize: "15px",
      color: "#2d8659",
      textAlign: "center",
      marginBottom: "0.5rem",
      marginLeft: "0.5rem",
    },
  },
  modalFooter: {
    borderTop: "1px solid #e9ecef",
    display: "flex",
    justifyContent: "flex-end",
    padding: "8px",
    paddingRight: "20px",
  },
  secondaryButton: {
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    border: "none",
    borderRadius: "8px",
    boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "#ffffff",
    cursor: "pointer",
    fontFamily:
      '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: "14px",
    fontWeight: 400,
    padding: "15px 30px",
    textAlign: "center",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    touchAction: "manipulation",
    margin: "0.5rem",
    "&:hover": {
      boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
  primaryButton: {
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    border: "none",
    borderRadius: "8px",
    boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
    boxSizing: "border-box",
    color: "#fff",
    cursor: "pointer",
    fontFamily:
      '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: "14px",
    fontWeight: 400,
    textAlign: "center",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    touchAction: "manipulation",
    padding: "15px 30px",
    margin: "0.5rem",
    "&:hover": {
      boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
  bottomSheetHandle: {
    display: "none",
  },
  "@media (max-width: 768px)": {
    modal: {
      width: "100%",
      left: 0,
      right: 0,
      top: "auto",
      bottom: 0,
      maxHeight: "85vh",
      borderRadius: "16px 16px 0 0",
      transform: "translateY(0)",
      transition: "transform 0.3s ease-out",
    },
    modalHeader: {
      padding: "15px",
      borderRadius: "16px 16px 0 0",
      position: "relative",
      paddingTop: "25px",
    },
    bottomSheetHandle: {
      display: "block",
      position: "absolute",
      top: "8px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "40px",
      height: "4px",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: "2px",
    },
    modalDesc: {
      flexDirection: "column",
      padding: "15px",
      maxHeight: "calc(85vh - 200px)",
      overflowY: "auto",
    },
    footprintInputSingle: {
      width: "100%",
      margin: "0.75rem",
    },
  },
  "@media (max-width: 480px)": {
    modal: {
      width: "100%",
      left: 0,
      right: 0,
      top: "auto",
      bottom: 0,
      maxHeight: "90vh",
      borderRadius: "16px 16px 0 0",
    },
    modalHeader: {
      padding: "12px",
      paddingTop: "22px",
      borderRadius: "16px 16px 0 0",
    },
    modalTitle: {
      fontSize: "0.9rem",
    },
    modalDesc: {
      padding: "12px",
      maxHeight: "calc(90vh - 180px)",
    },
    footprintInputSingle: {
      margin: "0.5rem",
      "& input": {
        fontSize: "16px",
        padding: "10px 15px",
      },
      "& label": {
        fontSize: "14px",
      },
    },
    modalFooter: {
      padding: "6px",
      paddingRight: "12px",
    },
    secondaryButton: {
      padding: "10px 20px",
      fontSize: "13px",
    },
    primaryButton: {
      padding: "10px 20px",
      fontSize: "13px",
    },
  },
});

const initialState = {
  name: "",
};

const AddOtherModal = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const renderBackdrop = (props) => (
    <div className={classes.backdrop} {...props} />
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const { name } = values;

    if (!name) {
      toast.error("Please fill out all fields");
      return;
    }

    dispatch(addGoal({ name: name }));
    handleClose();
    setValues(initialState);
  };

  const onClose = () => {
    handleClose();
    setValues(initialState);
  };

  const handleChange = (e) => {
    e.stopPropagation();

    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  return (
    <Modal
      className={classes.modal}
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className={classes.modal}>
        <div className={classes.modalHeader}>
          <div className={classes.bottomSheetHandle}></div>
          <div className={classes.modalTitle}>Add goal</div>
          <div>
            <span className={classes.closeButton} onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className="footprint-form" onSubmit={onSubmit}>
          <div className={classes.modalDesc}>
            <div className={classes.footprintInputSingle}>
              <label>Goal description</label>
              <input
                maxLength={100}
                type="text"
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name}
              />
            </div>
          </div>
          <div className={classes.modalFooter}>
            <button
              type="button"
              className={classes.secondaryButton}
              onClick={onClose}>
              Close
            </button>
            <input
              type="submit"
              value="Save Changes"
              className={classes.primaryButton}></input>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddOtherModal;
