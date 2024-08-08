import "./Header.css";
import Logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="logo" />
      <p className="header__date-and-location">
        {" "}
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username"> Terrence Tegene</p>
        <img className="header__avatar" src={avatar} alt="user avatar" />
      </div>
    </header>
  );
}

export default Header;
