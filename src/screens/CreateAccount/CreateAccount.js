import "./CreateAccount.styles.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../api/MarketListApi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { toastifyConfig } from "../../utils";
export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toastId = useRef(null);

  var pattern = /^[\w&.-]+$/

  const CreatingProgress = () => toastId.current = toast.loading("Criando conta", {...toastifyConfig, autoClose: false });
  async function HandleCreate() {
    if (name === "" || email === "" || password === "") return toast.warn("Preencha todos os campos", toastifyConfig);
    if (!email.includes("@")) return toast.warn("E-mail inválido", toastifyConfig);
    if (password !== passwordVerify) return toast.warn("Verifique se digitou a senhas corretamente", toastifyConfig);
    if(password.length < 8 || pattern.test(password)) return toast.warn("Senha fraca. Precisa ter pelo menos 8 caracteres e algum caracter especial. ex: !@#$%¨&*()_+", toastifyConfig);
    let userPayload = {
      name: name,
      email: email,
      password: password,
    };
    CreatingProgress()

   const createAccountResponse = await CreateUser(userPayload);

   if(createAccountResponse.success === false){
    return toast.update(toastId.current, { render: createAccountResponse.message,type: toast.TYPE.ERROR, autoClose: 5000,  isLoading: false });
   }

   if(createAccountResponse.success === true){
    toast.update(toastId.current, {render: 'Conta criada com sucesso',type: toast.TYPE.SUCCESS, autoClose: 5000,  isLoading: false});
  }
    setEmail("");
    setPassword("");
    navigate("/"); 
  }

  return (
    <div className="CreateAccountContainer">
      <div style={{marginBottom: '2rem'}}>
        <h1>Crie sua conta</h1>
      </div>

      <div className="loginCredencials">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="loginInput"
          type={"text"}
        />
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
