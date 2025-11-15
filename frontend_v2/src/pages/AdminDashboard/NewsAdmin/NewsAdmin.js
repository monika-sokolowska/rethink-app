import "./NewsAdmin.css";
import React, { useState } from "react";
import NewsBlockAdmin from "./NewsBlockAdmin/NewsBlockAdmin";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../../reducers/allArticlesSlice";
import ArticleModalAdmin from "./ArticleModalAdmin/ArticleModalAdmin";
import AddArticleModalAdmin from "./AddArticleModalAdmin/AddArticleModalAdmin";

const NewsAdmin = () => {
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
    <div className="news-container">
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
      <div className="news-header">
        <div className="news-label">News</div>
        <button onClick={openAddModal}>Add</button>
      </div>
      <section className="news">
        {articles.map((item) => {
          const { id_article, title, image } = item;
          return (
            <div key={id_article} className="news-wrapper">
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
