import Header from "../../components/header/header";
import NewList from "../../components/NewList/NewList";
import CreatedList from "../../components/CreatedList/CreatedList";
import { useEffect, useState } from "react";
import { GetLists } from "../../api/MarketListApi";

export default function Lists() {
  const [listsData, setListsData] = useState([]);
  const [update, setUpdate] = useState(0);

  function SaveLocalList() {
    localStorage.setItem("Listas", JSON.stringify(listsData));
    const listupdate = localStorage.getItem("Listas");
    setListsData(JSON.parse(listupdate));
  }

  const RemoveList = (listID) => {
    //console.log('Vou remover a lista: ' + listID )
    const index = listsData.findIndex((list) => list.id === parseInt(listID));
    let novoarray = listsData;
    novoarray.splice(index, 1);
    setListsData(novoarray);
    SaveLocalList();
    setUpdate(Date.now);
  };

  useEffect(() => {
    GetLists("1").then((res) => setListsData(res));
  }, []);

  return (
    <div className="ListsContainer">
      <Header name="Listinhas" />
      <NewList setUpdate={setUpdate} />
      <br />
      <h2 className="subtitle">Listinhas criadas</h2>
      <div>
        {!listsData? (
          <h2 className="subtitle">Você ainda não criou nenhuma lista</h2>
        ) : (
          listsData?.map((list) => {
            return (
              <CreatedList
                key={list._id}
                removefunction={RemoveList}
                listname={list.name}
                listdate={list.createdAt}
                id={list._id}
                listitens={list.items}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
