import { useEffect } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1050,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease-out",
    "&.open": {
      opacity: 1,
    },
  },
  bottomSheet: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "100%",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
    transform: "translateY(100%)",
    transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    zIndex: 1051,
    "&.open": {
      transform: "translateY(0)",
    },
  },
  handle: {
    width: "36px",
    height: "5px",
    backgroundColor: "#d1d1d6",
    borderRadius: "3px",
    margin: "12px auto 8px",
    flexShrink: 0,
  },
  header: {
    padding: "16px 20px 12px",
    borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#000000",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    flex: 1,
    marginRight: "12px",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "17px",
    fontWeight: 400,
    color: "#2d8659",
    cursor: "pointer",
    padding: "4px 8px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    "&:active": {
      opacity: 0.6,
    },
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    paddingBottom: "24px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  articleImage: {
    width: "100%",
    maxHeight: "250px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "16px",
  },
  articleDescription: {
    color: "#2d8659",
    fontSize: "17px",
    fontWeight: 400,
    lineHeight: "1.6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  "@media (max-width: 480px)": {
    bottomSheet: {
      maxHeight: "95vh",
    },
    title: {
      fontSize: "18px",
    },
    articleImage: {
      maxHeight: "200px",
    },
    articleDescription: {
      fontSize: "16px",
    },
  },
});

const ArticleBottomSheet = ({ isOpen, handleClose, title, description, image }) => {
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${classes.overlay} ${isOpen ? "open" : ""}`}
      onClick={handleOverlayClick}>
      <div className={`${classes.bottomSheet} ${isOpen ? "open" : ""}`}>
        <div className={classes.handle} />
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
    </div>
  );
};

export default ArticleBottomSheet;

