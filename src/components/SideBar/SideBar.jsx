import "./SideBar.css";
import avatar from "../../assets/avatar.png";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username"> Terrence Tegene</p>
    </div>
  );
};
export default SideBar;
