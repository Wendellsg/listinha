import "./ChangePassword.styles.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { sendChangePassword } from "../../api/MarketListApi";
import { toast } from "react-toastify";
import { toastifyConfig } from "../../utils";
import ChangePassWordIllustration from '../../assets/change-password.jpg'
import Brand from "../../components/Brand";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const navigate = useNavigate();
  const toastId = useRef(null);

  var pattern = /^[\w&.-]+$/;

  useEffect(() => {
    const urlSerch = new URLSearchParams(window.location.search);
    const token = urlSerch.get("token");
    const email = urlSerch.get("email");
    setResetPasswordToken(token);
    setResetPasswordEmail(email);
  }, []);

  const changeIngPassword = () =>
    (toastId.current = toast.loading("Enviando 🔑", {
      ...toastifyConfig,
      autoClose: false,
    }));

  async function handleChanePassWord() {
    if (password !== passwordVerify)
      return toast.warn(
        "Verifique se digitou a senhas corretamente",
        toastifyConfig
      );
    if (password.length < 8 || pattern.test(password))
      return toast.warn(
        "Senha fraca. Precisa ter pelo menos 8 caracteres e algum caracter especial. ex: !@#$%¨&*()_+",
        toastifyConfig
      );
    let changePasswordPayload = {
      email: resetPasswordEmail,
      token: resetPasswordToken,
      newPassword: password,
    };

    changeIngPassword();
    const response = await sendChangePassword(changePasswordPayload);

    if (!response.success) {
      return toast.update(toastId.current, {
        render: response.message,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
    }
    toast.update(toastId.current, {
      render: "Senha alterada com sucesso",
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
      isLoading: false,
    });
    navigate("/");
  }

  return (
    <div className="homeContainer">
       <Brand/>
      <img src={ChangePassWordIllustration}alt='' style={{height: '300px'}}/>
      <div>
        <h1  style={{ fontSize: "18px" }}>Crie uma senha nova</h1>
      </div>

      <div
        className="loginCredencials"
        onKeyDown={(e) => (e.key === "Enter" ? handleChanePassWord() : null)}
      >
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
        <h2>Criar</h2>
      </div>
    </div>
  );
}
