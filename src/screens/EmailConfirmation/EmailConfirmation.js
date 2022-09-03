import "./EmailConfirmation.styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendChangePassword } from "../../api/MarketListApi";

export default function EmailConfirmation() {
  const [emailConfirmationToken, setEmailConfirmationToken] = useState("");
  const [emailConfirmationEmail, setEmailConfirmationEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlSerch = new URLSearchParams(window.location.search);
    const token = urlSerch.get("token");
    const email = urlSerch.get("email");
    setEmailConfirmationToken(token);
    setEmailConfirmationEmail(email);
  }, []);


  return (
    <div className="homeContainer">
      <span>Confirmando email {emailConfirmationEmail||''}</span>
    </div>
  );
}
