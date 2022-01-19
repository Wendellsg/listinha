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

        const Verify = (Categoria)=>{

            const ItensdaCategoria = itens.filter((item)=> item.category === Categoria.name)

            const ListacomitensdaCategoria = ()=>{
               return ItensdaCategoria.map((item)=>
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

            const Vaaaiplz = ()=>{
                if(ItensdaCategoria.length>0){
                  return  <div style={{marginBottom: '30px'}} key={Categoria.id}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                    <div className='CategoryImage' style={{ backgroundImage:`url(${Categoria.image})`}} alt={Categoria.name}></div>
                    <h1 className='Categoryheader'>{Categoria.name}</h1>  
                    </div>
                    <ListacomitensdaCategoria/>
                    </div>
                }else{
                return <div></div>
                }
        }
            

            
            
            
            return <Vaaaiplz/>
                
                   
                        
                    
                
                
                
          
            
        
           
                
        }

        
        return Categories.map((Category)=>
                
                <div key={Category.id}>
                    <Verify name={Category.name} id={Category.id} image={Category.image}/>
                </div>
                
          
            
        )
    }

    return(
        <div>
            
            <Categorylist/>
        </div>
    )
}














/* return<div style={{marginBottom: '30px'}} key={Category.id}>
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                        <div className='CategoryImage' style={{ backgroundImage:`url(${Category.image})`}} alt={Category.name}></div>
                        <h1 className='Categoryheader'>{Category.name}</h1>  
                        </div>                   
                            <Filtredlist Filtered={filtreditens}/>
                        </div>  */














 /* return filtred.map((item)=>              
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
                ) */