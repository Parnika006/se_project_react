import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
const LoginModal = ({
  closeActiveModal,
  isOpen,
  activeModal,
  handleLogin,
  handleSignUpClick,
  buttonText,
}) => {
  /*  const [data, setData] = useState({
      email: "",
      password: "",
     
    }); */

  const [email, setEmail] = useState({ text: "", isValid: false });
  function handleEmail(e) {
    setEmail({ isValid: e.target.validity.valid, text: e.target.value });
  }
  const [password, setPassword] = useState({ text: "", isValid: false });
  function handlePassword(e) {
    setPassword({ isValid: e.target.validity.valid, text: e.target.value });
  }

  const buttonActive = email.isValid && password.isValid ? true : false;

  /*  const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email: email.text, password: password.text });
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText={buttonText}
      buttonText2="or Register"
      closeActiveModal={closeActiveModal}
      isOpened={activeModal === "login"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onButtonClick={handleSignUpClick}
      buttonActive={buttonActive}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          value={email.text} // // the value is not just email because the email is an object with two properties : text and validiity
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
        Password{" "}
        <input
          type="text"
          name="password"
          value={password.text} // the value is not just password because the password is an object with two properties : text and validiity
          onChange={handlePassword}
          className="modal__input"
          id="password"
          placeholder="Password"
          minLength="1"
          maxLength="10"
          required
        />
      </label>
    </ModalWithForm>
  );
};
export default LoginModal;
