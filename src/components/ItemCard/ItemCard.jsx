import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Like from "../../assets/Like.svg"
import likeButtonActive from "../../assets/likeButtonActive.svg"
import { useContext } from "react";

function ItemCard({ item, onCardClick, handleCardLike, isLoggedIn }) {

  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some(id => id === currentUser?._id);
 
  const handleCardClick = () => {
    onCardClick(item);
  };

  
  const handleLike = (e) => {
    e.preventDefault();
    handleCardLike(item._id, isLiked);
  }


  return (
    <li className="card">
      <div className="card__content">
      <h2 className="card__name">{item.name}</h2>
      {(isLoggedIn) && (
  <img 
    className="card__like-button"
    src={isLiked? likeButtonActive: Like} 
    onClick={handleLike} 
    alt="Like button"
  />
)}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}


export default ItemCard;
