import "./header.styles.css";
import Logo from "../../assets/image1.png";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../ProfileMenu";
function Header(props) {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="Row">
        <img
          src={Logo}
          alt="Listas"
          className="logo"
          onClick={() => navigate("/listas")}
        />
        <h1>{props.name}</h1>
      </div>
      <ProfileMenu />
    </div>
  );
}

export default Header;
