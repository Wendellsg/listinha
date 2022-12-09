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
  const { token, setToken } = useAuth();
  const { fetchUserData } = useUserData();
  const { fectchUserLists } = useLists();

  useEffect(() => {
    const localToken = localStorage.getItem("@ListinhaToken");
    const pathname = window.location.pathname;
    if (
      (!localToken || localToken === "null") &&
      !publicPathsNames.includes(pathname)
    ) {
      window.location.href = "/";
      return;
    } else if (localToken && localToken !== "null") {
      setToken(localToken);
      if (pathname === "/") {
        window.location.href = "/listas";
      }
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    fectchUserLists();
    fetchUserData();

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
