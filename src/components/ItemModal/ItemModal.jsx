import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
//import Modal from "../Modal/Modal";
import { useContext } from "react";


function ItemModal({ card, closeActiveModal, handleDeleteClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = (card.owner === currentUser?._id);

  return (
    <div className="modal modal_opened">
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
          className={`modal__delete-click-button ${isOwn && isLoggedIn ? 'item__delete-button_visible' : 'item__delete-button_hidden'}`}
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
