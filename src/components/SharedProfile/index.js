import { useState } from "react";
import "./SharedProfile.styles.css";
import { removeShare, GetUserProfile } from "../../api/MarketListApi";
import { useLists } from "../../hooks";

function SharedProfile({ email, listid, listShared, ownerId }) {
  const [ShowToolTip, setShowToolTip] = useState(false);
  const [image, setImage] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const { fectchUserLists } = useLists();

  async function handleHemoveShare() {
    if (listShared) return;
    let removePayload = {
      _id: listid,
      email: email,
    };
    await removeShare(removePayload);
    fectchUserLists();
  }

  useState(() => {
    if (ownerId)
      return GetUserProfile({ id: ownerId }).then((res) => setOwnerData(res));
    GetUserProfile({ email: email }).then((res) => setImage(res.image));
  }, []);

  if (ownerId) {
    return (
      <div
        className="SharedProfileContainer"
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
        onClick={() => setShowToolTip(!ShowToolTip)}
        onDoubleClick={handleHemoveShare}
      >
        <img
          src={
            ownerData?.image ||
            `https://ui-avatars.com/api/?background=random&name=${ownerData?.name}`
          }
          alt={""}
          className="SharedProfileImage OwnerProfile"
        />
        {ShowToolTip && (
          <div className="SharedProfileToolTip">
            <img
              src={
                ownerData?.image ||
                `https://ui-avatars.com/api/?background=random&name=${ownerData?.name}`
              }
              alt={""}
              className="SharedProfileImage OwnerProfile ToolTipImage"
            />
            <div className="SharedProfileListCreatorBadge">
              Criador da lista
            </div>
            {ownerData?.email}
          </div>
        )}
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
      <img src={image ||  `https://ui-avatars.com/api/?background=random&name=${email}`} alt={""} className="SharedProfileImage" />
      {ShowToolTip && (
        <div className="SharedProfileToolTip">
          <img
            src={image ||  `https://ui-avatars.com/api/?background=random&name=${email}`}
            alt={""}
            className="SharedProfileImage ToolTipImage"
          />

          {email}
          {!listShared && (
            <div
              onClick={handleHemoveShare}
              className="SharedProfileRemoveBottom"
            >
              Remover
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SharedProfile;
