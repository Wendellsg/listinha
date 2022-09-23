import "./ResetPassword.styles.css";
import { useState, useRef } from "react";
import { sendResetPassword } from "../../api/MarketListApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toastifyConfig } from "../../utils";
import Brand from "../../components/Brand";
import ResetPassWordIllustration from '../../assets/reset-password.jpg'
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [showSendedMessage, setShowSendedMessage] = useState(false);
  const toastId = useRef(null);

  const navigate = useNavigate()

  async function handleSendPassWordResetToken() {
    if (!email.includes("@"))
      return toast.error("📬 E-mail inválido", toastifyConfig);

    if (email === "")
      return toast.warn("Digite o e-mail que deseja redefinir", toastifyConfig);

    sendingEmail();
    const sendResponse = await sendResetPassword({
      email: email,
    });

    if (!sendResponse.success) {
      return toast.update(toastId.current, {
        render: sendResponse.message,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
    }

    setShowSendedMessage(true);

    toast.update(toastId.current, {
      render: "E-mail enviado com sucesso",
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
      isLoading: false,
    });
  }
  const sendingEmail = () =>
    (toastId.current = toast.loading("📨 Enviando", {
      ...toastifyConfig,
      autoClose: false,
    }));

  return (
    <div className="homeContainer">
      <Brand/>
      <img src={ResetPassWordIllustration}alt='' style={{height: '300px'}}/>
      <div>
        <h1 style={{ fontSize: "18px" }}>Redefinição de senha</h1>
        <p
          className="LoginLabel"
          style={{ marginLeft: "0", marginTop: "1rem", marginBottom: "2rem" }}
        >
          Informe o e-mail para enviarmos o link de redefinição de senha.
        </p>
      </div>

      <div className="loginCredencials">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu E-mail"
          className="loginInput"
          type={"email"}
          onKeyDown={(e) =>
            e.key === "Enter" ? handleSendPassWordResetToken() : null
          }
        />
      </div>

      {showSendedMessage && (
        <p
          className="LoginLabel"
          style={{ marginLeft: "0", marginTop: "2rem", marginBottom: "2rem" }}
        >
          E-mail enviado ✅. <br /> <br />
          Por favor verifique sua caixa de entrada, spam e lixeira."
        </p>
      )}

      {showSendedMessage ? (
        <div
          className="btnHome"
          onClick={() => {
            navigate('/');
          }}
        >
          <h2>Voltar</h2>
        </div>
      ) : (
        <div
          className="btnHome"
          onClick={() => {
            handleSendPassWordResetToken();
          }}
        >
          <h2>Enviar</h2>
        </div>
      )}
    </div>
  );
}
