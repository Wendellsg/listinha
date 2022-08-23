import "./Createditens.styles.css";
import { MdCheckCircleOutline, MdRemoveShoppingCart } from "react-icons/md";
import {
  IoCloseCircleOutline,
  IoAddSharp,
  IoRemoveSharp,
} from "react-icons/io5";

export default function CreatedItens({
  item,
  HandleRemoveItem,
  HandleSetBuyedItem,
  HandleChangeQuantity,
  index,
}) {
  function TextDecoration(buyed) {
    if (buyed) {
      return { textDecorationLine: "line-through", color: "#888" };
    } else {
      return {};
    }
  }

  return (
    <li className="ListItem swing-in-top-fwd" style={{animationDelay: `${index*200}ms`}}>
      <h1 className="ItemName" style={TextDecoration(item.buyed)}>
        {item.name}
      </h1>

      <div className="ItemTools">
        <div onClick={() => HandleChangeQuantity(item._id, item.quantity -1)} className="ItemIcons">
          <IoRemoveSharp color="#333" />
        </div>

        <h1 className="ItemName">{item.quantity}</h1>
        <div className="ItemTools" style={{ marginRight: "2rem" }}>
          <div onClick={() => HandleChangeQuantity(item._id, item.quantity +1)} className="ItemIcons">
            <IoAddSharp color="#333" />
          </div>
        </div>

        {item.buyed ? (
          <div className="itembuyed">
            <div
              onClick={() => HandleSetBuyedItem(item._id, false)}
              className="ItemIcons"
            >
              <MdRemoveShoppingCart color="#333" />
            </div>

            <div
              onClick={() => HandleRemoveItem(item._id)}
              className="ItemIcons"
            >
              <IoCloseCircleOutline color="#AB3030" />
            </div>
          </div>
        ) : (
          <div className="itembuyed">
            <div
              onClick={() => HandleRemoveItem(item._id)}
              className="ItemIcons"
            >
              <IoCloseCircleOutline color="#AB3030" />
            </div>
            <div
              onClick={() => HandleSetBuyedItem(item._id, true)}
              className="ItemIcons"
            >
              <MdCheckCircleOutline color="#59D640" />
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
