import "./News.css";
import React, { useState } from "react";
import NewsBlock from "./NewsBlock/NewsBlock";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../../reducers/allArticlesSlice";
import ArticleModal from "./ArticleModal/ArticleModal";

const News = () => {
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
    <section className="news">
      <ArticleModal
        isOpen={showModal}
        handleClose={handleModalClose}
        title={articleTitle}
        description={articleDescription}
      />
      {articles.map((item) => {
        const { id_article, title, image } = item;
        return (
          <div key={id_article} className="news-wrapper">
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
