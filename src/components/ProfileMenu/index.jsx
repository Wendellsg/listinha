import "./ProfileMenu.styles.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import UserProfileModal from "../UserProfileModal";
import { useUserData } from "../../hooks/useUserData";
import { useAuth } from "../../hooks";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const { logOut } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!gapi) return;
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "profile email",
      });
    };
    gapi.load("client:auth2", initClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapi]);

  function handleLogout() {
    setShowMenu(false);
    logOut();
    navigate("/");
  }

  return (
    <>
      {userData && showProfileModal && (
        <UserProfileModal
          setShowProfileModal={setShowProfileModal}
          userData={userData}
        />
      )}
      <div className="ProFileMenuContainer">
        <div className="MenuButton" onClick={() => setShowMenu(!showMenu)}>
          <img
            style={{ borderRadius: "50%" }}
            src={
              userData?.image ||
              `https://ui-avatars.com/api/?background=random&name=${userData?.name}`
            }
            alt={""}
          />
        </div>
        {showMenu && (
          <div className="MenuContainer swing-in-top-fwd">
            <p onClick={() => [setShowProfileModal(true), setShowMenu(false)]}>
              Perfil
            </p>
            {/* <p>Assinatura</p> */}
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
              render={(renderProps) => (
                <p onClick={renderProps.onClick}>Sair</p>
              )}
              onLogoutSuccess={handleLogout}
            ></GoogleLogout>
          </div>
        )}
      </div>
    </>
  );
}
