import Header from '../../components/header/header'
import NewList from "../../components/NewList/NewList";
import CreatedList from '../../components/CreatedList/CreatedList';
import { useEffect, useState } from 'react';


export default function Lists(){

    const [listsData, setListsData] = useState([])
    const [update, setUpdate] = useState(0)


    const ListsCreateds = listsData.map((createdlist)=>
        <CreatedList  key={createdlist.id} listname={createdlist.name} listdate={createdlist.created} id={createdlist.id}/* listitens={createdlist.Itens} *//>
    )

    function getLocalLists(){
      const listdata = localStorage.getItem('Listas')
    if(listdata!= null || undefined){
      setListsData(JSON.parse(listdata))}
      else{
        setListsData([])
      }
    }

    useEffect(()=>{
        getLocalLists()
    },[update])

    const Verification = ()=>{
      if(listsData!== undefined)
      {
        return ListsCreateds
      
      }else{
        return <h2 className='subtitle'>Você ainda não criou nenhuma lista</h2>
      }
    }

    return <div className="ListsContainer">
        <Header name='Listinhas'/>
        <NewList setUpdate={setUpdate}/>
        <br/>
        <h2 className='subtitle'>Listinhas criadas</h2>
        <div>
            {Verification()}
        </div>
    </div>
}