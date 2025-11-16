import React, { useState } from "react";
import NewsBlock from "./NewsBlock/NewsBlock";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../../reducers/allArticlesSlice";
import ArticleModal from "./ArticleModal/ArticleModal";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
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
    backgroundColor: "white",
    padding: "2rem",
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
      padding: "1rem",
      columnGap: "20px",
      rowGap: "30px",
    },
  },
  newsWrapper: {
    width: "100%",
    maxWidth: "350px",
    height: "400px",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
  },
});

const News = () => {
  const classes = useStyles();
  const { articles } = useSelector((store) => store.articles);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
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

  return (
    <section className={classes.news}>
      <ArticleModal
        isOpen={showModal}
        handleClose={handleModalClose}
        title={articleTitle}
        description={articleDescription}
      />
      {articles.map((item) => {
        const { id_article, title, image } = item;
        return (
          <div key={id_article} className={classes.newsWrapper}>
            <NewsBlock
              title={title}
              image={image}
              openModal={() => openModal(id_article)}
            />
            ;
          </div>
        );
      })}
    </section>
  );
};
export default News;
