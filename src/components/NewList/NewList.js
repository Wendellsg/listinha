import './newList.styles.css'
import Plus from '../../assets/plus.png'
import { useState, useEffect } from 'react'

export default function NewList({setUpdate}){


const [listName, setListName] = useState('')
const [lists, setLists] = useState([])

function SaveLocalList(List){
    localStorage.setItem('Listas', JSON.stringify(List))
}

function getLocalList(){
    const localLists =  localStorage.getItem('Listas')
    if(localLists!=null){
        setLists(JSON.parse(localLists))
    }else{
        setLists([])
    }
}

const Lista = {
    id: parseInt(Date.now()*5/350),
    name: listName,
    created: new Date(),
    itens: [],
}

function handleCreateList(){
    
    getLocalList()

    

    let newList = [...lists, Lista]

    SaveLocalList(newList)
    console.log(newList)
    getLocalList()
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