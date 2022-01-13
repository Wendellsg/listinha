import './newList.styles.css'
import { Link } from 'react-router-dom'
import Plus from '../../assets/plus.png'

export default function NewList(){
    return(
        <div className='NewListContainer'>
            <div className='newListForm'>
                <h2>
                    Criar nova listinha
                </h2>
                <input placeholder='Nome da listinha' className='NewlistInput' type={Plus}/>
            </div>
            <Link to="/lista">
            <div className='Newlistplusicon'>
                <img src={Plus} alt="adicionar"/>
            </div>
            </Link>
            
        </div>
    )
}