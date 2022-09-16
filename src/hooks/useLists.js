import { GetLists, RemoveList, shareList, createList } from "../api/MarketListApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUserData } from "./useUserData";

export function useLists(){
    const {userData} = useUserData()
    const { isLoading, data, refetch } = useQuery(["listsData"], () =>
    GetLists(userData?.userid, userData?.email)
  );

  const HandleRemoveList = async (listID) => {
    await RemoveList(listID);
    refetch();
  };

  const HandleShareList = async (listID, email) => {
    let sharePayload = {
      listid: listID,
      email: email,
    };
    await shareList(sharePayload);
    refetch();
  };
  async function handleCreateList(listName) {
    const Lista = {
      name: listName,
      ownerId: userData?.userid,
    };
    await createList(Lista);
    refetch();
  }


  useEffect(()=>{
    if(data|| !userData) return;
    refetch()
  },[userData])


  return{
    HandleShareList,
    refetch,
    HandleRemoveList,
    isLoading,
    data,
    handleCreateList,
  }
}