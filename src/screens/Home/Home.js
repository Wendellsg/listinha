import { Link } from "react-router-dom";
import './Home.styles.css'
export default function Home(){
    return <div className="homeContainer">
        <div>
            <h1>Listinhas</h1>
            <p>Nunca mais esqueça os itens das suas comprinhas do mercado</p>
        </div>

        <Link className="btnHome" to="/listas"><h2>Entrar</h2></Link>
    </div>
}