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

const useStyles = createUseStyles({
  modalChange: {
    position: "fixed",
    width: "500px",
    maxWidth: "90vw",
    zIndex: 1040,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
  },
  modal: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    overflow: "hidden",
  },
  backdrop: {
    position: "fixed",
    zIndex: 1039,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  header: {
    padding: "20px 24px 16px",
    borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#2d8659",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    margin: 0,
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
    "&:hover": {
      opacity: 0.7,
    },
    "&:active": {
      opacity: 0.5,
    },
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    "&:last-child": {
      marginBottom: 0,
    },
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
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    "&:focus": {
      borderColor: "#4a9d6e",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(45, 134, 89, 0.2)",
    },
    "&::placeholder": {
      color: "#8e8e93",
    },
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "17px",
    border: "1px solid #2d8659",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    cursor: "pointer",
    "&:focus": {
      borderColor: "#4a9d6e",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(45, 134, 89, 0.2)",
    },
    "& option": {
      padding: "8px",
      backgroundColor: "#ffffff",
      color: "#000000",
    },
  },
  footer: {
    padding: "16px 24px 20px",
    borderTop: "0.5px solid rgba(0, 0, 0, 0.1)",
    display: "flex",
    gap: "12px",
    flexShrink: 0,
    backgroundColor: "#ffffff",
  },
  cancelButton: {
    flex: 1,
    padding: "14px 20px",
    fontSize: "17px",
    fontWeight: 400,
    color: "#2d8659",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "rgba(45, 134, 89, 0.1)",
    },
    "&:active": {
      backgroundColor: "rgba(45, 134, 89, 0.15)",
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
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
    transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 8px 0",
      transform: "translateY(-1px)",
    },
    "&:active": {
      opacity: 0.8,
      transform: "translateY(0)",
    },
  },
  "@media (max-width: 768px)": {
    modalChange: {
      width: "100%",
      maxWidth: "100%",
      top: "auto",
      bottom: 0,
      left: 0,
      transform: "none",
      borderRadius: "12px 12px 0 0",
      maxHeight: "85vh",
    },
    header: {
      padding: "16px 20px 12px",
    },
    content: {
      padding: "20px",
    },
    footer: {
      padding: "16px 20px",
    },
  },
  "@media (max-width: 480px)": {
    modalChange: {
      maxHeight: "90vh",
    },
    title: {
      fontSize: "16px",
    },
    input: {
      fontSize: "16px",
      padding: "14px 16px",
    },
    select: {
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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [isOpen]);

  const estimateFootprint = async (transportName, kilometers) => {
    if (!transportName || !kilometers || kilometers <= 0) {
      return;
    }

    setIsCalculating(true);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const estimatedFootprint = await calculateFootprintClimatiq(
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

  if (!isOpen) return null;

  return (
    <Modal
      className={classes.modalChange}
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2 className={classes.title}>Add Transport Footprint</h2>
          <button className={classes.closeButton} onClick={onClose}>
            Cancel
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className={classes.content}>
            <div className={classes.inputContainer}>
              <label htmlFor="name" className={classes.label}>
                Transport Type
              </label>
              <select
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name}
                className={classes.select}
                required>
                <option value="">Select transport type</option>
                {TRANSPORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="kilometers" className={classes.label}>
                Kilometers {isCalculating && "(calculating...)"}
              </label>
              <input
                id="kilometers"
                type="number"
                name="kilometers"
                value={values.kilometers}
                onChange={handleNumberChange}
                className={classes.input}
                placeholder="Enter kilometers..."
                min={minKilometers}
                max={maxKilometers}
                required
              />
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="footprint" className={classes.label}>
                Footprint (kg CO2)
              </label>
              <input
                id="footprint"
                type="number"
                name="footprint"
                value={values.footprint}
                onChange={handleNumberChange}
                className={classes.input}
                placeholder="Auto-calculated"
                min={minFootprint}
                max={maxFootprint}
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
    </Modal>
  );
};
export default AddTransportModal;
