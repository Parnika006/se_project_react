import "./Header.css";
import Logo from "../../assets/Logo.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";




function Header({ handleAddClick, weatherData, handleLoginClick, handleSignUpClick, isLoggedIn}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);




if(!isLoggedIn){

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {" "}
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
     
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <button type="button" className="header__signUp-button" onClick={handleSignUpClick}>Sign Up</button>
          <button type="button" className="header__login-button" onClick={handleLoginClick}>Login</button>
         
        </div>
      </Link>
    </header>
  );
}

 else { return (
<header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {" "}
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
     
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>
      
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
        <p className="header__username"> {currentUser.name}</p>
          <img className="header__avatar" src={currentUser.avatar} alt="user avatar" />
        </div>
      </Link>
    </header>
  )
}
}

export default Header;

// <div className={`modal ${isOpen ? "modal_opened" : ""}`}>