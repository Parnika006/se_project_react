import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  buttonText2,
  title,
  closeActiveModal,
  isOpen,
  onSubmit,
  onButtonClick,
  buttonActive
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
          <button type="submit" className={`modal__submit ${buttonActive ? "modal__submit-active" : ""}`}>
            {buttonText}
          </button>
          <button type="button" onClick={onButtonClick} className="modal__button-option">
            {buttonText2}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

// <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
