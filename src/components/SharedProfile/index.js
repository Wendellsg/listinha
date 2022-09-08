import { useState } from "react";
import "./SharedProfile.styles.css";
import placeholder from "../../assets/Portrait_Placeholder.png";
import { removeShare, GetUserProfile } from "../../api/MarketListApi";

function SharedProfile({ email, listid, setUpdate, listShared, ownerId }) {
  const [ShowToolTip, setShowToolTip] = useState(false);
  const [image, setImage] = useState(null)
  const [ownerData, setOwnerData] = useState(null)

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
    if(ownerId) return  GetUserProfile({id: ownerId}).then(res => setOwnerData(res))
    GetUserProfile({email: email}).then(res => setImage(res.image))
  },[])

  if(ownerId){
    return (
      <div
        className="SharedProfileContainer"
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
        onClick={() => setShowToolTip(!ShowToolTip)}
        onDoubleClick={handleHemoveShare}
      >
        <img
          src={ownerData?.image || placeholder}
          alt={''}
          className="SharedProfileImage OwnerProfile"
        />
        {ShowToolTip && <div className="SharedProfileToolTip">{ownerData?.email}</div>}
      </div>
    );
  }




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
