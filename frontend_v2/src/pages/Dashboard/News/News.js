import React, { useState, useEffect, useRef } from "react";
import NewsBlock from "./NewsBlock/NewsBlock";
import { useSelector, useDispatch } from "react-redux";
import { getAllArticles } from "../../../reducers/allArticlesSlice";
import ArticleModal from "./ArticleModal/ArticleModal";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  news: {
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    backgroundColor: "#f5f5f7",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    "@media (max-width: 768px)": {
      padding: "16px",
    },
    "@media (max-width: 480px)": {
      padding: "12px",
    },
  },
  carouselContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: "12px",
  },
  carouselTrack: {
    display: "flex",
    transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
    height: "100%",
    willChange: "transform",
  },
  carouselSlide: {
    flex: "0 0 100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "24px",
    padding: "0 12px",
    "@media (max-width: 768px)": {
      flex: "0 0 100%",
      gap: "16px",
      padding: "0 8px",
    },
  },
  newsWrapper: {
    maxWidth: "380px",
    maxHeight: "500px",
    width: "100%",
    height: "100%",
    display: "flex",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
      maxHeight: "450px",
    },
    "@media (max-width: 480px)": {
      maxHeight: "400px",
    },
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "none",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 10,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    transition: "all 0.2s ease",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    fontSize: "20px",
    color: "#2d8659",
    "&:hover": {
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      transform: "translateY(-50%) scale(1.1)",
    },
    "&:active": {
      transform: "translateY(-50%) scale(0.95)",
    },
    "&:disabled": {
      opacity: 0.3,
      cursor: "not-allowed",
      "&:hover": {
        transform: "translateY(-50%)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      },
    },
    "@media (max-width: 768px)": {
      width: "40px",
      height: "40px",
      fontSize: "18px",
    },
  },
  prevButton: {
    left: "12px",
    "@media (max-width: 768px)": {
      left: "8px",
    },
  },
  nextButton: {
    right: "12px",
    "@media (max-width: 768px)": {
      right: "8px",
    },
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "20px",
    "@media (max-width: 768px)": {
      marginTop: "16px",
      gap: "6px",
    },
  },
  paginationDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "rgba(45, 134, 89, 0.3)",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.2s ease",
    "&.active": {
      backgroundColor: "#2d8659",
      width: "24px",
      borderRadius: "4px",
    },
    "@media (max-width: 768px)": {
      width: "6px",
      height: "6px",
      "&.active": {
        width: "20px",
      },
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
  const [articleImage, setArticleImage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setItemsPerPage(mobile ? 1 : 3);
      setCurrentSlide(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(articles.length / itemsPerPage);

  const goToSlide = (slideIndex) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex);
    }
  };

  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(currentSlide - 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

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

  return (
    <section className={classes.news}>
      <ArticleModal
        isOpen={showModal}
        handleClose={handleModalClose}
        title={articleTitle}
        description={articleDescription}
        image={articleImage}
      />
      <div
        className={classes.carouselContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <div
          className={classes.carouselTrack}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}>
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            const start = slideIndex * itemsPerPage;
            const end = start + itemsPerPage;
            const slideItems = articles.slice(start, end);

            return (
              <div key={slideIndex} className={classes.carouselSlide}>
                {slideItems.map((item) => {
                  const { id_article, title, image, text } = item;
                  return (
                    <div key={id_article} className={classes.newsWrapper}>
                      <NewsBlock
                        title={title}
                        image={image}
                        description={text}
                        openModal={() => openModal(id_article)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {articles.length > itemsPerPage && (
          <>
            <button
              className={`${classes.navButton} ${classes.prevButton}`}
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous slide">
              ‹
            </button>
            <button
              className={`${classes.navButton} ${classes.nextButton}`}
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              aria-label="Next slide">
              ›
            </button>
          </>
        )}

        {totalSlides > 1 && (
          <div className={classes.pagination}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`${classes.paginationDot} ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default News;
