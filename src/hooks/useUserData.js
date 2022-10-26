import { useState } from "react";
import { GetUserData } from "../api/MarketListApi";
import { userDataAtom } from "./states";
import { useAuth } from "./useAuth";
import { useAtom } from "jotai";

export function useUserData() {
  const { token } = useAuth();
  const [userData, setUserData] = useAtom(userDataAtom);

  async function fetchUserData() {
    const response = await GetUserData(token);

    if (!response) return;
    setUserData(response);
  }
  return { userData, fetchUserData };
}
