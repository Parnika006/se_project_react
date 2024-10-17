import ModalWithForm from "../ModalWithForm/ModalWithForm"
import { useState } from "react";

const RegisterModal = ({
    closeActiveModal,
    isOpen,
    activeModal,
  handleLoginClick,
  handleRegistration,
 
  }) => {
    const [data, setData] = useState({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleRegistration(data);
      closeActiveModal();
      
    };


    return (
        
        <ModalWithForm
          title="Sign Up"   buttonText="Next"
      
         buttonText2="or Log in"
          closeActiveModal={closeActiveModal}
          isOpened={activeModal === "login"}
          isOpen={isOpen}
          onSubmit={handleSubmit}
          onButtonClick={handleLoginClick}
        >
         <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
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
          value={data.password}
          onChange={handleChange}
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
          value={data.name}
          onChange={handleChange}
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
          value={data.avatar}
          onChange={handleChange}
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
        />
      </label>

   {/*    <div className="modal__register-button">
     <button type="submit" className="modal__register-submit-button">Next</button> 
      <button type="button" className="modal__register-login-button"> or Log in</button>
      </div>
 */}
        </ModalWithForm>
    )
}

export default RegisterModal;
