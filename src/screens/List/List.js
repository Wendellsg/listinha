import {useState, useEffect} from 'react'
import Header from "../../components/header/header";
import Plus from '../../assets/plus.png'
import './List.styles.css'
import Categories from '../../data/categories';
import CreatedItens from '../../components/CreatedItens/Createditens';



export default function List(){

    const inicialcategoty = 'Limpeza'

    const incialdata = {
        id: 0,
        name: 'Listinha',
        created: 'Today',
        itens: []
    }

    const inicialLists = [
        {id:'0000'},
        {id:'0000'}
    ]

    const [itemName, setItemName] = useState('')
    const [itemQuantity, setItemQuantity] = useState(0)
    const [itemCategory, setItemCategory] = useState(inicialcategoty)
    const [itemMessury, setItemMessury] = useState('Unidade(s)')
    const [update, setUpdate] = useState(0)
    const [listdata, setListsData] = useState(inicialLists)
    const [listIndex, setListIndex] = useState(0)
    const [listofPage, setListofPage] = useState(incialdata)


    

    useEffect(()=>{
        function getpagedata(){
            var url_atual = window.location.href;
            var pageid = /\/lista\/(\d+)/.exec(url_atual)    
            const storaged = localStorage.getItem('Listas')
            if(storaged!= null || undefined){
            const parsed = JSON.parse(storaged)
            setListsData(parsed)
            //console.log(parsed)
            const index = parsed.findIndex(list => list.id === parseInt(pageid[1]))
            //console.log(index)
            setListIndex(index)
            const pagelist = parsed[index]
            setListofPage(pagelist)
            }
            else{
              setListsData([])
            }
        }
        
        getpagedata()
      
             
    },[update])

      const StorageNewItem = async ()=>{
            const updateindex = listdata
            updateindex[listIndex] = listofPage
            localStorage.setItem("Listas", JSON.stringify(updateindex))
            setUpdate(Date.now)

      }
  
      function AdicionarItem(){
          
        const newitem =   {   
              itemId: parseInt(Date.now()*98/5000),
              itemName: itemName,
              quantity: `${itemQuantity} ${itemMessury}`,
              buyed: false,
              category: itemCategory,
  
  
          }
  
          let newList = [...listofPage.itens, newitem]

          listofPage.itens = newList

          StorageNewItem()
        
        }

    function HandleAdditem(){
        AdicionarItem()
        setUpdate(Date.now)
    }
    
    const HandleRemoveItem = (itemId)=>{
        const index = listofPage.itens.findIndex(item => item.itemId === parseInt(itemId))
        let novoarray = listofPage.itens
        novoarray.splice(index,1);

        listofPage.itens = novoarray

        StorageNewItem()
    }

    const HandleSetBuyedItem = (itemId)=>{
        console.log("Comprei o item: "+ itemId)
        const index = listofPage.itens.findIndex(item => item.itemId === parseInt(itemId))
        let novoarray = listofPage.itens
        novoarray[index].buyed = true
        listofPage.itens = novoarray

        StorageNewItem()
    }

          
    //
    const CategorieOptions = Categories.map((category)=>
        <option key={category.id} value={category.name}>{category.name}</option>
    )



 

    return(
            <div>
                <Header name={listofPage.name}/>
                <div className='NewItemContainer'>
                <div className='NewItemForm'>
                  <div  style={{flexDirection: 'column', marginRight: '20px'}}>
                      <div>
                          <h2>
                              Nome do item
                          </h2>
                          <input value={itemName} onChange={(e)=>setItemName(e.target.value)}  placeholder='Nome do item' className='NewItemInput NewItemNameinput' type='text'/>   
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
                              <option value='Litro(s)'>Litro(s)</option>
                              <option value='Metro(s)'>Metro(s)</option>
                          </select>  
                      </div>
                  </div>
                  
                  
                 
              </div>
              <div onClick={()=>HandleAdditem()} className='NewItemplusicon'>
                  <img src={Plus} alt="adicionar"/>
              </div>            
                </div>
            <h1 style={{fontSize: '24px', margin: '15px'}}>Itens</h1>
            <CreatedItens itens={listofPage.itens} HandleRemoveItem={HandleRemoveItem} HandleSetBuyedItem={HandleSetBuyedItem}/>
            
            
       
    </div>)
}