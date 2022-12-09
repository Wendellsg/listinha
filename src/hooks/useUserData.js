import { GetUserData } from "../api/MarketListApi";
import { userDataAtom } from "./states";
import { useAuth } from "./useAuth";
import { useAtom } from "jotai";

export function useUserData() {
  const { token, logOut } = useAuth();
  const [userData, setUserData] = useAtom(userDataAtom);
  async function fetchUserData() {
    const response = await GetUserData(token);
    console.log(response);
    if (response.notAutorized) {
      logOut();
    }
    if (!response) return;
    setUserData(response);
  }
  return { userData, fetchUserData };
}
