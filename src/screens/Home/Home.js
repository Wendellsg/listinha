import { Link } from "react-router-dom";
export default function Home(){
    return <div>
        <h1>Home Page</h1>
        <Link to="/listas"><button>Listas</button></Link>
    </div>
}