import {useState, useEffect} from 'react'
import Header from "../../components/header/header";
import Plus from '../../assets/plus.png'
import './List.styles.css'


export default function List(){

    const [itemName, setItemName] = useState('')
    const [itemQuantity, setItemQuantity] = useState(0)
    const [itemCategory, setItemCategory] = useState('Limpenza')
    const [itemMessury, setItemMessury] = useState('Unidade(s)')

    const [itens, setItens] = useState([])


  
      const SaveItemList = async(Lista)=>{
          return localStorage.setItem("Lista", JSON.stringify(Lista))
      }
  
      function AdicionarItem(){
          
          const newitem =   {   
              itemId: parseInt(Date.now()*98/5000),
              itemName: itemName,
              quantity: `${itemQuantity} ${itemMessury}`,
              buyed: false,
              category: itemCategory,
  
  
          }
  
          let newList = [...itens, newitem]
          setItens(newList)
  
          SaveItemList(itens)
  
        }
          
      
  


    const [ItemList, setItemList] = useState([{}])


    const Lista = {
        id: 2,
        name: 'Churras',
        itens: ItemList,
    }

    const listinha = ItemList.map((item)=>
    <div key={item.itemId} style={{display: 'flex'}}>
        <h1>{item.itemName}</h1>
        <h1>{item.quantity}</h1>
        <h1>{item.category}</h1>
    </div>
    )


    return(
            <div>
                <Header name={Lista.name}/>
                <div className='NewItemContainer'>
                <div className='NewItemForm'>
                  <div  style={{flexDirection: 'column', marginRight: '20px'}}>
                      <div>
                          <h2>
                              Nome do item
                          </h2>
                          <input value={itemName} onChange={(e)=>setItemName(e.target.value)} style={{width: '120px'}} placeholder='Nome do item' className='NewItemInput' type='text'/>   
                      </div>
                      <div style={{marginTop: '10px'}}>
                          <h2>
                              Quantidade
                          </h2>
                          <input value={itemQuantity} onChange={(e)=>setItemQuantity(e.target.value)} placeholder='3' className='NewItemInput' type='number'/>   
                      </div>
                  </div>
                  <div  style={{flexDirection: 'column'}}>
                      <div>
                          <h2>
                          Categoria
                          </h2>
                          <select value={itemCategory} onChange={(e)=>setItemCategory(e.target.value)} className='NewItemSelect'>
                              <option className='NewItemSelect' value='Limpeza'>Limpeza</option>
                              <option value='Carnes'>Carnes</option>
                              <option value='Higiênie'>Higiênie</option>
                          </select> 
                      </div>
                      <div style={{marginTop: '10px'}}>
                          <h2>
                          Medida
                          </h2>
                          <select value={itemMessury} onChange={(e)=>setItemMessury(e.target.value)} className='NewItemSelect'>
                              <option value='Unidade(s)'>Unidade(s)</option>
                              <option value='Kg(s)'>Kg(s)</option>
                              <option value='Pacote(s)'>Pacote(s)</option>
                          </select>  
                      </div>
                  </div>
                  
                  
                 
              </div>
              <div onClick={()=>AdicionarItem()} className='NewItemplusicon'>
                  <img src={Plus} alt="adicionar"/>
              </div>            
          </div>
        
       
    </div>)
}