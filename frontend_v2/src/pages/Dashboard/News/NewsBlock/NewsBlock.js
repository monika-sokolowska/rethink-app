import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  newsBlock: {
    background: "#dae2e9",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    "& h1": {
      width: "100%",
      color: "rgb(17, 20, 48)",
      fontSize: "18px",
      marginBottom: 0,
    },
    "& h3": {
      color: "rgb(17, 20, 48)",
      marginLeft: "1rem",
      marginRight: "1rem",
      fontSize: "13px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginTop: "0.5rem",
      marginBottom: "1.5rem",
      cursor: "pointer",
    },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "15px",
    },
  },
  imageContainer: {
    width: "90%",
    height: "60%",
    backgroundColor: "black",
    marginTop: "5%",
    borderRadius: "15px",
  },
  textContainer: {
    width: "90%",
    height: "40%",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

const NewsBlock = ({ title, image, openModal }) => {
  const classes = useStyles();
  return (
    <div className={classes.newsBlock}>
      <div className={classes.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <div className={classes.textContainer}>
        <h1>{title}</h1>
      </div>
      <div className={classes.textContainer}>
        <h3 onClick={openModal}>Read more</h3>
      </div>
    </div>
  );
};
export default NewsBlock;
