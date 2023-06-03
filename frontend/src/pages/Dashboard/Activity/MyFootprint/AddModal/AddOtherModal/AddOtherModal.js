import Modal from "react-overlays/Modal";
import "../AddModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { addOtherFootprint } from "../../../../../../reducers/dailyFootprintSlice";

const initialState = {
  name: "",
  footprint: 0,
};

const AddOtherModal = ({ isOpen, handleClose }) => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, footprint } = values;
    console.log({
      name: name,
      footprint: footprint,
    });

    if (!name || !footprint) {
      toast.error("Please fill out all fields");
      return;
    }

    const userId = user.id;
    const addedFootprint = {
      name: name,
      footprint: footprint,
    };
    dispatch(
      addOtherFootprint({ userId: userId, addedFootprint: addedFootprint })
    );
    handleClose();
    setValues(initialState);
  };

  const onClose = () => {
    console.log(values);
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
            <button className="secondary-button" onClick={onClose}>
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