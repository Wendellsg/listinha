/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Plus from "../../assets/plus.png";
import "./List.styles.css";
import Categories from "../../data/categories";
import CreatedItens from "../../components/CreatedItens/Createditens";
import { toastifyConfig } from "../../utils";
import SugestionsList from "../../components/SugestionsList";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import {
  AddNewItem,
  removeItem,
  UpdateItemBuyed,
  setItemQuantity,
  createSugestion,
} from "../../api/MarketListApi";
import { useUserData } from "../../hooks/useUserData";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLists } from "../../hooks/useLists";

export default function List() {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState(Categories[0].name);
  const [itemsList, setItemsList] = useState(null);
  const [showSugestionModal, setShowSugestionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { userData } = useUserData();
  const { fetchList } = useLists();
  const navigate = useNavigate();

  const fetchPageList = async (id) => {
    setIsLoading(true);
    const response = await fetchList(id);
    if (response.notAutorized) {
      toast.warn(
        "Você não pode acessar esta lista. Se a lista for sua, tente fazer login novamente.",
        {
          ...toastifyConfig,
          autoClose: 8000,
          isLoading: false,
        }
      );
      setIsLoading(false);
      return navigate("/listas");
    }

    if (response.notNotFound) {
      toast.warn("Lista não encontrada", {
        ...toastifyConfig,
        isLoading: false,
      });
      setIsLoading(false);
      return navigate("/listas");
    }
    setIsLoading(false);
    setItemsList(response.items);
  };

  useEffect(() => {
    if (!id) return;
    fetchPageList(id);
  }, [id]);

  useEffect(() => {
    if (itemName.length > 3) {
      setShowSugestionModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemName]);

  useEffect(() => {
    return () => setItemsList(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectSugestion(name, category) {
    HandleAdditem(name, category);
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
      category,
      creator: userData?.email,
    };
    await createSugestion(newSugestion);

    setItemName("");
    fetchPageList(id);
  }

  const HandleRemoveItem = async (itemId) => {
    let itemToRemove = {
      _id: itemsList._id,
      itemid: itemId,
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
      <Header />
      <div className="NewItemContainer">
        <div className="NewItemForm">
          <div style={{ flexDirection: "column", marginRight: "20px" }}>
            <div style={{ positon: "relative" }}>
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
        <div
          onClick={() => HandleAdditem(itemName, itemCategory)}
          className="NewItemplusicon"
        >
          <img src={Plus} alt="adicionar" />
        </div>
      </div>
      <div className="ListHeader">
        <h1 style={{ fontSize: "18px" }}>{itemsList?.name}</h1>
        <h1>
          {itemsList?.items?.length}{" "}
          {itemsList?.items?.length > 1 ? "itens" : "item"}
        </h1>
      </div>
      <div className="ListItemsContainer">
        {isLoading ? (
          <Loading />
        ) : (
          !itemsList?.items?.length && "Nenhum item adicionado ainda"
        )}
        {itemsList &&
          // eslint-disable-next-line array-callback-return
          Categories.map((category, i) => {
            const itensByCategory = itemsList?.items?.filter(
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
