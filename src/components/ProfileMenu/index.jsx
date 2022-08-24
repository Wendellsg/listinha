import "./ProfileMenu.styles.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import userPlaceHolder from "../../assets/Portrait_Placeholder.png";
import { gapi } from "gapi-script";
import UserProfileModal from "../UserProfileModal";

const userData = JSON.parse(localStorage.getItem("@ListinhaUserData"));

export default function ProfileMenu() {
  const navigate = useNavigate();

  const [ showProfileModal, setShowProfileModal ] = useState(false);
  const [ showMenu, setShowMenu ] = useState(false);

  useEffect(() => {
    if (!gapi) return;
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapi]);

  function handleLogout() {
    setShowMenu(false);
    localStorage.removeItem("@ListinhaToken");
    localStorage.removeItem("@ListinhaUserData");
    navigate("/");
  }

  return (
    <>
      {showProfileModal && <UserProfileModal setShowProfileModal={setShowProfileModal} userData={userData}/>}
      <div className="ProFileMenuContainer">
        <div className="MenuButton" onClick={() => setShowMenu(!showMenu)}>
          <img
            style={{ borderRadius: "50%" }}
            src={userData.image || userPlaceHolder}
            alt={""}
          />
        </div>
        {showMenu && (
          <div className="MenuContainer swing-in-top-fwd">
            <p onClick={() => [setShowProfileModal(true), setShowMenu(false)]}>Perfil</p>
            <p>Assinatura</p>
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
              render={(renderProps) => (
                <p onClick={renderProps.onClick}>sair</p>
              )}
              onLogoutSuccess={handleLogout}
            ></GoogleLogout>
          </div>
        )}
      </div>
    </>
  );
}
