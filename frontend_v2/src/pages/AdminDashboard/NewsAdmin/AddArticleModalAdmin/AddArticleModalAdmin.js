import Modal from "react-overlays/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addArticle } from "../../../../reducers/allArticlesSlice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  modalChange: {
    position: "fixed",
    width: "600px",
    maxWidth: "90vw",
    zIndex: 1040,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
  },
  modal: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    overflow: "hidden",
  },
  backdrop: {
    position: "fixed",
    zIndex: 1039,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  header: {
    padding: "20px 24px 16px",
    borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#2d8659",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    margin: 0,
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
    "&:hover": {
      opacity: 0.7,
    },
    "&:active": {
      opacity: 0.5,
    },
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    "&:last-child": {
      marginBottom: 0,
    },
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
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    "&:focus": {
      borderColor: "#4a9d6e",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(45, 134, 89, 0.2)",
    },
    "&::placeholder": {
      color: "#8e8e93",
    },
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "17px",
    border: "1px solid #2d8659",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    minHeight: "150px",
    resize: "vertical",
    "&:focus": {
      borderColor: "#4a9d6e",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 3px rgba(45, 134, 89, 0.2)",
    },
    "&::placeholder": {
      color: "#8e8e93",
    },
  },
  footer: {
    padding: "16px 24px 20px",
    borderTop: "0.5px solid rgba(0, 0, 0, 0.1)",
    display: "flex",
    gap: "12px",
    flexShrink: 0,
    backgroundColor: "#ffffff",
  },
  cancelButton: {
    flex: 1,
    padding: "14px 20px",
    fontSize: "17px",
    fontWeight: 400,
    color: "#2d8659",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "rgba(45, 134, 89, 0.1)",
    },
    "&:active": {
      backgroundColor: "rgba(45, 134, 89, 0.15)",
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
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
    transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 8px 0",
      transform: "translateY(-1px)",
    },
    "&:active": {
      opacity: 0.8,
      transform: "translateY(0)",
    },
  },
  "@media (max-width: 768px)": {
    modalChange: {
      width: "100%",
      maxWidth: "100%",
      top: "auto",
      bottom: 0,
      left: 0,
      transform: "none",
      borderRadius: "12px 12px 0 0",
      maxHeight: "85vh",
    },
    header: {
      padding: "16px 20px 12px",
    },
    content: {
      padding: "20px",
    },
    footer: {
      padding: "16px 20px",
    },
  },
  "@media (max-width: 480px)": {
    modalChange: {
      maxHeight: "90vh",
    },
    title: {
      fontSize: "16px",
    },
    input: {
      fontSize: "16px",
      padding: "14px 16px",
    },
    textarea: {
      fontSize: "16px",
      padding: "14px 16px",
      minHeight: "120px",
    },
    saveButton: {
      fontSize: "16px",
    },
    cancelButton: {
      fontSize: "16px",
    },
  },
});

const initialState = {
  name: "",
  image: "",
  description: "",
};

const AddArticleModalAdmin = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const renderBackdrop = (props) => (
    <div className={classes.backdrop} {...props} />
  );

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
    e.stopPropagation();
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <Modal
      className={classes.modalChange}
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2 className={classes.title}>Add Article</h2>
          <button className={classes.closeButton} onClick={onClose}>
            Cancel
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className={classes.content}>
            <div className={classes.inputContainer}>
              <label htmlFor="name" className={classes.label}>
                Title
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className={classes.input}
                placeholder="Enter article title..."
                required
              />
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="image" className={classes.label}>
                Image URL
              </label>
              <input
                id="image"
                type="text"
                name="image"
                value={values.image}
                onChange={handleChange}
                className={classes.input}
                placeholder="Enter image URL..."
                required
              />
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor="description" className={classes.label}>
                Article
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                className={classes.textarea}
                placeholder="Enter article content..."
                required
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
    </Modal>
  );
};
export default AddArticleModalAdmin;
