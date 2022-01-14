import './CreatedList.styles.css'
import Bin from '../../assets/bin.png'


export default function CreatedList(props){
    return(
        <div className='CreatedListContainer'>
            <h3 style={{width: '150px', textAlign: 'left'}}>{props.listname}</h3>
            {/* <h3>{props.listdate}</h3> */}
             {/* <h3>{props.listitens}</h3> */}
            <div className='bin'>
                <img src={Bin} alt='apagar'/>
            </div>
        </div>
    )
}