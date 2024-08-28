//import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ handleCardClick, clothingItems, handleAddClick }) => {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__heading">Your Items </p>
        <button type="button" className="clothes-section__button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default ClothesSection;
