import Modal from "react-overlays/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addArticle } from "../../../../reducers/allArticlesSlice";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  addArticleModal: {
    position: "fixed",
    width: "900px",
    height: "600px",
    zIndex: 1040,
    top: "10%",
    left: "30%",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 5px 25px rgba(0, 0, 0, 0.7)",
    overflow: "hidden",
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
  articleModalHeader: {
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
    fontSize: "1.25rem",
  },
  closeButton: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: 1,
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
  },
  articleModalDesc: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    overflowY: "auto",
    height: "75%",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0",
      height: "0",
    },
  },
  articleForm: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  articleInput: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    margin: "1rem",
    width: "90%",
    "& input": {
      padding: "12px 20px",
      fontSize: "1.1rem",
      borderWidth: "calc(var(--border-width) * 1px)",
      borderStyle: "solid",
      borderColor: "#2d8659",
      borderRadius: "10px",
      textAlign: "left",
      outline: "transparent",
      width: "100%",
    },
    "& textarea": {
      padding: "12px 20px",
      fontSize: "1.1rem",
      borderWidth: "calc(var(--border-width) * 1px)",
      borderStyle: "solid",
      borderColor: "#2d8659",
      borderRadius: "10px",
      textAlign: "left",
      outline: "transparent",
      width: "100%",
      minWidth: "100%",
      minHeight: "200px",
      maxWidth: "100%",
    },
    "& label": {
      fontSize: "18px",
      color: "#2d8659",
      textAlign: "center",
      marginBottom: "0.5rem",
      marginLeft: "0.5rem",
      fontWeight: 500,
    },
  },
  articleModalFooter: {
    borderTop: "1px solid #e9ecef",
    display: "flex",
    justifyContent: "flex-end",
    padding: "8px",
    paddingRight: "20px",
    height: "fit-content",
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
    fontSize: "16px",
    fontWeight: 500,
    padding: "18px 40px",
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
    fontSize: "16px",
    fontWeight: 500,
    textAlign: "center",
    transform: "translateY(0)",
    transition: "transform 150ms, box-shadow 150ms",
    touchAction: "manipulation",
    padding: "18px 40px",
    margin: "0.5rem",
    "&:hover": {
      boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 9px 0",
      transform: "translateY(-2px)",
    },
  },
  "@media (max-width: 768px)": {
    addArticleModal: {
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      borderRadius: 0,
    },
    articleModalHeader: {
      padding: "1rem 1.5rem",
      borderRadius: 0,
    },
    modalTitle: {
      fontSize: "1.2rem",
    },
    articleModalDesc: {
      padding: "1.5rem",
      maxHeight: "calc(100vh - 200px)",
    },
    articleInput: {
      width: "100%",
      margin: "0.75rem",
      "& input": {
        fontSize: "18px",
        padding: "12px 18px",
      },
      "& textarea": {
        fontSize: "18px",
        padding: "12px 18px",
        minHeight: "150px",
      },
      "& label": {
        fontSize: "16px",
      },
    },
    articleModalFooter: {
      padding: "6px",
      paddingRight: "12px",
    },
    secondaryButton: {
      padding: "14px 28px",
      fontSize: "15px",
    },
    primaryButton: {
      padding: "14px 28px",
      fontSize: "15px",
    },
  },
  "@media (max-width: 480px)": {
    addArticleModal: {
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      borderRadius: 0,
    },
    articleModalHeader: {
      padding: "0.75rem 1rem",
      borderRadius: 0,
    },
    modalTitle: {
      fontSize: "1.1rem",
    },
    articleModalDesc: {
      padding: "1rem",
      maxHeight: "calc(100vh - 180px)",
    },
    articleInput: {
      margin: "0.5rem",
      "& input": {
        fontSize: "16px",
        padding: "10px 15px",
      },
      "& textarea": {
        fontSize: "16px",
        padding: "10px 15px",
        minHeight: "120px",
      },
      "& label": {
        fontSize: "15px",
      },
    },
    articleModalFooter: {
      padding: "4px",
      paddingRight: "8px",
    },
    secondaryButton: {
      padding: "12px 24px",
      fontSize: "14px",
    },
    primaryButton: {
      padding: "12px 24px",
      fontSize: "14px",
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
  const renderBackdrop = (props) => (
    <div className={classes.backdrop} {...props} />
  );
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
      className={classes.addArticleModal}
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className={classes.addArticleModal}>
        <div className={classes.articleModalHeader}>
          <div className={classes.modalTitle}>Add article</div>
          <div>
            <span className={classes.closeButton} onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <form className={classes.articleForm} onSubmit={onSubmit}>
          <div className={classes.articleModalDesc}>
            <div className={classes.articleInput}>
              <label>Title</label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name}
              />
            </div>
            <div className={classes.articleInput}>
              <label>Image url</label>
              <input
                type="text"
                id="image"
                onChange={handleChange}
                name="image"
                value={values.image}
              />
            </div>
            <div className={classes.articleInput}>
              <label>Article</label>
              <textarea
                type="text"
                onChange={handleChange}
                name="description"
                value={values.description}
              />
            </div>
          </div>
          <div className={classes.articleModalFooter}>
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
export default AddArticleModalAdmin;
