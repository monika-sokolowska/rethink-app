import Modal from "react-overlays/Modal";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTransportFootprint } from "../../../../../../reducers/dailyFootprintSlice";
import { createUseStyles } from "react-jss";
import {
  calculateFootprintLocal,
  TRANSPORT_OPTIONS,
  calculateFootprintClimatiq,
} from "./utils";

const initialState = {
  name: "",
  kilometers: 0,
  footprint: 0,
};

const AddTransportModal = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [isCalculating, setIsCalculating] = useState(false);
  const dispatch = useDispatch();
  const debounceTimer = useRef(null);
  const renderBackdrop = (props) => (
    <div className={classes.backdrop} {...props} />
  );
  const minFootprint = 0;
  const maxFootprint = 5000;

  const minKilometers = 0;
  const maxKilometers = 10000;

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, kilometers, footprint } = values;
    if (!name || !kilometers || !footprint) {
      toast.error("Please fill out all fields");
      return;
    }

    dispatch(
      addTransportFootprint({
        name: name,
        kilometers: kilometers,
        footprint: footprint,
      })
    );
    handleClose();
    setValues(initialState);
  };

  const onClose = () => {
    handleClose();
    setValues(initialState);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const estimateFootprint = async (transportName, kilometers) => {
    if (!transportName || !kilometers || kilometers <= 0) {
      return;
    }

    setIsCalculating(true);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        // const estimatedFootprint = await calculateFootprintClimatiq(
        //   transportName,
        //   kilometers
        // );

        const estimatedFootprint = calculateFootprintLocal(
          transportName,
          kilometers
        );

        setValues((prev) => ({
          ...prev,
          footprint: estimatedFootprint,
        }));
      } catch (error) {
        const estimatedFootprint = calculateFootprintLocal(
          transportName,
          kilometers
        );
        setValues((prev) => ({
          ...prev,
          footprint: estimatedFootprint,
        }));
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });

    // Auto-calculate footprint when name or kilometers change
    if (name === "name" || name === "kilometers") {
      const newValues = { ...values, [name]: value };
      if (newValues.name && newValues.kilometers) {
        estimateFootprint(
          newValues.name,
          parseFloat(newValues.kilometers) || 0
        );
      }
    }
  };

  const handleNumberChange = (e) => {
    e.stopPropagation();

    const name = e.target.name;
    let value = e.target.value;

    if (name === "footprint") {
      value = Math.max(
        minFootprint,
        Math.min(maxFootprint, Number(e.target.value))
      );
    } else if (name === "kilometers") {
      value = Math.max(
        minKilometers,
        Math.min(maxKilometers, Number(e.target.value))
      );
    }

    const newValues = { ...values, [name]: value };
    setValues(newValues);

    // Auto-calculate footprint when kilometers change
    if (name === "kilometers" && newValues.name && newValues.kilometers) {
      estimateFootprint(newValues.name, parseFloat(newValues.kilometers) || 0);
    }
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
          <div className={classes.modalTitle}>Add transport footprint</div>
          <div>
            <span className={classes.closeButton} onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className="footprint-form" onSubmit={onSubmit}>
          <div className={classes.modalDesc}>
            <div className={classes.footprintInput}>
              <label>Transport type</label>
              <select
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name}
                required>
                <option value="">Select transport type</option>
                {TRANSPORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.footprintInput}>
              <label>Kilometers</label>
              <input
                type="number"
                id="kilometers"
                onChange={handleNumberChange}
                name="kilometers"
                value={values.kilometers}
                min={minKilometers}
                max={maxKilometers}
              />
            </div>
            <div className={classes.footprintInput}>
              <label>Footprint {isCalculating && "(calculating...)"}</label>
              <input
                type="number"
                id="footprint"
                onChange={handleNumberChange}
                name="footprint"
                value={values.footprint}
                placeholder="Auto-calculated"
                min={minFootprint}
                max={maxFootprint}
              />
            </div>
          </div>
          <div className={classes.modalFooter}>
            <button
              className={classes.secondaryButton}
              onClick={onClose}
              type="button">
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
export default AddTransportModal;

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
      borderColor: "#2d8659",
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
      borderColor: "#2d8659",
      borderRadius: "10px",
      textAlign: "center",
      outline: "transparent",
      width: "100%",
      backgroundColor: "#ffffff",
      color: "#2d8659",
      cursor: "pointer",
      fontFamily:
        '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
      "&:focus": {
        borderColor: "#4a9d6e",
        boxShadow: "0 0 0 3px rgba(45, 134, 89, 0.2)",
      },
      "& option": {
        padding: "8px",
        backgroundColor: "#ffffff",
        color: "#2d8659",
      },
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
    footprintInput: {
      width: "100%",
      margin: "0.75rem",
      "& select": {
        fontSize: "18px",
        padding: "14px 18px",
      },
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
    footprintInput: {
      margin: "0.5rem",
      "& input": {
        fontSize: "16px",
        padding: "10px 15px",
      },
      "& select": {
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
