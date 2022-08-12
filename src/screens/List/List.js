import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Plus from "../../assets/plus.png";
import "./List.styles.css";
import Categories from "../../data/categories";
import CreatedItens from "../../components/CreatedItens/Createditens";
import {
  GetList,
  AddNewItem,
  removeItem,
  UpdateItemBuyed,
} from "../../api/MarketListApi";

import { useParams } from "react-router-dom";

export default function List() {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemCategory, setItemCategory] = useState("Limpenza");
  const [itemMessury, setItemMessury] = useState("Unidade(s)");
  const [update, setUpdate] = useState(0);
  const [listofPage, setListofPage] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    GetList(id).then((res) => setListofPage(res));
  }, [update]);

  async function HandleAdditem() {
    const newitem = {
      _id: listofPage._id,
      name: itemName,
      quantity: itemQuantity,
      buyed: false,
      category: itemCategory,
      measure: itemMessury,
    };

    await AddNewItem(newitem);

    setItemName("");
    setItemQuantity(0);
    setUpdate(Date.now());
  }

  const HandleRemoveItem = async (itemId) => {
    let itemToRemove = {
      _id: listofPage._id,
      itemId: itemId,
    };
    await removeItem(itemToRemove);
    setUpdate(Date.now());
  };

  const HandleSetBuyedItem = async (itemId, state) => {
    let itemToUpdate = {
      _id: listofPage._id,
      itemId: itemId,
      state: state,
    };
    await UpdateItemBuyed(itemToUpdate);
    setUpdate(Date.now());
  };

  //
  const CategorieOptions = Categories?.map((category) => (
    <option key={category.id} value={category.name}>
      {category.name}
    </option>
  ));
  return (
    <div>
      <Header name={listofPage?.name} />
      <div className="NewItemContainer">
        <div className="NewItemForm">
          <div style={{ flexDirection: "column", marginRight: "20px" }}>
            <div>
              <h2>Nome do item</h2>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={{ width: "120px" }}
                placeholder="Nome do item"
                className="NewItemInput"
                type="text"
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <h2>Quantidade</h2>
              <input
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                placeholder="3"
                className="NewItemInput"
                type="number"
              />
            </div>
          </div>
          <div style={{ flexDirection: "column" }}>
            <div>
              <h2>Categoria</h2>
              <select
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
                className="NewItemSelect"
              >
                {CategorieOptions}
              </select>
            </div>
            <div style={{ marginTop: "10px" }}>
              <h2>Medida</h2>
              <select
                value={itemMessury}
                onChange={(e) => setItemMessury(e.target.value)}
                className="NewItemSelect"
              >
                <option value="Unidade(s)">Unidade(s)</option>
                <option value="Kg(s)">Kg(s)</option>
                <option value="Pacote(s)">Pacote(s)</option>
                <option value="Litro(s)">Litro(s)</option>
                <option value="Metro(s)">Metro(s)</option>
              </select>
            </div>
          </div>
        </div>
        <div onClick={() => HandleAdditem()} className="NewItemplusicon">
          <img src={Plus} alt="adicionar" />
        </div>
      </div>
      <h1 style={{ fontSize: "24px", margin: "15px" }}>Itens</h1>
    <div className="ListItemsContainer">
    {listofPage &&
        Categories.map((category) => {
          const itensByCategory = listofPage.items.filter(
            (item) => item.category === category.name
          );
          if (itensByCategory?.length > 0) {
            return (
              <div key={category.id}>
                <div className="CategoryHeader"><img src={require(`../../assets/category_images/${category.id}.png`)} alt={category.name}/> <h2>{category?.name}</h2></div>
                {itensByCategory.map((item) => {
                  return (
                    <CreatedItens
                      key={item._id}
                      item={item}
                      HandleRemoveItem={HandleRemoveItem}
                      HandleSetBuyedItem={HandleSetBuyedItem}
                    />
                  );
                })}
              </div>
            );
          }
        })}
    </div>
      
    </div>
  );
}
