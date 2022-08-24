import "./UserProfileModal.styles.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function UserProfileModal({ setShowProfileModal, userData }) {
  return (
    <div className="ProfileModalBackground ">
      <div className="ProfileModalCard">
        <div className="ProfileModalHeader">
          <AiOutlineCloseCircle
            size={25}
            onClick={() => setShowProfileModal(false)}
            color={'#AB3030'}
            className='ProfileMenuCloseButton'
          />
        </div>
        <div className="ProfileModalBody">
          <img src={userData.image} alt=""  className="ProfileModalImage"/>
          <h3 className="ProfileModalName">{userData.name}</h3>
          <h3 className="ProfileModalEmail">{userData.email}</h3>
        </div>
      </div>
    </div>
  );
}
