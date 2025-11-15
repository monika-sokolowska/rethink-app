import Modal from "react-overlays/Modal";
import "../ChangeModal.css";
import "../../AddModal/AddModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { changeMainGoal } from "../../../../../../reducers/userSlice";

const initialState = {
  goal: "",
};

const ChangeMainGoalModal = ({ isOpen, handleClose }) => {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const min = 0;
  const max = 100;

  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  const onSubmit = (e) => {
    e.preventDefault();
    const { goal } = values;

    if (!goal) {
      toast.error("Please fill out all fields");
      return;
    }

    const userId = user.id;
    const mainGoal = {
      goal: goal,
    };
    dispatch(changeMainGoal({ userId: userId, goal: mainGoal }));
    handleClose();
    setValues(initialState);
  };

  const onClose = () => {
    handleClose();
    setValues(initialState);
  };

  const handleNumberChange = (e) => {
    e.stopPropagation();

    const name = e.target.name;
    const value = Math.max(min, Math.min(max, Number(e.target.value)));

    setValues({ ...values, [name]: value });
  };

  return (
    <Modal
      className="modal-change"
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className="modal">
        <div className="modal-change-header">
          <div className="modal-title">Change main goal</div>
          <div>
            <span className="close-button" onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className="footprint-form" onSubmit={onSubmit}>
          <div className="modal-desc">
            <div className="footprint-input">
              <label>Main goal</label>
              <input
                type="number"
                id="goal"
                onChange={handleNumberChange}
                name="goal"
                value={values.goal}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="secondary-button-change"
              onClick={onClose}>
              Close
            </button>
            <input
              type="submit"
              value="Save Changes"
              className="primary-button-change"></input>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default ChangeMainGoalModal;
