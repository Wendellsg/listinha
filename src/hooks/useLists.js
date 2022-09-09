import { GetLists, RemoveList, shareList, createList } from "../api/MarketListApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toastifyConfig } from "../utils";
import { toast } from "react-toastify";
import { useUserData } from "./useUserData";

export function useLists(){
    const {userData} = useUserData()
    const { isLoading, data, refetch } = useQuery(["listsData"], () =>
    GetLists(userData?.userid, userData?.email), {
      retry: true
    }
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

  useEffect(() => {
      refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return{
    HandleShareList,
    refetch,
    HandleRemoveList,
    isLoading,
    data,
    handleCreateList,
  }
}