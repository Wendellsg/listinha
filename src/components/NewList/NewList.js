import './newList.styles.css'
import Plus from '../../assets/plus.png'
import { useState, useEffect } from 'react'
import {createList} from '../../api/MarketListApi'

export default function NewList({setUpdate}){


const [listName, setListName] = useState('')
const [lists, setLists] = useState([])


function getLocalList(){
    const localLists =  localStorage.getItem('Listas')
    if(localLists!=null){
        setLists(JSON.parse(localLists))
    }else{
        setLists([])
    }
}



function handleCreateList(){
    const Lista = {
        name: listName,
        ownerId: '1'
    }
    createList(Lista)
    setUpdate(Math.random())
}

const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
        handleCreateList()
    }
  }

useEffect(()=>{
    getLocalList()
},[])
    return(
        <div className='NewListContainer'>
            <div className='newListForm'>
                <h2>
                    Criar nova listinha
                </h2>
                <input onKeyPress={(e) => handleKeyPress(e)} value={listName} onChange={(e)=>setListName(e.target.value)} placeholder='Nome da listinha' className='NewlistInput' type='text'/>
            </div>
            <div onClick={()=>handleCreateList()}>
            <div className='Newlistplusicon'>
                <img src={Plus} alt="adicionar"/>
            </div>
            </div>
            
        </div>
    )
}