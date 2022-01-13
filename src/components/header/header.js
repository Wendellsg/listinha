import './header.styles.css';
import Logo from '../../assets/image1.png'

function Header() {
  return (
      <div className="header">
        <img src={Logo} alt="Listas" className="logo" />
        <h1>Listinha</h1>
      </div>
  );
}

export default Header;
