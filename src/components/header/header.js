import './header.styles.css';
import Logo from '../../assets/image1.png'
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  function handleLogout(){
    localStorage.removeItem('ListinhaToken')
    navigate('/')
  }


  return (
      <div className="header">
        <img src={Logo} alt="Listas" className="logo" />
        <h1>{props.name}</h1>
        <p className='LogoutButton' onClick={()=> handleLogout()}>Sair</p>
      </div>
  );
}

export default Header;
