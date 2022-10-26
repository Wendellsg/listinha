import "./CreatedList.styles.css";
import { IoTrashSharp, IoShareSocialSharp, IoSendSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import SharedProfile from "../../components/SharedProfile";
import { toastifyConfig } from "../../utils";
import { removeShare } from "../../api/MarketListApi";
import { useUserData } from "../../hooks";
import { useLists } from "../../hooks";

export default function CreatedList(props) {
  const [showShareBox, setShowShateBox] = useState(false);
  const { userData } = useUserData();
  const { fectchUserLists } = useLists();
  const [email, setEmail] = useState("");
  const Quantity = props.listitens.length;
  const Plural = () => {
    if (Quantity <= 1) {
      return "Item";
    } else {
      return "Itens";
    }
  };
  async function handleHemoveShare() {
    let removePayload = {
      _id: props.id,
      email: userData.email,
    };
    await removeShare(removePayload);
    fectchUserLists();
  }

  function getColor() {
    if (props.index < 4) return props.index;
    return props.index % 4;
  }

  function shareVerify() {
    if (email === "" || !email.includes("@"))
      return toast.warn(
        "📧 Digite o e-mail pra quem quer compartilhar",
        toastifyConfig
      );
    props.HandleShareList(props.id, email);
    setShowShateBox(false);
  }

  const navigate = useNavigate();
  return (
    <li
      className={`CreatedListContainer list-${getColor()} swing-in-top-fwd`}
      style={{ animationDelay: `${props.index * 200}ms` }}
    >
      <div className="CreatedListHeader">
        <div
          onClick={() => navigate(`/lista/${props.id}`)}
          className="listLinkContainer"
        >
          <h3>{props.listname}</h3>
          <h3>{`${Quantity} ${Plural()}`}</h3>
        </div>

        <div className="bin">
          <IoTrashSharp
            size={25}
            onClick={() => {
              if (props.listShared) {
                handleHemoveShare();
              } else {
                props.removefunction(props.id);
              }
            }}
          />
        </div>
        <div className="bin">
          <IoShareSocialSharp
            size={25}
            onClick={() => setShowShateBox(!showShareBox)}
          />
        </div>
      </div>
      {props.sharedWith && (
        <div className="SharedList">
          {props.sharedWith.map((profile) => {
            return (
              <SharedProfile
                email={profile.email}
                listid={props.id}
                setUpdate={props.setUpdate}
                listShared={props.listShared}
              />
            );
          })}
          {props.listShared && (
            <SharedProfile
              ownerId={props.ownerId}
              listShared={props.listShared}
            />
          )}
        </div>
      )}
      {showShareBox && (
        <div
          className="CreatedListShareListContainer"
          onKeyDown={(e) => (e.key === "Enter" ? shareVerify() : null)}
        >
          <input
            type="email"
            placeholder="E-mail para quem quer compartilhar"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="bin">
            <IoSendSharp size={25} onClick={shareVerify}>
              enviar
            </IoSendSharp>
          </div>
        </div>
      )}
    </li>
  );
}
