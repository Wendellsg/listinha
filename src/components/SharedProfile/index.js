import { useState } from "react";
import "./SharedProfile.styles.css";
import placeholder from "../../assets/Portrait_Placeholder.png";
import { removeShare, GetUserProfile } from "../../api/MarketListApi";

function SharedProfile({ email, listid, setUpdate, listShared }) {
  const [ShowToolTip, setShowToolTip] = useState(false);
  const [image, setImage] = useState(null)

  async function handleHemoveShare() {
    if(listShared) return;
    let removePayload = {
      _id: listid,
      email: email,
    };
    await removeShare(removePayload);

    setUpdate(Date.now())
  }


  useState(()=>{
    GetUserProfile(email).then(res => setImage(res.image))
  },[])




  return (
    <div
      className="SharedProfileContainer"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
      onClick={() => setShowToolTip(!ShowToolTip)}
      onDoubleClick={handleHemoveShare}
    >
      <img
        src={image || placeholder}
        alt={''}
        className="SharedProfileImage"
      />
      {ShowToolTip && <div className="SharedProfileToolTip">{email}</div>}
    </div>
  );
}

export default SharedProfile;
