import Modal from "react-overlays/Modal";
import "../AddModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCompensatedFootprint } from "../../../../../../reducers/dailyFootprintSlice";

const initialState = {
  name: "",
  footprint: 0,
};

const AddCompensatedModal = ({ isOpen, handleClose }) => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const minFootprint = 0;
  const maxFootprint = 5000;

  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, footprint } = values;

    if (!name || !footprint) {
      toast.error("Please fill out all fields");
      return;
    }

    dispatch(addCompensatedFootprint({ name: name, footprint: footprint }));
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

  const handleNumberChange = (e) => {
    e.stopPropagation();

    const name = e.target.name;
    let value = e.target.value;

    value = Math.max(
      minFootprint,
      Math.min(maxFootprint, Number(e.target.value))
    );

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
          <div className="modal-title">Add compensated footprint</div>
          <div>
            <span className="close-button" onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className="footprint-form" onSubmit={onSubmit}>
          <div className="modal-desc">
            <div className="footprint-input">
              <label>Description</label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name}
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
export default AddCompensatedModal;
