import "./Home.styles.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import illustation from "../../assets/homeimage.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toastifyConfig } from "../../utils";
export default function Home() {
  const { HandleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toastId = useRef(null);

  const loginProgress = () => toastId.current = toast.loading("Fazendo Login", {...toastifyConfig, autoClose: false });
  
  async function login() {
    if (email === "") return toast.warn("📧 Digite seu email!", toastifyConfig);

    if (password === "")
      return toast("🔑 Digite sua senha!", {...toastifyConfig,isLoading: true});
    loginProgress()

    const loginResponse =  await HandleLogin({
        email: email,
        password: password,
      })

    if(loginResponse.success === false){
     return toast.update(toastId.current, { render: loginResponse.message,type: toast.TYPE.ERROR, autoClose: 5000,  isLoading: false });
    }


    if(loginResponse.success === true){
      toast.update(toastId.current, {render: "Logado", type: toast.TYPE.SUCCESS, autoClose: 500,  isLoading: false});
      navigate('/listas')
    }
  }

  return (
    <div className="homeContainer">
      <div>
        <h1>Listinhas</h1>
        <img src={illustation} className="HomeIllustration" />
        <p
          className="LoginLabel"
          style={{ marginLeft: "0", marginTop: "1rem" }}
        >
          Nunca mais esqueça os itens das suas comprinhas do mercado
        </p>
      </div>

       
      <div className="loginCredencials"  onKeyDown={(e) => (e.key === "Enter" ? login() : null)} >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu Email"
          className="loginInput"
          type={"email"}
        />
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
              className="LoginShowPassowordIcon"
              size={18}
              color={"#30a4ab"}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiFillEye
              className="LoginShowPassowordIcon"
              size={18}
              color={"#30a4ab"}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </div>

      <div className="btnHome" onClick={login}>
        <h2>Entrar</h2>
      </div>

      <div onClick={() => navigate(`/reset-password`)}>
        <p
          className="LoginLabel"
          style={{ cursor: "pointer", marginLeft: "0", marginTop: "1rem" }}
        >
          Esqueci minha senha
        </p>
      </div>

      <div onClick={() => navigate(`/create-account`)}>
        <p
          className="LoginLabel"
          style={{ cursor: "pointer", marginLeft: "0", marginTop: "1rem" }}
        >
          Ainda não tem uma conta?
        </p>
      </div>
    </div>
  );
}
