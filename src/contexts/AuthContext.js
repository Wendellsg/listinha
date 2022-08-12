import { createContext, useEffect, useState } from "react";
import { Login } from "../api/MarketListApi";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null)

  async function HandleLogin(credencials){
    let loginData = await Login(credencials)
    
    if(!loginData.success) return loginData;

    if(loginData.success){
      localStorage.setItem("@ListinhaToken", loginData.token)
      localStorage.setItem("@ListinhaUserData", JSON.stringify(loginData.userData))
      setToken(loginData.token)
      setUserData(loginData.userData)
      return loginData
    }

  }

  useEffect(()=>{
    let localToken = localStorage.getItem("@ListinhaToken")
    let localUserData = JSON.parse(localStorage.getItem("@ListinhaUserData"))|null
    setToken(localToken)
    setUserData(localUserData)
  },[])



  return <AuthContext.Provider value={{
    token,
    HandleLogin,
    userData
  }}>
    {children}
  </AuthContext.Provider>;
};

export default AuthProvider;
