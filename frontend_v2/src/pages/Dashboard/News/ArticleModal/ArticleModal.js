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
    borderRadius: "8px",
    boxShadow:
      "0 8px 32px rgba(45, 134, 89, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  backdrop: {
    position: "fixed",
    zIndex: 1040,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
  },
  modalHeader: {
    borderBottom: "1px solid rgba(45, 134, 89, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
    borderRadius: "8px 8px 0 0",
    color: "white",
    padding: "1.5rem 2rem",
    boxShadow: "0 2px 8px rgba(45, 134, 89, 0.2)",
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: "1.25rem",
    color: "#ffffff",
  },
  closeButton: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: 1,
    color: "#ffffff",
    border: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "scale(1.1)",
    },
  },
  articleDescription: {
    padding: "2rem",
    color: "#2d8659",
    fontWeight: 400,
    overflowY: "auto",
    flex: 1,
    lineHeight: "1.6",
    fontSize: "1rem",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0",
      height: "0",
    },
  },
});

const ArticleModal = ({ isOpen, handleClose, title, description }) => {
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
export default ArticleModal;
