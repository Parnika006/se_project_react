//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import { useContext } from "react";

const ClothesSection = ({ handleCardClick, clothingItems, handleAddClick, isLoggedIn, handleCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__heading">Your Items </p>
        <button type="button" className="clothes-section__button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
        .filter((item) => currentUser && item.owner === currentUser?._id) //the '?' is giving it an initial value of null because otherwise the page is not rendering when reloaded because the value of currentUser is undefined.
        .map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              isLoggedIn={isLoggedIn}
              handleCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default ClothesSection;
