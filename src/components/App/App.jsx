import { useEffect, useState, useContext } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
//import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
//import "../../index.css";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";

import api from "../../utils/api";
import DeleteCardModal from "../DeleteCardModal/DeleteCardModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {register,login} from "../../utils/auth";
import {setToken, getToken, removeToken} from "../../utils/token";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// import { editProfile } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
const [currentUser, setCurrentUser] =useState(null);


console.log(clothingItems)

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeletClick = () => {
    setActiveModal("delete-item");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  }

  const handleSignUpClick = () => {
    setActiveModal("register");
  }

  const handleEditProfileClick = () => {
    setActiveModal("change-profile-data");
  }

  const navigate = useNavigate();

  const handleRegistration = ({
    email, password, name, avatar
  }) => {
   
      register(email, password, name, avatar)
       .then(() => {
        handleLogin({email, password})
        })
        .catch(console.error);
  };


  useEffect(() => {
    const jwt = getToken();
      
    if (!jwt) {
      return;
    }


  api
    .getUserInfo(jwt)
    .then((data) => {
      // If the response is successful, log the user in, save their 
      // data to state, and navigate them to /profile.
      setIsLoggedIn(true);
      setCurrentUser(data);
      navigate("/profile");
    })
    .catch(console.error);
}, [navigate]); 






  const handleLogin = ({ email, password }) => {
 
    // If username or password empty, return without sending a request.
    if (!email || !password) {
      return;
    }  
    login(email, password)
    
    .then((data) => {
     
      if (data.token) {
        setToken(data.token);
        setUserData(data.user);
        setIsLoggedIn(true);
       
        setCurrentUser(data.user); // Save the user data
        navigate("/profile"); // Redirect after setting state
      }
    })
    .catch((error) => {
      console.error("Login failed:", error);
    });
};

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };


    

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") {
      setCurrentTemperatureUnit("F");
    }
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleAddItem = ({ name, weather, imageUrl }) => {
    // console.log(name, weather, imageUrl);
    const token = getToken();
    api
      .addItems(name, weather, imageUrl, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);

        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteItem = (item) => {
    const token = getToken();
    api
      .removeItems(item._id, token)
      .then(() => {
        setClothingItems(clothingItems.filter((card) => card._id !== item._id));

        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

 

  const handleEditProfile =(name, avatar) =>
    {
      
      const token = getToken();
      api.editProfile(name, avatar, token)
      .then(() => {
       setCurrentUser({name, avatar});
        closeActiveModal();
      })

      .catch((err) => console.error(err));
    }; 

    const signOut =() => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    }

    const handleCardLike = (id, isLiked ) => {
      console.log(123);
      console.log('Id in App.jsx',id)
      const token = getToken();
      // Check if this card is not currently liked
      !isLiked
        ? // if so, send a request to add the user's id to the card's likes array
          api
            // the first argument is the card's id
            .addCardLike(id, token)
            .then((updatedCard) => {
              console.log('>UPDATED CARD', updatedCard)
              setClothingItems((cards) =>
                cards.map((item) => (item._id === id ? updatedCard : item))
              );
            })
            .catch((err) => console.log(err))
        : // if not, send a request to remove the user's id from the card's likes array
          api
            // the first argument is the card's id
            .removeCardLike(id, token) 
            .then((updatedCard) => {
              setClothingItems((cards) =>
                cards.map((item) => (item._id === id ? updatedCard : item))
              );
            })
            .catch((err) => console.log(err));
    };

  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} handleLoginClick={handleLoginClick} handleSignUpClick={handleSignUpClick} isLoggedIn={isLoggedIn}/>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  
            
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleEditProfileClick={handleEditProfileClick}
                  signOut={signOut}
                  isLoggedIn={isLoggedIn}
                  handleCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
          <Route
  path="*"
  element={
    isLoggedIn ? (
      <Navigate to="/profile" replace />
    ) : (
      <Navigate to="/" replace />
    )
  }
/>
          </Routes>

          <Footer />
        </div>

        {activeModal === "add-garment" && (
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            handleAddItem={handleAddItem}
          />
        )}

        {activeModal === "preview" && (
          <ItemModal
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            handleDeleteClick={handleDeletClick}
            handleDeleteItem={handleDeleteItem}
            isLoggedIn={isLoggedIn}
          />
        )}

        {activeModal === "delete-item" && (
          <DeleteCardModal
            isOpen={activeModal === "delete-item"}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            handleDeleteItem={handleDeleteItem}
          />
        )}
          {activeModal === "login" && (
          <LoginModal
            isOpen={activeModal === "login"}
            closeActiveModal={closeActiveModal}
            handleSignUpClick={handleSignUpClick}
            handleLogin={handleLogin}
          />
        )}
         {activeModal === "register" && (
          <RegisterModal
            isOpen={activeModal === "register"}
            closeActiveModal={closeActiveModal}
            handleLoginClick={handleLoginClick}
            handleRegistration={handleRegistration}
          />
        )}
         {activeModal === "change-profile-data" && (
          <EditProfileModal
            isOpen={activeModal === "change-profile-data"}
            closeActiveModal={closeActiveModal}
           handleEditProfile={handleEditProfile}
          />
        )}

      </CurrentTemperatureUnitContext.Provider>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
