import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const RegisterModal = ({
  closeActiveModal,
  isOpen,
  activeModal,
  handleLoginClick,
  handleRegistration,
  buttonText,
}) => {
  /*  const [data, setData] = useState({
      email: "",
      password: "",
      name: "",
      avatar: "",
    }); */

  /*  const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }; */

  const [email, setEmail] = useState({ text: "", isValid: false });
  function handleEmail(e) {
    setEmail({ isValid: e.target.validity.valid, text: e.target.value });
  }

  const [password, setPassword] = useState({ text: "", isValid: false });
  function handlePassword(e) {
    setPassword({ isValid: e.target.validity.valid, text: e.target.value });
  }

  const [name, setName] = useState({ text: "", isValid: false });
  function handleName(e) {
    setName({ isValid: e.target.validity.valid, text: e.target.value });
  }

  const [avatar, setAvatar] = useState({ text: "", isValid: false });
  function handleAvatar(e) {
    setAvatar({ isValid: e.target.validity.valid, text: e.target.value });
  }

  const buttonActive =
    email.isValid && password.isValid && name.isValid && avatar.isValid
      ? true
      : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({
      email: email.text,
      password: password.text,
      name: name.text,
      avatar: avatar.text,
    });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={buttonText}
      buttonText2="or Log in"
      closeActiveModal={closeActiveModal}
      isOpened={activeModal === "register"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onButtonClick={handleLoginClick}
      buttonActive={buttonActive}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          name="email"
          value={email.text}
          onChange={handleEmail}
          className="modal__input"
          id="email"
          placeholder="Email"
          minLength="1"
          maxLength="30"
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="text"
          name="password"
          value={password.text}
          onChange={handlePassword}
          className="modal__input"
          id="password"
          placeholder="Password"
          minLength="1"
          maxLength="10"
          required
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          value={name.text}
          onChange={handleName}
          className="modal__input"
          id="name"
          placeholder="Name"
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          name="avatar"
          value={avatar.text}
          onChange={handleAvatar}
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
