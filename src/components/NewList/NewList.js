import './newList.styles.css'
import { Link } from 'react-router-dom'
import Plus from '../../assets/plus.png'
import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'




export default function NewList(){

const [listName, setListName] = useState('')
const [lists, setLists] = useState('')

function SaveLocalList(listname, List){
    return localStorage.setItem(listname, JSON.stringify(List))
}

function getLocalLists(){
   const localLists =  localStorage.getItem('Listas')
   setLists(JSON.parse(localLists))
}

function SaveListofList(newListofList){
    return localStorage.setItem('Listas', newListofList)
}

function handleCreateList(){

    const Lista = {
        id: parseInt(Date.now()*5/350),
        name: listName,
        created:  Date(),
        itens: [],
    }

    let newListofList = [...lists, Lista.id]

    SaveListofList(newListofList)
    SaveLocalList(Lista.id, Lista)
}

useEffect(()=>{
    getLocalLists()
},[])

    return(
        <div className='NewListContainer'>
            <div className='newListForm'>
                <h2>
                    Criar nova listinha
                </h2>
                <input value={listName} onChange={(e)=>setListName(e.target.value)} placeholder='Nome da listinha' className='NewlistInput' type='text'/>
            </div>
            <Link onClick={()=>handleCreateList()} to="#">
            <div className='Newlistplusicon'>
                <img src={Plus} alt="adicionar"/>
            </div>
            </Link>
            
        </div>
    )
}