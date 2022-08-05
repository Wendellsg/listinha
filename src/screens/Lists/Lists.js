import Header from "../../components/header/header";
import NewList from "../../components/NewList/NewList";
import CreatedList from "../../components/CreatedList/CreatedList";
import { useEffect, useState } from "react";
import { GetLists, RemoveList } from "../../api/MarketListApi";

export default function Lists() {
  const [listsData, setListsData] = useState([]);
  const [update, setUpdate] = useState(0);

  const HandleRemoveList = async (listID) => {
    await RemoveList(listID)
    setUpdate(Date.now);
  };

  useEffect(() => {
    GetLists("1").then((res) => setListsData(res));
  }, [update]);

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
                removefunction={HandleRemoveList}
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
