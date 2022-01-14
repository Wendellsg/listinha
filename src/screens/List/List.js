import {useState, useEffect} from 'react'
import Header from "../../components/header/header";
import Plus from '../../assets/plus.png'
import './List.styles.css'
import DeleteIcon from '../../assets/deleteicon.png'
import CheckIcon from '../../assets/check.png'
import Categories from '../../data/categories';
import { useParams } from 'react-router-dom';


export default function List(){

    const [itemName, setItemName] = useState('')
    const [itemQuantity, setItemQuantity] = useState(0)
    const [itemCategory, setItemCategory] = useState('Limpenza')
    const [itemMessury, setItemMessury] = useState('Unidade(s)')
    const [itens, setItens] = useState([])
    const [update, setUpdate] = useState(0)
    const {id} = useParams()


  
      const StorageNewItem = (NewList)=>{
          return localStorage.setItem("Lista", JSON.stringify(NewList))
      }

      const getListStoraged = ()=>{
        const ListStorage = JSON.parse(localStorage.getItem("Lista"))
        return ListStorage
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
          StorageNewItem(newList)
        
        }

    function HandleAdditem(){
        AdicionarItem()
        setUpdate(Date.now)
    }    

          
      
  
    const Lista = {
        id: 2,
        name: 'Churras',
        itens: itens,
    }
    const CategorieOptions = Categories.map((category)=>
        <option key={Categories.index} value={category}>{category}</option>
    )

    const listinha = itens.map((item)=>
    <li key={item.index} className='ListItem'>
        <h1 className='ItemName'>{item.itemName}</h1>
        <h1 className='ItemQuantity'>{item.quantity}</h1>
        <div style={{display: 'flex'}}>
        <div className='ItemIcons'>
            <img src={DeleteIcon} alt='deletar'/>
        </div>
        <div className='ItemIcons'>
            <img src={CheckIcon} alt='comprado'/>
        </div>
        </div>
    </li>
    )

    useEffect(()=>{
        setItens(getListStoraged())
    },[update])
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
                              {CategorieOptions}
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
              <div onClick={()=>HandleAdditem()} className='NewItemplusicon'>
                  <img src={Plus} alt="adicionar"/>
              </div>            
                </div>
            <h1 style={{fontSize: '24px', margin: '15px'}}>Itens</h1>
            {listinha}
       
    </div>)
}