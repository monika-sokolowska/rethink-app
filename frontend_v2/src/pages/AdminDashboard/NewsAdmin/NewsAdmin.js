import React, { useState } from "react";
import NewsBlockAdmin from "./NewsBlockAdmin/NewsBlockAdmin";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../../reducers/allArticlesSlice";
import ArticleModalAdmin from "./ArticleModalAdmin/ArticleModalAdmin";
import AddArticleModalAdmin from "./AddArticleModalAdmin/AddArticleModalAdmin";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  newsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: "1.5rem",
  },
  news: {
    display: "grid",
    gridTemplateColumns: "350px 350px 350px",
    gridTemplateRows: "400px 400px 400px 400px",
    columnGap: "50px",
    rowGap: "50px",
    alignItems: "start",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    overflow: "scroll",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#ffffff",
      "&:hover": {
        background: "#ffffff",
      },
    },
  },
  newsWrapper: {
    width: "320px",
    height: "400px",
  },
  newsHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    "& button": {
      background: "linear-gradient(135deg, #2d8659 0%, #4a9d6e 100%)",
      border: "none",
      borderRadius: "8px",
      boxShadow: "rgba(45, 134, 89, 0.2) 0 2px 4px 0",
      boxSizing: "border-box",
      color: "#ffffff",
      cursor: "pointer",
      fontFamily:
        '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: "14px",
      fontWeight: 400,
      padding: "15px 30px",
      textAlign: "center",
      transform: "translateY(0)",
      transition: "transform 150ms, box-shadow 150ms",
      touchAction: "manipulation",
      margin: "1rem",
      "&:hover": {
        boxShadow: "rgba(45, 134, 89, 0.3) 0 3px 9px 0",
        transform: "translateY(-2px)",
      },
    },
  },
  newsLabel: {
    margin: "1rem",
    color: "#2d8659",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
});

const NewsAdmin = () => {
  const classes = useStyles();
  const { articles } = useSelector((store) => store.articles);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [articleDescription, setArticleDescription] = useState("");
  const [articleTitle, setArticleTitle] = useState("");

  useEffect(() => {
    dispatch(getAllArticles());
  }, []);

  const openModal = (id_article) => {
    const article = articles.find((a) => a.id_article === id_article);
    setArticleDescription(article.text);
    setArticleTitle(article.title);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  return (
    <div className={classes.newsContainer}>
      <ArticleModalAdmin
        isOpen={showModal}
        handleClose={handleModalClose}
        title={articleTitle}
        description={articleDescription}
      />
      <AddArticleModalAdmin
        isOpen={showAddModal}
        handleClose={handleAddModalClose}
      />
      <div className={classes.newsHeader}>
        <div className={classes.newsLabel}>News</div>
        <button onClick={openAddModal}>Add</button>
      </div>
      <section className={classes.news}>
        {articles.map((item) => {
          const { id_article, title, image } = item;
          return (
            <div key={id_article} className={classes.newsWrapper}>
              <NewsBlockAdmin
                title={title}
                image={image}
                openModal={() => openModal(id_article)}
              />
              ;
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default NewsAdmin;
