import './newList.styles.css'
import { Link } from 'react-router-dom'
import Plus from '../../assets/plus.png'
import { useState } from 'react'




export default function NewList(){

const [listName, setListName] = useState('')
const [lists, setLists] = useState('')

function SaveLocalList(List){
    return localStorage.setItem('Listas', JSON.stringify(List))
}

function getLocalList(){
    const localLists =  localStorage.setItem('Listas')
    setLists(JSON.parse(localLists)) 
}

const Lista = {
    id: parseInt(Date.now()*5/350),
    name: listName,
    created:  Date(),
}

function handleCreateList(){
    
    getLocalList()

    

    let newList = [...lists, Lista]

    SaveLocalList(newList)
    console.log(newList)
}


    return(
        <div className='NewListContainer'>
            <div className='newListForm'>
                <h2>
                    Criar nova listinha
                </h2>
                <input value={listName} onChange={(e)=>setListName(e.target.value)} placeholder='Nome da listinha' className='NewlistInput' type='text'/>
            </div>
            <Link onClick={()=>handleCreateList()} to={`/lista/${Lista.id}`}>
            <div className='Newlistplusicon'>
                <img src={Plus} alt="adicionar"/>
            </div>
            </Link>
            
        </div>
    )
}