import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Lists from "./screens/Lists/Lists";
import List from "./screens/List/List";
import CreateAccount from "./screens/CreateAccount/CreateAccount";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import ChangePassword from "./screens/ChangePassword/ChangePassword";
import EmailConfirmation from "./screens/EmailConfirmation/EmailConfirmation";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useUserData } from "./hooks/useUserData";
import { useLists } from "./hooks/useLists";

const publicPathsNames = [
  "/create-account",
  "/reset-password",
  "/change-password",
  "/email-confirmation",
  "/",
];

// import your route components too
export default function Router() {
  const { token } = useAuth();
  const { fetchUserData } = useUserData();
  const { fectchUserLists } = useLists();

  useEffect(() => {
    if (!token) return;

    fectchUserLists();
    fetchUserData();

    const pathname = window.location.pathname;
    if (pathname === "/") {
      return (window.location.href = "/listas");
    }
    if ((!token || token === "null") && !publicPathsNames.includes(pathname)) {
      window.location.href = "/";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="listas" element={<Lists />} />
        <Route path="/lista/:id" element={<List />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}
