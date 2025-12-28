import React, { useState, useEffect } from "react";
import NewsBlockAdmin from "./NewsBlockAdmin/NewsBlockAdmin";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllArticles,
  deleteArticle,
} from "../../../reducers/allArticlesSlice";
import ArticleModalAdmin from "./ArticleModalAdmin/ArticleModalAdmin";
import ArticleBottomSheet from "./ArticleModalAdmin/ArticleBottomSheet";
import AddArticleModalAdmin from "./AddArticleModalAdmin/AddArticleModalAdmin";
import AddArticleBottomSheet from "./AddArticleModalAdmin/AddArticleBottomSheet";
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
    maxWidth: "100%",
    height: "100%",
    justifyContent: "space-between",
    overflow: "auto",
    overflowX: "hidden",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0",
      height: "0",
    },
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      columnGap: "30px",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "300px",
      padding: "1rem",
      columnGap: "10px",
      rowGap: "15px",
    },
    "@media (max-width: 480px)": {
      columnGap: "8px",
      rowGap: "12px",
    },
  },
  newsWrapper: {
    width: "100%",
    maxWidth: "350px",
    height: "400px",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
      height: "300px",
    },
    "@media (max-width: 480px)": {
      height: "250px",
    },
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
  const [articleImage, setArticleImage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (id_article) => {
    const article = articles.find((a) => a.id_article === id_article);
    setArticleDescription(article.text);
    setArticleTitle(article.title);
    setArticleImage(article.image);
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

  const handleDeleteArticle = (id) => {
    dispatch(deleteArticle(id));
  };

  return (
    <div className={classes.newsContainer}>
      {isMobile ? (
        <ArticleBottomSheet
          isOpen={showModal}
          handleClose={handleModalClose}
          title={articleTitle}
          description={articleDescription}
          image={articleImage}
        />
      ) : (
        <ArticleModalAdmin
          isOpen={showModal}
          handleClose={handleModalClose}
          title={articleTitle}
          description={articleDescription}
          image={articleImage}
        />
      )}
      {isMobile ? (
        <AddArticleBottomSheet
          isOpen={showAddModal}
          handleClose={handleAddModalClose}
        />
      ) : (
        <AddArticleModalAdmin
          isOpen={showAddModal}
          handleClose={handleAddModalClose}
        />
      )}
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
                handleDelete={() => handleDeleteArticle(id_article)}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default NewsAdmin;
