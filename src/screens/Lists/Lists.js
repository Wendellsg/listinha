import Header from "../../components/header/header";
import NewList from "../../components/NewList/NewList";
import CreatedList from "../../components/CreatedList/CreatedList";
import { useEffect, useState, useContext } from "react";
import {
  GetLists,
  RemoveList,
  shareList,
} from "../../api/MarketListApi";
import { AuthContext } from "../../contexts/AuthContext";
import "./Lists.styles.css";
import { useQuery } from "@tanstack/react-query";
import {BsFillPersonFill, BsFillPeopleFill} from 'react-icons/bs'

export default function Lists() {
  const [update, setUpdate] = useState(0);
  const { userData } = useContext(AuthContext);
  const { isLoading, data, refetch } = useQuery(["listsData"], () =>
    GetLists(userData?.userid, userData?.email)
  );
  const [showList, setShowList] = useState("mylist");

  const HandleRemoveList = async (listID) => {
    await RemoveList(listID);
    setUpdate(Date.now);
  };

  const HandleShareList = async (listID, email) => {
    let sharePayload = {
      listid: listID,
      email: email,
    };
    await shareList(sharePayload);
    setUpdate(Date.now);
  };

  useEffect(() => {
    if (!userData?.userid) return;
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);


  useEffect(() => {
    if (userData){
      refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);


  if (isLoading) return "Carregando...";

  return (
    <div className="ListsContainer">
      <Header name="Listinhas" />
      <NewList setUpdate={setUpdate} userID={userData?.userid} />
      <br />
      <div className="ListSelect" >
        <div className="ListSelectItem" onClick={()=> setShowList('mylist')}>
        <BsFillPersonFill size={25} color={showList === "mylist" ? '#47C8EC': '#CCC'}/>
        </div>
        <div className="ListSelectItem" onClick={()=> setShowList('sharedlist')}>
        <BsFillPeopleFill size={25} color={showList === "sharedlist" ? '#47C8EC': '#CCC'}/>
        </div>
      </div>
      <div
        style={
          showList === "mylist" ? { display: "flex", flexDirection: 'column' } : { display: "none" }
        }
      >
        <h2 className="subtitle">Minhas listas</h2>
        <div>
          {!data?.myLists.length ? (
            <h2 className="subtitle">Você ainda não criou nenhuma lista</h2>
          ) : (
            data?.myLists.map((list, index) => {
              return (
                <CreatedList
                  key={list._id}
                  removefunction={HandleRemoveList}
                  HandleShareList={HandleShareList}
                  listname={list.name}
                  listdate={list.createdAt}
                  id={list._id}
                  listitens={list.items}
                  index={index}
                  sharedWith={list.sharedWith}
                  setUpdate={setUpdate}
                  listShared={false}
                />
              );
            })
          )}
        </div>
      </div>

      <div
        style={
          showList === "sharedlist" ? { display: "flex", flexDirection: 'column' } : { display: "none" }
        }
      >
        <h2 className="subtitle">Lista compartilhadas</h2>
        <div>
          {!data?.sharedLists.length ? (
            <h2 className="subtitle">
              Ninguem compartilhou nenhuma lista com você ainda
            </h2>
          ) : (
            data?.sharedLists.map((list, index) => {
              return (
                <CreatedList
                  key={list._id}
                  removefunction={HandleRemoveList}
                  HandleShareList={HandleShareList}
                  listname={list.name}
                  listdate={list.createdAt}
                  id={list._id}
                  listitens={list.items}
                  index={index}
                  sharedWith={list.sharedWith}
                  setUpdate={setUpdate}
                  listShared={true}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
