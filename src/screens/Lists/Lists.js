import Header from "../../components/header/header";
import NewList from "../../components/NewList/NewList";
import CreatedList from "../../components/CreatedList/CreatedList";
import { useEffect, useState, useContext, useRef } from "react";
import { GetLists, RemoveList } from "../../api/MarketListApi";
import { AuthContext } from "../../contexts/AuthContext";
import "./Lists.styles.css";
import { toast } from "react-toastify";
import {useQuery } from '@tanstack/react-query'

export default function Lists() {
  const [update, setUpdate] = useState(0);
  const { token, userData } = useContext(AuthContext);
  const toastId = useRef(null);
  const { isLoading, error, data, refetch  } = useQuery(['listsData'], () => GetLists(userData?.userid))

  const HandleRemoveList = async (listID) => {
    await RemoveList(listID);
    setUpdate(Date.now);
  };

  useEffect(()=>{
    if(!userData?.userid)return;
    refetch()
   },[update, userData])

   useEffect(()=>{
    refetch()
   },[])

  if(isLoading) return 'Carregando...'

  return (
    <div className="ListsContainer">
      <Header name="Listinhas" />
      <NewList setUpdate={setUpdate} userID={userData?.userid} />
      <br />
      <h2 className="subtitle">Listinhas criadas por {userData?.name}</h2>
      <div>
        {!data?.length ? (
          <h2 className="subtitle">Você ainda não criou nenhuma lista</h2>
        ) : (
          data?.map((list, index) => {
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
