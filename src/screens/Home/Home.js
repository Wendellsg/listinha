import "./Home.styles.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import illustation from "../../assets/homeimage.jpg";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { HandleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <div>
        <h1>Listinhas</h1>
        <img src={illustation} className="HomeIllustration"/>
      </div>

      <div className="loginCredencials">
        <label className="LoginLabel">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu Email"
          className="loginInput"
          type={"email"}
        />
        <label className="LoginLabel">
          Senha
        </label>
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
            HandleLogin({
            email: email,
            password: password,
          });
          setEmail("");
          setPassword("");
        }}
      >
        <h2>Entrar</h2>
      </div>

      <div
      onClick={() => navigate(`/create-account`)}
      >
        <p className="LoginLabel" style={{cursor: 'pointer', marginLeft: '0', marginTop: '1rem'}}>Ainda não tem uma conta?</p>
      </div>

      <p className="LoginLabel" style={{marginLeft: '0', marginTop: '1rem'}}>Nunca mais esqueça os itens das suas comprinhas do mercado</p>
    </div>
  );
}
