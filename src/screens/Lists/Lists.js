import Header from '../../components/header/header'
import NewList from "../../components/NewList/NewList";
import CreatedList from '../../components/CreatedList/CreatedList';
import { useEffect, useState } from 'react';
import './Lists.styles.css'


export default function Lists(){

    const [listsData, setListsData] = useState([])
    const [update, setUpdate] = useState(0)




    function getLocalLists(){
      const listdata = localStorage.getItem('Listas')
    if(listdata!= null || undefined){
      setListsData(JSON.parse(listdata))}
      else{
        setListsData([])
      }
    }

    function SaveLocalList(){
      localStorage.setItem('Listas', JSON.stringify(listsData))
      const listupdate = localStorage.getItem('Listas')
      setListsData(JSON.parse(listupdate))
      setUpdate(Date.now)
  }

    const RemoveList = (listID)=>{
      //console.log('Vou remover a lista: ' + listID )
      const index = listsData.findIndex(list => list.id === parseInt(listID))
      let novoarray = listsData
      novoarray.splice(index,1);
      setListsData(novoarray)      
      SaveLocalList()
      
    }

    const ListsCreateds = listsData.map((createdlist)=>
    <CreatedList  key={createdlist.id} removefunction={RemoveList} listname={createdlist.name} listdate={createdlist.created} id={createdlist.id} listitens={createdlist}/>
)

    useEffect(()=>{
        getLocalLists()
    },[update])

    const Verification = ()=>{
      if(listsData.length>=1)
      {
        return ListsCreateds
      
      }else{
        return <h2 className='subtitle'>Você ainda não criou nenhuma lista</h2>
      }
    }

    return <div className="ListsContainer">
        <Header name='Listinhas'/>
        <NewList setUpdate={setUpdate} update={update}/>
        <br/>
        <h2 className='subtitle'>Listinhas criadas</h2>
        <div>
            {Verification()}
        </div>
    </div>
}