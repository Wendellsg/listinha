import "./CreateAccount.styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../api/MarketListApi";
export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function HandleCreate() {
    if (name === "" || email === "" || password === "") return;

    let userPayload = {
      name: name,
      email: email,
      password: password,
    };

    await CreateUser(userPayload);
    setEmail("");
    setPassword("");
    navigate('/')
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
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
          className="loginInput"
          type={"password"}
        />
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
