import "./AddArticleModalAdmin.css";
import Modal from "react-overlays/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addArticle } from "../../../../reducers/allArticlesSlice";

const initialState = {
  name: "",
  image: "",
  description: "",
};

const AddArticleModalAdmin = ({ isOpen, handleClose }) => {
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, image, description } = values;

    if (!name || !description || !image) {
      toast.error("Please fill out all fields");
      return;
    }

    dispatch(addArticle({ title: name, image: image, text: description }));
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

  return (
    <Modal
      className="add-article-modal"
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className="add-article-modal">
        <div className="article-modal-header">
          <div className="modal-title">Add article</div>
          <div>
            <span className="close-button" onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className="article-form" onSubmit={onSubmit}>
          <div className="article-modal-desc">
            <div className="article-input">
              <label>Title</label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name}
              />
            </div>
            <div className="article-input">
              <label>Image url</label>
              <input
                type="text"
                id="image"
                onChange={handleChange}
                name="image"
                value={values.image}
              />
            </div>
            <div className="article-input">
              <label>Article</label>
              <textarea
                type="text"
                onChange={handleChange}
                name="description"
                value={values.description}
              />
            </div>
          </div>
          <div className="article-modal-footer">
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
export default AddArticleModalAdmin;
