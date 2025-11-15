import "./ArticleModalAdmin.css";
import Modal from "react-overlays/Modal";

const ArticleModalAdmin = ({ isOpen, handleClose, title, description }) => {
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  return (
    <Modal
      className="article-modal"
      show={isOpen}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}>
      <div className="article-modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <div>
            <span className="close-button" onClick={handleClose}>
              x
            </span>
          </div>
        </div>
        <div className="article-description">{description}</div>
      </div>
    </Modal>
  );
};
export default ArticleModalAdmin;
