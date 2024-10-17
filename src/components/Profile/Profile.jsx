import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ handleCardClick, clothingItems, handleAddClick, handleEditProfileClick,  signOut, isLoggedIn, handleCardLike}) => {
  
  return (
   
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileClick={handleEditProfileClick} signOut={signOut}  />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          isLoggedIn={isLoggedIn}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
};
export default Profile;
