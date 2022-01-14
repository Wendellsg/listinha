import Header from '../../components/header/header'
import NewList from "../../components/NewList/NewList";
import CreatedList from '../../components/CreatedList/CreatedList';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Lists(){

    const [listsData, setListsData] = useState([])
    const [update, setUpdate] = useState(0)
    const navigate = useNavigate();
    
    
    
    /* [
        {
        id: 1,
        Nome: 'Jantar Romantico',
        Data: '15/02/2021',
        Itens: '15'
        },
        {
            id: 1,
            Nome: 'Churras',
            Data: '03/01/2022',
            Itens: '18'
        },
        {
            id: 1,
            Nome: 'Compras do mês',
            Data: '05/03/2021',
            Itens: '36'
        },
    ] */
    const ListsCreateds = listsData.map((createdlist)=>
        <CreatedList onClick={()=> navigate(`/lista/${createdlist.id}`)} key={createdlist.index} listname={createdlist.name} listdate={createdlist.created} /* listitens={createdlist.Itens} *//>
    )

    function getLocalLists(){
      const listdata = localStorage.getItem('Listas')
    if(listdata!= null){
      setListsData(JSON.parse(listdata))}
      else{
        setListsData([])
      }
    }

    useEffect(()=>{
        getLocalLists()
    },[update])



    return <div className="ListsContainer">
        <Header name='Listinhas'/>
        <NewList setUpdate={setUpdate}/>
        <br/>
        <h2 className='subtitle'>Listinhas criadas</h2>
        <div>
            {ListsCreateds}
        </div>
    </div>
}