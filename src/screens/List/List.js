import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Plus from "../../assets/plus.png";
import "./List.styles.css";
import Categories from "../../data/categories";
import CreatedItens from "../../components/CreatedItens/Createditens";
import { toastifyConfig } from "../../utils";
import {
  GetList,
  AddNewItem,
  removeItem,
  UpdateItemBuyed,
  setItemQuantity,
} from "../../api/MarketListApi";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function List() {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState(Categories[0].name);
  const [update, setUpdate] = useState(0);
  const [listofPage, setListofPage] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    GetList(id).then((res) => setListofPage(res));

  }, [update]);

  async function HandleAdditem() {


    if(itemName === '')return  toast.warn("O item precisa de um nome!", {...toastifyConfig,isLoading: false});

    const newitem = {
      _id: listofPage._id,
      name: itemName,
      buyed: false,
      category: itemCategory,
    };

    await AddNewItem(newitem);

    setItemName("");
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

  const HandleChangeQuantity = async (itemId, quantity) => {
    let itemToUpdate = {
      _id: listofPage._id,
      itemId: itemId,
      quantity: quantity,
    };
    await setItemQuantity(itemToUpdate);
    setUpdate(Date.now());
  };

  //
  const CategorieOptions = Categories?.map((category) => (
    <option
      key={category.id}
      value={category.name}
      style={{
        backgroundImage: `url(../../assets/category_images/${category.id}.png)`,
      }}
    >
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
                style={{ width: "150px" }}
                placeholder="Nome do item"
                className="NewItemInput"
                type="text"
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
          </div>
        </div>
        <div onClick={() => HandleAdditem()} className="NewItemplusicon">
          <img src={Plus} alt="adicionar" />
        </div>
      </div>
      <h1 style={{ fontSize: "24px", margin: "15px" }}>Itens</h1>
      <div className="ListItemsContainer">
        {!listofPage?.items?.length && 'Nenhum item adicionado ainda'}


        {listofPage &&
          // eslint-disable-next-line array-callback-return
          Categories.map((category, i) => {
            const itensByCategory = listofPage.items.filter(
              (item) => item.category === category.name
            );
            if (itensByCategory?.length > 0) {
              return (
                <div key={category.id}>
                  <div className="CategoryHeader">
                    <img
                      src={require(`../../assets/category_images/${category.id}.png`)}
                      alt={category.name}
                    />{" "}
                    <h2>{category?.name}</h2>
                  </div>
                  {
                  itensByCategory.map((item, index) => {
                    
                    return (
                      <CreatedItens
                        key={item._id}
                        item={item}
                        HandleRemoveItem={HandleRemoveItem}
                        HandleSetBuyedItem={HandleSetBuyedItem}
                        HandleChangeQuantity={HandleChangeQuantity}
                        index={index}
                    
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
