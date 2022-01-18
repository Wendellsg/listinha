import './CreatedList.styles.css'
import Bin from '../../assets/bin.png'
import { useNavigate } from "react-router-dom";


export default function CreatedList(props){


    const Quantity = props.listitens.itens.length
    const Plural = ()=> {
        if(Quantity<=1){
            return 'Item'
        }else{
            return 'Itens'
        }
    }


    const navigate = useNavigate();
    return(
        <div className='CreatedListContainer'> 
            <div onClick={()=> navigate(`/lista/${props.id}`)} className='listLinkContainer'>
            <h3  className='CreateListName'>{props.listname}</h3>
                 <h3 className='Listdate'>{props.listdate.substring(0,10)}</h3>
              <h3>{`${Quantity} ${Plural()}`}</h3> 
            </div>
            
            <div className='bin'>
                <img src={Bin} alt='apagar' onClick={()=>props.removefunction(props.id)}/>
            </div>
        </div>
    )
}