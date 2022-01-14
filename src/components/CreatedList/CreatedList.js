import './CreatedList.styles.css'
import Bin from '../../assets/bin.png'
import { useNavigate } from "react-router-dom";


export default function CreatedList(props){
    const navigate = useNavigate();
    return(
        <div onClick={()=> navigate(`/lista/${props.id}`)} className='CreatedListContainer'>
            <h3 style={{width: '150px', textAlign: 'left'}}>{props.listname}</h3>
            {/* <h3>{props.listdate}</h3> */}
             {/* <h3>{props.listitens}</h3> */}
            <div className='bin'>
                <img src={Bin} alt='apagar'/>
            </div>
        </div>
    )
}