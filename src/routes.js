import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./screens/Home/Home";
import Lists from "./screens/Lists/Lists";
import List from "./screens/List/List";
import CreateAccount from "./screens/CreateAccount/CreateAccount"
import ResetPassword from './screens/ResetPassword/ResetPassword'
import ChangePassword from './screens/ChangePassword/ChangePassword'

import { useEffect } from "react";


const publicPathsNames = [
  '/create-account',
  '/reset-password',
 '/change-password',
 '/'
]

// import your route components too
export default function Router() {

  useEffect(()=>{
    const token = localStorage.getItem("@ListinhaToken")
    const pathname = window.location.pathname;
    if(token &&  pathname === '/'){
     return window.location.href = '/listas'
    }
   
    if((!token || token === 'null') && !publicPathsNames.includes(pathname)){
      window.location.href = '/'
    }
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="listas" element={<Lists />} />
        <Route path="/lista/:id" element={<List />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}
