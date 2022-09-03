import "./EmailConfirmationModal.styles.css";
import { sendEmailConfirmation } from "../../api/MarketListApi";
import { toastifyConfig } from "../../utils";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
export default function EmailConfirmationModal({ email }) {
  const [modalAnimation, setModalAnimation] = useState('swing-in-top-fwd')
  const [closeModal, setCloseModal] = useState(false)
  const toastId = useRef(null);

  const sendingEmail = () =>
    (toastId.current = toast.loading("Enviando email...", {
      ...toastifyConfig,
      autoClose: false,
    }));

  async function handleSendConfirmationEmail() {

    setModalAnimation('slide-out-bottom')


    setTimeout(() => {
      setCloseModal(true)
    }, 1000);
    

    sendingEmail();

    const sentResponse = await sendEmailConfirmation({ email });

    if (!sentResponse.success) {
      return toast.update(toastId.current, {
        render: sentResponse.message,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
    }

    toast.update(toastId.current, {
      render: sentResponse.message,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000,
      isLoading: false,
    });
  }

  return (
    <div className={`EmailConfirmationModalContainer ${modalAnimation}`} style={closeModal?{display: 'none'}:{}}>
      <div className="EmailConfirmationModalBox">
        <div>
          <p className="EmailConfirmationModalEmail">{email || ""}</p>
          <p className="EmailConfirmationModalMessage">
            Ainda não foi confirmado
          </p>
        </div>
        <div
          onClick={handleSendConfirmationEmail}
          className="EmailConfirmationModalButton"
        >
          Confirmar
        </div>
      </div>
    </div>
  );
}
