import "./newList.styles.css";
import Plus from "../../assets/plus.png";
import { useState } from "react";
import { useLists } from "../../hooks";

export default function NewList() {
  const [listName, setListName] = useState("");
  const { handleCreateList } = useLists();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateList(listName);
      setListName('')
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
      <div onClick={() => [handleCreateList(listName), setListName('')]}>
        <div className="Newlistplusicon">
          <img src={Plus} alt="adicionar" />
        </div>
      </div>
    </div>
  );
}
