import "./ResetPassword.styles.css";
import { useState } from "react";
import { sendResetPassword } from "../../api/MarketListApi";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  async function handleSendPassWordResetToken() {
    if (email === "") return;
   await sendResetPassword({
      email: email
    })
  }

  return (
    <div className="homeContainer">
      <div>
        <h1>Reset sua senha</h1>
        <p
          className="LoginLabel"
          style={{ marginLeft: "0", marginTop: "1rem", marginBottom: '2rem' }}
        >
          Informe o e-mail para enviarmos o link de reset de senha.
        </p>
      </div>

      <div className="loginCredencials">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu E-mail"
          className="loginInput"
          type={"email"}
        />
      </div>

      <div
        className="btnHome"
        onClick={() => {
          handleSendPassWordResetToken();
        }}
      >
        <h2>Enviar</h2>
      </div>
    </div>
  );
}
