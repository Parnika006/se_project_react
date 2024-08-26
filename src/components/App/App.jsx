import { useEffect, useState } from "react";
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
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItem = (values) => {
    console.log(values);
  };

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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/se_project_react"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/se_project_react/profile"
              element={<Profile handleCardClick={handleCardClick} />}
            />
          </Routes>

          {/* <Main weatherData={weatherData} handleCardClick={handleCardClick} /> */}
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
            activeModal={activeModal === "preview"}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
