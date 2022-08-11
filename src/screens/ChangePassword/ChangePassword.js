import "./ChangePassword.styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { sendChangePassword } from "../../api/MarketListApi";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlSerch = new URLSearchParams(window.location.search);
    const token = urlSerch.get("token");
    const email = urlSerch.get("email");
    setResetPasswordToken(token);
    setResetPasswordEmail(email);
  }, []);

  async function handleChanePassWord() {
    if (password === "") return;
    let changePasswordPayload = {
      email: resetPasswordEmail,
      token: resetPasswordToken,
      newPassword: password,
    };
    await sendChangePassword(changePasswordPayload);
    console.log(changePasswordPayload);
    navigate('/')
  }

  return (
    <div className="homeContainer">
      <div>
        <h1>Reset sua senha</h1>
        <p
          className="LoginLabel"
          style={{ marginLeft: "0", marginTop: "1rem", marginBottom: "2rem" }}
        >
          Informe o e-mail para enviarmos o link de reset de senha.
        </p>
      </div>

      <div className="loginCredencials">
        <div style={{ position: "relative" }}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            className="loginInput"
            type={showPassword ? "text" : "password"}
          />
          {showPassword ? (
            <AiFillEyeInvisible
              className="ShowPassowordIcon"
              size={18}
              color={"#30a4ab"}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiFillEye
              className="ShowPassowordIcon"
              size={18}
              color={"#30a4ab"}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        <label className="LoginLabel">repita sua senha</label>

        <div style={{ position: "relative" }}>
          <input
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
            placeholder="Repita sua senha"
            className="loginInput"
            type={showPassword ? "text" : "password"}
          />
          {showPassword ? (
            <AiFillEyeInvisible
              className="ShowPassowordIcon"
              size={18}
              color={"#30a4ab"}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiFillEye
              className="ShowPassowordIcon"
              size={18}
              color={"#30a4ab"}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </div>

      <div
        className="btnHome"
        onClick={() => {
          handleChanePassWord();
        }}
      >
        <h2>Enviar</h2>
      </div>
    </div>
  );
}
