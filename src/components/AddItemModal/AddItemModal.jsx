import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  closeActiveModal,
  isOpen,
  activeModal,
  handleAddItem,
}) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem({ name, weather: weatherInput, imageUrl: link, resetInputs });
  };

  const [weatherInput, setWeatherInput] = useState("");
  const handleWeatherChange = (e) => {
    setWeatherInput(e.target.value);
  };

  const resetInputs = () => {
    setName("");
    setWeatherInput("");
    setUrl("");
  };

  useEffect(() => {
    if (isOpen) {
      resetInputs();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      closeActiveModal={closeActiveModal}
      isOpened={activeModal === "add-garment"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          minLength="1"
          maxLength="30"
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="link"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
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


