import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";
// import avatar from "../../assets/avatar.png";
import { useContext } from "react";


const SideBar = ({handleEditProfileClick, signOut}) => {

  const currentUser = useContext(CurrentUserContext)
 

  return (
    <div className="sidebar">
    <div className="sidebar__profile">
      <img className="sidebar__avatar" src={currentUser.avatar} alt="Default avatar" />
      <p className="sidebar__username"> {currentUser.name}</p>
    </div>
    <button className="sidebar__edit-profile-button" onClick={handleEditProfileClick}> Change profile data</button>
    <button className="sidebar__logout-button" onClick={signOut}> Logout</button>
    </div>
  );
};
export default SideBar;
