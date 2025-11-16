import Modal from "react-overlays/Modal";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  articleModal: {
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
  modalHeader: {
    borderBottom: "1px solid #e9ecef",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "rgb(17, 20, 48)",
    borderRadius: "10px 10px 0 0",
    color: "white",
    padding: "20px",
  },
  modalTitle: {
    fontWeight: 500,
    fontSize: "1rem",
  },
  closeButton: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: 1,
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
  },
  articleDescription: {
    padding: "1rem",
    color: "rgb(17, 20, 48)",
    fontWeight: 600,
    overflowY: "scroll",
    height: "100%",
  },
});

const ArticleModalAdmin = ({ isOpen, handleClose, title, description }) => {
  const classes = useStyles();
  const renderBackdrop = (props) => (
    <div className={classes.backdrop} {...props} />
  );

  return (
    <Modal
      className={classes.articleModal}
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className={classes.articleModal}>
        <div className={classes.modalHeader}>
          <div className={classes.modalTitle}>{title}</div>
          <div>
            <span className={classes.closeButton} onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <div className={classes.articleDescription}>{description}</div>
      </div>
    </Modal>
  );
};
export default ArticleModalAdmin;
