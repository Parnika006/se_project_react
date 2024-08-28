import "./ItemModal.css";

function ItemModal({ isOpen, card, closeActiveModal, handleDeleteClick }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt="preview image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button
          className="modal__delete-click-button"
          onClick={() => {
            handleDeleteClick(card);
          }}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
