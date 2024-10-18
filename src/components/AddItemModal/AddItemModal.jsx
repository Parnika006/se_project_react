import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  closeActiveModal,
  isOpen,
  activeModal,
  handleAddItem,
  buttonText,
}) => {
  const [name, setName] = useState({ text: "", isValid: false });
  const handleItemName = (e) => {
    setName({ isValid: e.target.validity.valid, text: e.target.value });
  };

  const [link, setUrl] = useState({ text: "", isValid: false });
  const handleItemUrl = (e) => {
    setUrl({ isValid: e.target.validity.valid, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem({
      name: name.text,
      weather: weatherInput.text,
      imageUrl: link.text,
    });
  };

  const [weatherInput, setWeatherInput] = useState({
    text: "",
    isValid: false,
  });
  const handleWeatherChange = (e) => {
    setWeatherInput({ isValid: e.target.validity.valid, text: e.target.value });
  };

  const buttonActive =
    name.isValid && link.isValid && weatherInput.isValid ? true : false;

  const resetInputs = () => {
    setName({ text: "", isValid: false });
    setWeatherInput({ text: "", isValid: false });
    setUrl({ text: "", isValid: false });
  };

  useEffect(() => {
    if (isOpen) {
      resetInputs();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText={buttonText}
      closeActiveModal={closeActiveModal}
      isOpened={activeModal === "add-garment"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonActive={buttonActive}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name.text}
          onChange={handleItemName}
          minLength="1"
          maxLength="30"
          required
        />
      </label>
      <label className="modal__label">
        Image{" "}
        <input
          type="link"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={link.text}
          onChange={handleItemUrl}
          minLength="1"
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend"> Select the weather type: </legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="selector"
            type="radio"
            className="modal__radio-input"
            id="hot"
            onChange={handleWeatherChange}
            value="hot"
            required
          />{" "}
          HOT
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="selector"
            type="radio"
            className="modal__radio-input"
            id="warm"
            onChange={handleWeatherChange}
            value="warm"
            required
          />{" "}
          WARM
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="selector"
            type="radio"
            className="modal__radio-input"
            id="cold"
            onChange={handleWeatherChange}
            value="cold"
            required
          />{" "}
          COLD
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
