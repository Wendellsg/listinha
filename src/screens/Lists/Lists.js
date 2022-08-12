import Header from "../../components/header/header";
import NewList from "../../components/NewList/NewList";
import CreatedList from "../../components/CreatedList/CreatedList";
import { useEffect, useState, useContext } from "react";
import { GetLists, RemoveList } from "../../api/MarketListApi";
import { AuthContext } from "../../contexts/AuthContext";
import './Lists.styles.css';
export default function Lists() {
  const [listsData, setListsData] = useState([]);
  const [update, setUpdate] = useState(0);
  const [userData, setUserData] = useState(null)
  const { token } = useContext(AuthContext);

  const HandleRemoveList = async (listID) => {
    await RemoveList(listID)
    setUpdate(Date.now);
  };

  useEffect(() => {
   GetLists(userData?.userid).then((res) => setListsData(res));
  }, [update, userData]);

  useEffect(()=>{
    let localUserData = JSON.parse(localStorage.getItem("@ListinhaUserData"));
    setUserData(localUserData)
  },[])

  return (
    <div className="ListsContainer">
      <Header name="Listinhas" />
      <NewList setUpdate={setUpdate} userID={userData?.userid}/>
      <br />
      <h2 className="subtitle">Listinhas criadas por {userData?.name}</h2>
      <div>
        {!listsData.length? (
          <h2 className="subtitle">Você ainda não criou nenhuma lista</h2>
        ) : (
          listsData?.map((list, index) => {
            return (
              <CreatedList
                key={list._id}
                removefunction={HandleRemoveList}
                listname={list.name}
                listdate={list.createdAt}
                id={list._id}
                listitens={list.items}
                index={index}

              />
            );
          })
        )}
      </div>
    </div>
  );
}
