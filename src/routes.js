import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./screens/Home/Home";
import Lists from "./screens/Lists/Lists";
import List from "./screens/List/List";
import CreateAccount from "./screens/CreateAccount/CreateAccount"

import { useEffect } from "react";

// import your route components too
export default function Router() {

  useEffect(()=>{
    const token = localStorage.getItem("@ListinhaToken")
    const pathname = window.location.pathname;
    if(token &&  pathname === '/'){
     return window.location.href = '/listas'
    }
   
    if((!token && pathname !== '/' && pathname !== '/create-account')|| (token === 'null' && pathname !== '/' && pathname !== '/create-account')){
      window.location.href = '/'
    }
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="listas" element={<Lists />} />
        <Route path="/lista/:id" element={<List />} />
        <Route path="/create-account/" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}
