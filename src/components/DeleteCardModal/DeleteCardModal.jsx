function DeleteCardModal({ isOpen, card, closeActiveModal, handleDeleteItem }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_type_delete">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        ></button>
        <div className="modal__delete-headings">
          <p className="modal__delete-heading">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__delete-heading">This action is irreversible.</p>
        </div>
        <div className="modal__delete-buttons">
          <button
            type="submit"
            className="modal__delete-item-button"
            onClick={() => {
              handleDeleteItem(card);
            }}
          >
            Yes, delete item
          </button>

          <button
            className="modal__delete-cancel-button"
            onClick={() => {
              closeActiveModal();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCardModal;
