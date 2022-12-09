import { useEffect } from "react";
import { Login } from "../api/MarketListApi";
import { tokenAtom } from "./states";
import { useAtom } from "jotai";

export const useAuth = () => {
  const [token, setToken] = useAtom(tokenAtom);

  async function HandleLogin(credencials) {
    let loginData = await Login(credencials);

    if (!loginData.success) return loginData;

    if (loginData.success) {
      localStorage.setItem("@ListinhaToken", loginData.token);
      setToken(loginData.token);
      return;
    }
  }

  function logOut() {
    localStorage.removeItem("@ListinhaToken");
    setToken(null);
  }

  return {
    token,
    HandleLogin,
    logOut,
    setToken,
  };
};
