import "./ProfileMenu.styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const userData = JSON.parse(localStorage.getItem("@ListinhaUserData"));

export default function ProfileMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("@ListinhaToken");
    navigate("/");
  }

  return (
    <div className="ProFileMenuContainer">
      <div className="MenuButton" onClick={()=> setShowMenu(!showMenu)}>
        <img src={userData.image} alt={userData.name} />
      </div>
      {showMenu && (
        <div className="MenuContainer swing-in-top-fwd">
          <p>Perfil</p>
          <p>Assinatura</p>
          <p onClick={handleLogout}>Sair</p>
        </div>
      )}
    </div>
  );
}
