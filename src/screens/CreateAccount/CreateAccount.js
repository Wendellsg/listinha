import "./CreateAccount.styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../api/MarketListApi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function HandleCreate() {
    if (name === "" || email === "" || password === "") return;
    if (password !== passwordVerify) return;

    let userPayload = {
      name: name,
      email: email,
      password: password,
    };

    await CreateUser(userPayload);
    setEmail("");
    setPassword("");
    navigate("/");
  }

  return (
    <div className="CreateAccountContainer">
      <div>
        <h1>Crie sua conta</h1>
      </div>

      <div className="loginCredencials">
        <label className="LoginLabel">Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="loginInput"
          type={"text"}
        />
        <label className="LoginLabel">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu Email"
          className="loginInput"
          type={"email"}
        />
        <label className="LoginLabel">Senha</label>
        <div style={{ position: "relative" }}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            className="loginInput"
            type={showPassword?"text":"password"}
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
            type={showPassword?"text":"password"}
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
          HandleCreate();
        }}
      >
        <h2>Criar conta</h2>
      </div>
    </div>
  );
}
