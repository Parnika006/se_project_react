import ModalWithForm from "../ModalWithForm/ModalWithForm"
import { useState } from "react";

const LoginModal = ({
    closeActiveModal,
    isOpen,
    activeModal,
  handleLogin,
  handleSignUpClick
  }) => {
    //const [buttonActive, setButtonActive]= useState(false);
    
    const [data, setData] = useState({
      email: "",
      password: "",
     
    });

 /*    const [email, setEmail]= useState({text: "", isValid: false})
    function handleEmail(e){
      setEmail({isValid:e.target.validity.valid, text: e.target.value})
    }
 */
    // const isFormValid = email.isValid && password.isValid;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(data);
      closeActiveModal();
    };


    return (
        
        <ModalWithForm
          title="Login"
          buttonText="Login"
          buttonText2="or Register"
          closeActiveModal={closeActiveModal}
          isOpened={activeModal === "login"}
          isOpen={isOpen}
          onSubmit={handleSubmit}
          onButtonClick={handleSignUpClick}
          
        >
         <label htmlFor="email" className="modal__label">
        Email{" "}
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
        Password{" "}
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
     


        </ModalWithForm>
        
    )
}

export default LoginModal;