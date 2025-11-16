import Modal from "react-overlays/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addFoodFootprint } from "../../../../../../reducers/dailyFootprintSlice";
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
    backgroundColor: "rgb(17, 20, 48)",
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
  footprintInput: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    margin: "1rem",
    width: "30%",
    "& input": {
      padding: "12px 20px",
      fontSize: "2.5vh",
      borderWidth: "calc(var(--border-width) * 1px)",
      borderStyle: "solid",
      borderColor: "rgb(17, 20, 48)",
      borderRadius: "10px",
      textAlign: "center",
      outline: "transparent",
      width: "100%",
    },
    "& select": {
      padding: "12px 20px",
      fontSize: "2.5vh",
      borderWidth: "calc(var(--border-width) * 1px)",
      borderStyle: "solid",
      borderColor: "rgb(17, 20, 48)",
      borderRadius: "10px",
      textAlign: "center",
      outline: "transparent",
      width: "100%",
    },
    "& label": {
      fontSize: "15px",
      color: "rgb(17, 20, 48)",
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
    backgroundColor: "rgb(17, 20, 48)",
    border: "1px solid rgb(17, 20, 48)",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
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
  },
  primaryButton: {
    backgroundColor: "rgb(17, 20, 48)",
    border: "1px solid rgb(17, 20, 48)",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px 0",
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
  },
});

const initialState = {
  name: "",
  meal: "BREAKFAST",
  footprint: 0,
};

const AddFoodModal = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const minFootprint = 0;
  const maxFootprint = 5000;

  const renderBackdrop = (props) => (
    <div className={classes.backdrop} {...props} />
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, meal, footprint } = values;

    if (!name || !meal || !footprint) {
      toast.error("Please fill out all fields");
      return;
    }

    dispatch(
      addFoodFootprint({ name: name, meal: meal, footprint: footprint })
    );
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
          <div className={classes.modalTitle}>Add food footprint</div>
          <div>
            <span className={classes.closeButton} onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className="footprint-form" onSubmit={onSubmit}>
          <div className={classes.modalDesc}>
            <div className={classes.footprintInput}>
              <label>Meal description</label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name}
              />
            </div>
            <div className={classes.footprintInput}>
              <label>Meal</label>
              <select name="meal" onChange={handleChange}>
                <option value="BREAKFAST">BREAKFAST</option>
                <option value="LUNCH">LUNCH</option>
                <option value="DINNER">DINNER</option>
                <option value="DESSERT">DESSERT</option>
                <option value="SUPPER">SUPPER</option>
              </select>
            </div>
            <div className={classes.footprintInput}>
              <label>Footprint</label>
              <input
                type="number"
                id="footprint"
                onChange={handleChange}
                name="footprint"
                value={values.footprint}
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
export default AddFoodModal;
