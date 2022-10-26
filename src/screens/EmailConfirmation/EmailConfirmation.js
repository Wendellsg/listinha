import "./EmailConfirmation.styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailConfirmation } from "../../api/MarketListApi";

export default function EmailConfirmation() {
  const [emailConfirmationToken, setEmailConfirmationToken] = useState("");
  const [emailConfirmationEmail, setEmailConfirmationEmail] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlSerch = new URLSearchParams(window.location.search);
    const token = urlSerch.get("token");
    const email = urlSerch.get("email");
    setEmailConfirmationToken(token);
    setEmailConfirmationEmail(email);
  }, []);

  async function sendConfirmation() {
    const confirmationPayLoad = {
      email: emailConfirmationEmail,
      token: emailConfirmationToken,
    };
    const confirmationResponse = await emailConfirmation(confirmationPayLoad);

    localStorage.removeItem("@ListinhaToken");

    if (confirmationResponse.success) {
      setConfirmationResult(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setConfirmationResult(false);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }

  useEffect(() => {
    sendConfirmation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailConfirmationToken]);

  return (
    <div className="homeContainer">
      {confirmationResult === false ? (
        <span>Falha na confirmação ❌</span>
      ) : confirmationResult === true ? (
        <span>Email confirmado com sucesso ✅</span>
      ) : (
        <span>Confirmando email {emailConfirmationEmail || ""}</span>
      )}
    </div>
  );
}
