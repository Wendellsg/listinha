import Header from '../../components/header/header'
import NewList from "../../components/NewList/NewList";
import CreatedList from '../../components/CreatedList/CreatedList';
export default function Lists(){
    const ListsData = [
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
    ]
    const ListsCreateds = ListsData.map((createdlist)=>
        <CreatedList listname={createdlist.Nome} listdate={createdlist.Data} listitens={createdlist.Itens}/>
    )


    return <div className="ListsContainer">
        <Header name='Listinhas'/>
        <NewList/>
        <br/>
        <h2 className='subtitle'>Listinhas criadas</h2>
        <div>
            {ListsCreateds}
        </div>
    </div>
}