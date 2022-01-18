import './Createditens.styles.css'
import DeleteIcon from '../../assets/deleteicon.png'
import CheckIcon from '../../assets/check.png'
import Carrinho from '../../assets/carrinho.png'
import Categories from '../../data/categories'

export default function CreatedItens(props){

    const itens = props.itens

    function TextDecoration(buyed){
        if(buyed){
            return {textDecorationLine: 'line-through', color: "#888"}
        }else{
            return {}
        }
    }

    
    const Categorylist = ()=>{

        const Verify = (name)=>{
            
            const filtreditens = itens.filter(item => item.category === name.name)

            return filtreditens.map((item)=>              
            <li key={item.itemId} className='ListItem'>
                <h1 className='ItemName' style={TextDecoration(item.buyed)}>{item.itemName}</h1>
                <h1 className='ItemQuantity'style={TextDecoration(item.buyed)}>{item.quantity}</h1>
                <div style={item.buyed?({display: 'none'}):({display: 'flex'})}>
                    <div onClick={()=>props.HandleRemoveItem(item.itemId)} className='ItemIcons'>
                        <img src={DeleteIcon} alt='deletar' />
                    </div>
                    <div onClick={()=>props.HandleSetBuyedItem(item.itemId)} className='ItemIcons'>
                        <img src={CheckIcon} alt='comprado'/>
                    </div>
                </div>
                <div className='itembuyed' style={item.buyed?({display: 'flex'}):({display: 'none'})}>
                    <img src={Carrinho} alt='deletar' />
                    <p >No carrinho</p>
                    <div onClick={()=>props.HandleRemoveItem(item.itemId)} className='ItemIcons'>
                        <img src={DeleteIcon} alt='deletar' />
                    </div>
                </div>
            </li>               
            )
            
        }
        
        return Categories.map((Category)=>
        
        <div style={{marginBottom: '30px'}} key={Category.id}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
            <div className='CategoryImage' style={{ backgroundImage:`url(${Category.image})`}} alt={Category.name}></div>
            <h1 className='Categoryheader'>{Category.name}</h1>  
            </div>                   
            <Verify name={Category.name}/>
        </div> 
          
            
        )
    }

    return(
        <div>
            
            <Categorylist/>
        </div>
    )
}