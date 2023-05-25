import "./NewsBlock.css";

const NewsBlock = ({ title, image, setModalOpen }) => {
  return (
    <div className="news-block">
      <div className="image-container">
        <img src={image} />
      </div>
      <div className="text-container">
        <h1>{title}</h1>
      </div>
      <div className="text-container">
        <h3 onClick={setModalOpen()}>Read more</h3>
      </div>
    </div>
  );
};
export default NewsBlock;
