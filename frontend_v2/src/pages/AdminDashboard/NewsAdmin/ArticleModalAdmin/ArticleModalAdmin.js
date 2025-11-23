import Modal from "react-overlays/Modal";
import { useEffect } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  modalChange: {
    position: "fixed",
    width: "700px",
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
    flex: 1,
    paddingRight: "16px",
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
  articleImage: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  articleDescription: {
    color: "#000000",
    fontWeight: 400,
    lineHeight: "1.6",
    fontSize: "17px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
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
    articleImage: {
      maxHeight: "200px",
    },
    articleDescription: {
      fontSize: "16px",
    },
  },
  "@media (max-width: 480px)": {
    modalChange: {
      maxHeight: "90vh",
    },
    title: {
      fontSize: "16px",
    },
    articleImage: {
      maxHeight: "180px",
    },
    articleDescription: {
      fontSize: "15px",
    },
  },
});

const ArticleModalAdmin = ({ isOpen, handleClose, title, description, image }) => {
  const classes = useStyles();

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

  if (!isOpen) return null;

  return (
    <Modal
      className={classes.modalChange}
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2 className={classes.title}>{title}</h2>
          <button className={classes.closeButton} onClick={handleClose}>
            Close
          </button>
        </div>
        <div className={classes.content}>
          {image && (
            <img src={image} alt={title} className={classes.articleImage} />
          )}
          <div className={classes.articleDescription}>{description}</div>
        </div>
      </div>
    </Modal>
  );
};
export default ArticleModalAdmin;
