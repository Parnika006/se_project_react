import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"
import { useState } from "react";
import { useEffect } from "react";

const EditProfileModal = ({
    closeActiveModal,
    isOpen,
    activeModal,
    handleEditProfile

  }) => {

    const currentUser = useContext(CurrentUserContext)
    
   const [data, setData] = useState({
      name: "",
      avatar: "",
    });

   

    useEffect(()=> {
      setData(currentUser);
    },[currentUser])



    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };



    const handleSubmit = (e) => {
      e.preventDefault();
      handleEditProfile(data.name, data.avatar);
      closeActiveModal();
    };

   

    return (
        
        <ModalWithForm
          title="Change profile data"
          buttonText="Save Changes"
          closeActiveModal={closeActiveModal}
          isOpened={activeModal === "change-profile-data"}
          isOpen={isOpen}
          onSubmit={handleSubmit}
        >
         <label htmlFor="Name" className="modal__label">
        Name *{" "}
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="modal__input"
          id="name"
          minLength="1"
          maxLength="30"
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar *{" "}
        <input
          type="url"
          name="avatar"
          value={data.avatar}
          onChange={handleChange}
          className="modal__input"
          id="avatar"
          minLength="1"
          required
        />
      </label>
        </ModalWithForm>
        
    )
}

export default EditProfileModal;