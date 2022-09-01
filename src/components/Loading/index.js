import "./Loading.Styles.css";
import { AiOutlineLoading } from "react-icons/ai";
export default function Loading() {
  return (
    <div className="LoadingContainer">
      <p className="LoadingMessage">Carregando</p> <AiOutlineLoading size={20} color="#47C8Ec" className="LoadingIcon" />
    </div>
  );
}
