import "./Home.styles.css";
import { useState, useEffect, useRef } from "react";
import illustation from "../../assets/homeimage.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toastifyConfig } from "../../utils";
import { CreateGoogleUser } from "../../api/MarketListApi";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import Brand from "../../components/Brand";
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
  const { HandleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gapi, setGapi] = useState(null);
  const navigate = useNavigate();
  const toastId = useRef(null);

  const loginProgress = () =>
    (toastId.current = toast.loading("Fazendo Login", {
      ...toastifyConfig,
      autoClose: false,
    }));

  const responseGoogle = async (response) => {
    if (response.accessToken) {
      let googleUserPayload = {
        userToken: response.accessToken,
        name:
          response.profileObj.givenName + " " + response.profileObj.familyName,
        email: response.profileObj.email,
        image: response.profileObj.imageUrl,
        googleUser: true,
      };

      const createResponse = await CreateGoogleUser(googleUserPayload);

      if (createResponse.success) {
        localStorage.setItem("@ListinhaToken", createResponse?.token);
        toast.success(`Logado como ${response.profileObj.email}`, {
          ...toastifyConfig,
        });
        setTimeout(() => {
          navigate("/listas");
        }, 2000);
      } else {
        toast.error("Erro ao fazer login", {
          ...toastifyConfig,
        });
      }
    }
  };

  useEffect(() => {
    async function importGapi() {
      await import("gapi-script").then((pack) => setGapi(pack.gapi));
    }
    importGapi();
  }, []);

  useEffect(() => {
    if (!gapi) return;
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "profile email",
      });
    };
    gapi.load("client:auth2", initClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gapi]);

  async function login() {
    if (email === "") return toast.warn("📧 Digite seu email!", toastifyConfig);

    if (password === "")
      return toast.warn("🔑 Digite sua senha!", {
        ...toastifyConfig,
      });
    loginProgress();

    const loginResponse = await HandleLogin({
      email: email,
      password: password,
    });

    if (loginResponse.success === false) {
      return toast.update(toastId.current, {
        render: loginResponse.message,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
    }

    if (loginResponse.success === true) {
      toast.update(toastId.current, {
        render: "Logado",
        type: toast.TYPE.SUCCESS,
        autoClose: 500,
        isLoading: false,
      });
      navigate("/listas");
    }
  }

  return (
    <div className="homeContainer">
      <div>
        <Brand />
        <img src={illustation} className="HomeIllustration" alt="illustaton" />
        <p
          className="LoginLabel"
          style={{ marginLeft: "0", marginTop: "1rem" }}
        >
          Nunca mais esqueça os itens das suas comprinhas do mercado
        </p>
      </div>

      <div
        className="loginCredencials"
        onKeyDown={(e) => (e.key === "Enter" ? login() : null)}
      >
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
            type={showPassword ? "text" : "password"}
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
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <div className="LoginWithGoogle " onClick={renderProps.onClick}>
              <FcGoogle size={25} /> <div>Logar com o google</div>
            </div>
          )}
        />
      </div>

      <div onClick={() => navigate(`/reset-password`)}>
        <p
          className="LoginLabel"
          style={{
            cursor: "pointer",
            marginLeft: "0",
            marginTop: "1rem",
            fontSize: "12px",
          }}
        >
          Esqueci minha senha
        </p>
      </div>

      <div onClick={() => navigate(`/create-account`)}>
        <p
          className="LoginLabel"
          style={{
            cursor: "pointer",
            marginLeft: "0",
            marginTop: "0.3rem",
            fontSize: "12px",
          }}
        >
          Ainda não tem uma conta?
        </p>
      </div>
    </div>
  );
}
