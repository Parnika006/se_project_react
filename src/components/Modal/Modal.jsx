import { useEffect } from "react";

const Modal = ({ name, onClose, isOpen, children }) => {
  // here is `useEffect` for the `Escape` listener
  useEffect(() => {
    // we should define the handler inside `useEffect`, so that it wouldn’t lose the reference to be able to remove it
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // don’t forget to remove the listener in the `clean-up` function
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // here is the overlay handler
  const handleOverlay = () => {
    /* if (e.target === e.currentTarget) {
      onClose();
    } */

    onClose();
  };

  // then we add the main wrapper with class `modal`
  return (
    <div
      className={`modal modal_type_${name} ${isOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      {/* the container for the contents */}
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        {/* here will be anything you add as `children`*/}
        {children}
        {/* add the close button */}
        <button className="modal__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
};

export default Modal;
