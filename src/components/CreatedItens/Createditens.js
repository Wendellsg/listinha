import './Createditens.styles.css'
import DeleteIcon from '../../assets/deleteicon.png'
import CheckIcon from '../../assets/check.png'
import Carrinho from '../../assets/carrinho.png'

export default function CreatedItens(props){

    const itens = props.itens

    function TextDecoration(buyed){
        if(buyed){
            return {textDecorationLine: 'line-through', color: "#888"}
        }else{
            return {}
        }
    }



    const ItemList = ()=>{
        if(itens.length>=1){
            return itens.map((item)=>
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
            )}else{
               return <h2>Adicione algum item</h2>
            }
    }
    return(
        <div>
            <ItemList/>
        </div>
    )
}