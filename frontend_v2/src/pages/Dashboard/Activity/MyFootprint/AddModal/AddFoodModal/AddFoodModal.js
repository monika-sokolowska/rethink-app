import Modal from "react-overlays/Modal";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addFoodFootprint } from "../../../../../../reducers/dailyFootprintSlice";
import { createUseStyles } from "react-jss";
import { searchFoodCategory, calculateFoodFootprintClimatiq } from "./utils";

const initialState = {
  name: "",
  meal: "BREAKFAST",
  weight: 0,
  footprint: 0,
};

const AddFoodModal = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const [activityId, setActivityId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const dispatch = useDispatch();
  const debounceTimer = useRef(null);
  const minFootprint = 0;
  const maxFootprint = 5000;
  const minWeight = 0;
  const maxWeight = 1000;

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
    setActivityId(null);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const estimateFootprint = async (activityId, weight) => {
    if (!activityId || !weight || weight <= 0) {
      return;
    }

    setIsCalculating(true);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const estimatedFootprint = await calculateFoodFootprintClimatiq(
          activityId,
          weight
        );

        if (estimatedFootprint !== null) {
          setValues((prev) => ({
            ...prev,
            footprint: estimatedFootprint,
          }));
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error calculating food footprint:", error);
        }
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  };

  const handleMealDescriptionBlur = async (mealDescription) => {
    if (!mealDescription || mealDescription.trim().length < 2) {
      setActivityId(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    try {
      const categoryResult = await searchFoodCategory(mealDescription);

      if (categoryResult && categoryResult.activity_id) {
        const newActivityId = categoryResult.activity_id;
        setActivityId(newActivityId);
        if (process.env.NODE_ENV === "development") {
          console.log("Activity ID saved:", newActivityId);
        }

        if (values.weight && values.weight > 0) {
          estimateFootprint(newActivityId, parseFloat(values.weight) || 0);
        }
      } else {
        setActivityId(null);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error in handleMealDescriptionBlur:", error);
      }
      setActivityId(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (e) => {
    e.stopPropagation();

    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });

    if (name === "weight" && activityId && value) {
      estimateFootprint(activityId, parseFloat(value) || 0);
    }
  };

  const handleBlur = (e) => {
    e.stopPropagation();
    const name = e.target.name;
    const value = e.target.value;

    if (name === "name") {
      if (process.env.NODE_ENV === "development") {
        console.log("Blur event triggered for meal description:", value);
      }
      handleMealDescriptionBlur(value);
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
    } else if (name === "weight") {
      value = Math.max(minWeight, Math.min(maxWeight, Number(e.target.value)));
    }

    const newValues = { ...values, [name]: value };
    setValues(newValues);

    if (name === "weight" && activityId && newValues.weight) {
      estimateFootprint(activityId, parseFloat(newValues.weight) || 0);
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
                onBlur={handleBlur}
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
              <label>Weight (kg)</label>
              <input
                type="number"
                id="weight"
                onChange={handleNumberChange}
                name="weight"
                value={values.weight}
                min={minWeight}
                max={maxWeight}
                step="0.1"
              />
            </div>
            <div className={classes.footprintInput}>
              <label>
                Footprint {(isSearching || isCalculating) && "(loading...)"}
              </label>
              <div className={classes.inputWrapper}>
                <input
                  type="float"
                  id="footprint"
                  onChange={handleNumberChange}
                  name="footprint"
                  value={values.footprint}
                  placeholder="Auto-calculated"
                  min={minFootprint}
                  max={maxFootprint}
                  disabled={isSearching || isCalculating}
                />
                {(isSearching || isCalculating) && (
                  <div className={classes.loader}></div>
                )}
              </div>
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
      "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
      },
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
    },
    "& label": {
      fontSize: "15px",
      color: "#2d8659",
      textAlign: "center",
      marginBottom: "0.5rem",
      marginLeft: "0.5rem",
    },
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  loader: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    border: "3px solid #f3f3f3",
    borderTop: "3px solid #2d8659",
    borderRadius: "50%",
    animation: "$spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": {
      transform: "translateY(-50%) rotate(0deg)",
    },
    "100%": {
      transform: "translateY(-50%) rotate(360deg)",
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
