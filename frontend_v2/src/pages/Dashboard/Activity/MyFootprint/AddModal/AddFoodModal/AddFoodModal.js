import Modal from "react-overlays/Modal";
import "../AddModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addFoodFootprint } from "../../../../../../reducers/dailyFootprintSlice";

const initialState = {
  name: "",
  meal: "BREAKFAST",
  footprint: 0,
};

const AddFoodModal = ({ isOpen, handleClose }) => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const minFootprint = 0;
  const maxFootprint = 5000;

  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

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
      className="modal"
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Add food footprint</div>
          <div>
            <span className="close-button" onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className="footprint-form" onSubmit={onSubmit}>
          <div className="modal-desc">
            <div className="footprint-input">
              <label>Meal description</label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name}
              />
            </div>
            <div className="footprint-input">
              <label>Meal</label>
              <select name="meal" onChange={handleChange}>
                <option value="BREAKFAST">BREAKFAST</option>
                <option value="LUNCH">LUNCH</option>
                <option value="DINNER">DINNER</option>
                <option value="DESSERT">DESSERT</option>
                <option value="SUPPER">SUPPER</option>
              </select>
            </div>
            <div className="footprint-input">
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
          <div className="modal-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}>
              Close
            </button>
            <input
              type="submit"
              value="Save Changes"
              className="primary-button"></input>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddFoodModal;
