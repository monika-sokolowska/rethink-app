import { AiOutlineDelete } from "react-icons/ai";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  newsBlock: {
    background: "#ffffff",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)",
    transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
    cursor: "pointer",
    position: "relative",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
  imageContainer: {
    width: "100%",
    height: "50%",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#f2f2f7",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    justifyContent: "space-between",
  },
  title: {
    color: "#000000",
    fontSize: "17px",
    fontWeight: 600,
    margin: 0,
    marginBottom: "8px",
    lineHeight: "1.3",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  description: {
    color: "#8e8e93",
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: "1.4",
    margin: 0,
    marginBottom: "12px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1,
  },
  readMoreButton: {
    color: "#2d8659",
    fontSize: "15px",
    fontWeight: 500,
    margin: 0,
    padding: "8px 0",
    cursor: "pointer",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    transition: "opacity 0.2s",
    alignSelf: "flex-start",
    "&:active": {
      opacity: 0.6,
    },
  },
  deleteIcon: {
    position: "absolute",
    top: "12px",
    right: "12px",
    color: "#ffffff",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgba(220, 53, 69, 0.9)",
      transform: "scale(1.1)",
    },
  },
  "@media (max-width: 768px)": {
    newsBlock: {
      borderRadius: "12px",
    },
    contentContainer: {
      padding: "14px",
    },
    title: {
      fontSize: "18px",
      marginBottom: "10px",
    },
    description: {
      fontSize: "16px",
      marginBottom: "14px",
      WebkitLineClamp: 2,
    },
    readMoreButton: {
      fontSize: "16px",
      padding: "10px 0",
    },
  },
  "@media (max-width: 480px)": {
    newsBlock: {
      borderRadius: "12px",
    },
    contentContainer: {
      padding: "12px",
    },
    title: {
      fontSize: "17px",
      marginBottom: "8px",
    },
    description: {
      fontSize: "15px",
      marginBottom: "12px",
      WebkitLineClamp: 2,
    },
    readMoreButton: {
      fontSize: "15px",
      padding: "8px 0",
    },
  },
});

const NewsBlockAdmin = ({ title, image, description, openModal, handleDelete }) => {
  const classes = useStyles();
  
  // Get first 150 characters of description
  const descriptionFragment = description
    ? description.length > 150
      ? description.substring(0, 150).trim() + "..."
      : description
    : "";

  return (
    <div className={classes.newsBlock} onClick={openModal}>
      <AiOutlineDelete
        size={24}
        className={classes.deleteIcon}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      />
      <div className={classes.imageContainer}>
        <img src={image} alt={title} className={classes.image} />
      </div>
      <div className={classes.contentContainer}>
        <h2 className={classes.title}>{title}</h2>
        {descriptionFragment && (
          <p className={classes.description}>{descriptionFragment}</p>
        )}
        <p className={classes.readMoreButton} onClick={(e) => {
          e.stopPropagation();
          openModal();
        }}>
          Read more
        </p>
      </div>
    </div>
  );
};
export default NewsBlockAdmin;
