import { GetLists, RemoveList, shareList, createList } from "../api/MarketListApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toastifyConfig } from "../utils";
import { toast } from "react-toastify";
const userData = JSON.parse(localStorage.getItem("@ListinhaUserData"));

export function useLists(){
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
    toast.info(
      "Para remover o compartilhamento clique 2 vezes na imagem do usuário.",
      {
        ...toastifyConfig,
      }
    );
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
    if (userData) {
      refetch();
    }
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