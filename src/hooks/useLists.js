import {
  GetLists,
  RemoveList,
  shareList,
  createList,
} from "../api/MarketListApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUserData } from "./useUserData";
import { toast } from "react-toastify";
import { toastifyConfig } from "../utils";
import { useNavigate } from "react-router-dom";

export function useLists() {
  const { userData } = useUserData();
  const { isLoading, data, refetch } = useQuery(["listsData"], () =>
    GetLists(userData?.userid, userData?.email)
  );
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("@ListinhaToken");
    localStorage.removeItem("@ListinhaUserData");
    navigate("/");
  }

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
    if (data || !userData) return;
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return {
    HandleShareList,
    refetch,
    HandleRemoveList,
    isLoading,
    data,
    handleCreateList,
  };
}
