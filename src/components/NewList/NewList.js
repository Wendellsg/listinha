import "./newList.styles.css";
import Plus from "../../assets/plus.png";
import { useState, useEffect } from "react";
import { createList } from "../../api/MarketListApi";

export default function NewList({ setUpdate, userID }) {
  const [listName, setListName] = useState("");

  async function handleCreateList() {
    const Lista = {
      name: listName,
      ownerId: userID,
    };
    setListName('')
    await createList(Lista);
    setUpdate(Math.random());
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateList();
    }
  };

  return (
    <div className="NewListContainer">
      <div className="newListForm">
        <h2>Criar nova listinha</h2>
        <input
          onKeyPress={(e) => handleKeyPress(e)}
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Nome da listinha"
          className="NewlistInput"
          type="text"
        />
      </div>
      <div onClick={() => handleCreateList()}>
        <div className="Newlistplusicon">
          <img src={Plus} alt="adicionar" />
        </div>
      </div>
    </div>
  );
}
