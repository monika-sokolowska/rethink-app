import Modal from "react-overlays/Modal";
import "../AddModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTransportFootprint } from "../../../../../../reducers/dailyFootprintSlice";

const initialState = {
  name: "",
  kilometers: 0,
  footprint: 0,
};

const AddTransportModal = ({ isOpen, handleClose }) => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
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
          <div className="modal-title">Add transport footprint</div>
          <div>
            <span className="close-button" onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className="footprint-form" onSubmit={onSubmit}>
          <div className="modal-desc">
            <div className="footprint-input">
              <label>Transport name</label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name}
              />
            </div>
            <div className="footprint-input">
              <label>Kilometers</label>
              <input
                type="number"
                id="kilometers"
                onChange={handleChange}
                name="kilometers"
                value={values.kilometers}
              />
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
              className="secondary-button"
              onClick={onClose}
              type="button">
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
export default AddTransportModal;
