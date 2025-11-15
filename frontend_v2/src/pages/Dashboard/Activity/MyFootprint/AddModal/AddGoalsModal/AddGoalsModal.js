import Modal from "react-overlays/Modal";
import "../AddModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { addGoal } from "../../../../../../reducers/goalsSlice";

const initialState = {
  name: "",
};

const AddOtherModal = ({ isOpen, handleClose }) => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

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
      className="modal"
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Add custom footprint</div>
          <div>
            <span className="close-button" onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className="footprint-form" onSubmit={onSubmit}>
          <div className="modal-desc">
            <div className="footprint-input-single">
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
export default AddOtherModal;
