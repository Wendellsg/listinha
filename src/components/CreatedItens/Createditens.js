import "./Createditens.styles.css";
import DeleteIcon from "../../assets/deleteicon.png";
import CheckIcon from "../../assets/check.png";
import Carrinho from "../../assets/carrinho.png";

export default function CreatedItens({
  item,
  HandleRemoveItem,
  HandleSetBuyedItem,
}) {
  function TextDecoration({ buyed }) {
    if (buyed) {
      return { textDecorationLine: "line-through", color: "#888" };
    } else {
      return {};
    }
  }

  return (
    <li className="ListItem">
      <h1 className="ItemName" style={TextDecoration(item.buyed||false)}>
        {item.name}
      </h1>
      <h1 className="ItemQuantity" style={TextDecoration(item.buyed||false)}>
        {`${item.quantity} ${item.measure}`}
      </h1>
      <div style={item.buyed ? { display: "none" } : { display: "flex" }}>
        <div onClick={() => HandleRemoveItem(item._id)} className="ItemIcons">
          <img src={DeleteIcon} alt="deletar" />
        </div>
        <div onClick={() => HandleSetBuyedItem(item._id)} className="ItemIcons">
          <img src={CheckIcon} alt="comprado" />
        </div>
      </div>
      <div
        className="itembuyed"
        style={item.buyed ? { display: "flex" } : { display: "none" }}
      >
        <img src={Carrinho} alt="deletar" />
        <p>No carrinho</p>
        <div
          onClick={() => HandleRemoveItem(item.itemId)}
          className="ItemIcons"
        >
          <img src={DeleteIcon} alt="deletar" />
        </div>
      </div>
    </li>
  );
}
