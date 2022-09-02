import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Plus from "../../assets/plus.png";
import "./List.styles.css";
import Categories from "../../data/categories";
import CreatedItens from "../../components/CreatedItens/Createditens";
import { toastifyConfig } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import SugestionsList from "../../components/SugestionsList";
import Loading from "../../components/Loading";
import {
  AddNewItem,
  removeItem,
  UpdateItemBuyed,
  setItemQuantity,
  GetList,
  createSugestion,
} from "../../api/MarketListApi";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function List() {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState(Categories[0].name);
  const [itemsList, setItemsList] = useState(null);
  const [showSugestionModal, setShowSugestionModal] = useState(false);
  const { id } = useParams();
  const { isLoading, data, refetch } = useQuery(["listsItems"], () =>
    GetList(id)
  );

  useEffect(() => {
    setItemsList(data);
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (itemName.length > 3) {
      setShowSugestionModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemName]);

  function selectSugestion(name, category) {
    console.log(name, category)
    HandleAdditem(name,category)
    setShowSugestionModal(false);
  }

  async function HandleAdditem(name, category) {
    if (itemName === "")
      return toast.warn("O item precisa de um nome!", {
        ...toastifyConfig,
        isLoading: false,
      });

    const newitem = {
      _id: itemsList._id,
      name: name,
      buyed: false,
      category: category,
    };
    await AddNewItem(newitem);

    const newSugestion = {
      name,
      category
    }
    await createSugestion(newSugestion)

    setItemName("");
    refetch();
  }

  const HandleRemoveItem = async (itemId) => {
    let itemToRemove = {
      _id: itemsList._id,
      itemId: itemId,
    };

    setItemsList((oldList) => ({
      ...oldList,
      items: [...oldList.items.filter((item) => item._id !== itemId)],
    }));
    await removeItem(itemToRemove);
  };

  const HandleSetBuyedItem = async (itemId, state) => {
    let itemToUpdate = {
      _id: itemsList._id,
      itemId: itemId,
      state: state,
    };

    const oldItems = itemsList.items;
    let itemIndex = oldItems.findIndex((item) => item._id === itemId);
    oldItems[itemIndex].buyed = state;
    setItemsList((oldList) => ({ ...oldList, items: oldItems }));

    await UpdateItemBuyed(itemToUpdate);
  };

  const HandleChangeQuantity = async (itemId, quantity) => {
    let itemToUpdate = {
      _id: itemsList._id,
      itemId: itemId,
      quantity: quantity,
    };

    const oldItems = itemsList.items;
    let itemIndex = oldItems.findIndex((item) => item._id === itemId);
    oldItems[itemIndex].quantity = quantity;
    setItemsList((oldList) => ({ ...oldList, items: oldItems }));
    await setItemQuantity(itemToUpdate);
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
      <Header name={itemsList?.name} />
      <div className="NewItemContainer">
        <div className="NewItemForm">
          <div style={{ flexDirection: "column", marginRight: "20px" }}>
            <div style={{positon: 'relative'}}>
              <h2>Nome do item</h2>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={{ width: "150px" }}
                placeholder="Nome do item"
                className="NewItemInput"
                type="text"
              />
              {showSugestionModal && (
                <SugestionsList
                  search={itemName}
                  selectSugestion={selectSugestion}
                />
              )}
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
        <div onClick={() => HandleAdditem(itemName, itemCategory)} className="NewItemplusicon">
          <img src={Plus} alt="adicionar" />
        </div>
      </div>
      <h1 style={{ fontSize: "24px", margin: "15px" }}>Itens</h1>
      <div className="ListItemsContainer">
        {isLoading ? (
          <Loading />
        ) : (
          !itemsList?.items?.length && "Nenhum item adicionado ainda"
        )}
        {itemsList &&
          // eslint-disable-next-line array-callback-return
          Categories.map((category, i) => {
            const itensByCategory = itemsList.items.filter(
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
                  {itensByCategory.map((item, index) => {
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
