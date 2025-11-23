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

const AddTransportBottomSheet = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [isCalculating, setIsCalculating] = useState(false);
  const dispatch = useDispatch();
  const debounceTimer = useRef(null);
  const minFootprint = 0;
  const maxFootprint = 5000;
  const minKilometers = 0;
  const maxKilometers = 10000;

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
        // If there is an error we want to calculate based on local data in calculateFootprintLocal
        // Less precise but better than leaving user with no data
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
          <h2 className={classes.title}>Add Transport Footprint</h2>
          <button className={classes.closeButton} onClick={onClose}>
            Cancel
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className={classes.content}>
            <div className={classes.inputContainer}>
              <label htmlFor="transport-name" className={classes.label}>
                Transport Type
              </label>
              <select
                id="transport-name"
                name="name"
                value={values.name}
                onChange={handleChange}
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
                Kilometers
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
              />
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="footprint" className={classes.label}>
                Footprint {isCalculating && "(calculating...)"}
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

export default AddTransportBottomSheet;

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
  select: {
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
    cursor: "pointer",
    transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
    "&:focus": {
      borderColor: "#4a9d6e",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(45, 134, 89, 0.2)",
    },
    "& option": {
      padding: "8px",
      backgroundColor: "#ffffff",
      color: "#2d8659",
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
