import "./CreatedList.styles.css";
import Bin from "../../assets/bin.png";
import { useNavigate } from "react-router-dom";

export default function CreatedList(props) {
  function formatDate(date) {
    let completeDate = new Date(date);
    let day = completeDate.getDate();
    let month = completeDate.getMonth();
    let year = completeDate.getFullYear();

    return `${day}/${month + 1}/${year}`;
  }

  const Quantity = props.listitens.length;
  const Plural = () => {
    if (Quantity <= 1) {
      return "Item";
    } else {
      return "Itens";
    }
  };

  const navigate = useNavigate();
  return (
    <li className={`CreatedListContainer list-${Math.floor(Math.random() * (5 - 1) + 1)} slide-in-left`} style={{animationDelay: `${props.index*200}ms`}}>
      <div
        onClick={() => navigate(`/lista/${props.id}`)}
        className="listLinkContainer"
      >
        <h3>{props.listname}</h3>
        <h3>{`${Quantity} ${Plural()}`}</h3>
      </div>

      <div className="bin">
        <img
          src={Bin}
          alt="apagar"
          onClick={() => props.removefunction(props.id)}
        />
      </div>
    </li>
  );
}
