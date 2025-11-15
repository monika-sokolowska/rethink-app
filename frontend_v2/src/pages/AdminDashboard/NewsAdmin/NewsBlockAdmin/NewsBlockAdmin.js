import "./NewsBlockAdmin.css";

const NewsBlockAdmin = ({ title, image, openModal }) => {
  return (
    <div className="news-block">
      <div className="image-container">
        <img src={image} />
      </div>
      <div className="text-container">
        <h1>{title}</h1>
      </div>
      <div className="text-container">
        <h3 onClick={openModal}>Read more</h3>
      </div>
    </div>
  );
};
export default NewsBlockAdmin;
