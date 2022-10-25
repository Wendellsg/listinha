import {
  GetLists,
  RemoveList,
  shareList,
  createList,
  GetList,
} from "../api/MarketListApi";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { isLoadingAtom, userListsAtom } from "./states";
import { useAtom } from "jotai";

export function useLists() {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [userLists, seUserLists] = useAtom(userListsAtom);

  async function fectchUserLists() {
    setIsLoading(true);
    const lists = await GetLists(token);
    seUserLists(lists);
    setIsLoading(false);
    return;
  }

  const HandleRemoveList = async (listID) => {
    await RemoveList(listID, token);
    fectchUserLists();
  };

  const HandleShareList = async (listID, email) => {
    let sharePayload = {
      listid: listID,
      email: email,
      token: token,
    };
    await shareList(sharePayload);
    fectchUserLists();
  };
  async function handleCreateList(listName) {
    const Lista = {
      name: listName,
      token,
    };
    await createList(Lista);
    fectchUserLists();
  }

  async function fetchList(listId) {
    const list = await GetList(listId, token);
    console.log(list);
    if (list) return list;
  }

  return {
    HandleShareList,
    fectchUserLists,
    HandleRemoveList,
    isLoading,
    userLists,
    handleCreateList,
    fetchList,
  };
}
