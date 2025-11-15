import "./MyFootprint.css";
import ActivitySectionPart from "./ActivitySectionPart/ActivitySectionPart";
import AddTransportModal from "./AddModal/AddTransportModal/AddTransportModal";
import AddFoodModal from "./AddModal/AddFoodModal/AddFoodModal";
import AddOtherModal from "./AddModal/AddOtherModal/AddOtherModal";
import AddCompensatedModal from "./AddModal/AddCompensatedModal/AddCompensatedModal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  getTransportFootprint,
  getFoodFootprint,
  getOtherFootprint,
  getCompensatedFootprint,
} from "../../../../reducers/dailyFootprintSlice";

const MyFootprint = () => {
  const { user } = useSelector((store) => store.user);
  const { transport, food, other, compensated } = useSelector(
    (store) => store.footprint
  );
  const dispatch = useDispatch();
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [showCompensatedModal, setShowCompensatedModal] = useState(false);

  useEffect(() => {
    dispatch(getTransportFootprint(user.id));
    dispatch(getFoodFootprint(user.id));
    dispatch(getOtherFootprint(user.id));
    dispatch(getCompensatedFootprint(user.id));
  }, [dispatch, user.id]);

  const openTransportAddModal = () => {
    setShowTransportModal(true);
  };

  const handleTransportModalClose = () => {
    setShowTransportModal(false);
  };

  const openFoodAddModal = () => {
    setShowFoodModal(true);
  };

  const handleFoodModalClose = () => {
    setShowFoodModal(false);
  };

  const openOtherAddModal = () => {
    setShowOtherModal(true);
  };

  const handleOtherModalClose = () => {
    setShowOtherModal(false);
  };

  const openCompensatedAddModal = () => {
    setShowCompensatedModal(true);
  };

  const handleCompensatedAddModalClose = () => {
    setShowCompensatedModal(false);
  };

  return (
    <section className="my-footprint">
      <AddTransportModal
        isOpen={showTransportModal}
        handleClose={handleTransportModalClose}
      />
      <AddFoodModal isOpen={showFoodModal} handleClose={handleFoodModalClose} />
      <AddOtherModal
        isOpen={showOtherModal}
        handleClose={handleOtherModalClose}
      />
      <AddCompensatedModal
        isOpen={showCompensatedModal}
        handleClose={handleCompensatedAddModalClose}
      />
      <ActivitySectionPart
        label="Transport"
        data={transport}
        onAddButton={openTransportAddModal}
      />
      <ActivitySectionPart
        label="Food"
        data={food}
        onAddButton={openFoodAddModal}
      />
      <ActivitySectionPart
        label="Other"
        data={other}
        onAddButton={openOtherAddModal}
      />
      <ActivitySectionPart
        label="Compensated"
        data={compensated}
        onAddButton={openCompensatedAddModal}
      />
    </section>
  );
};
export default MyFootprint;
