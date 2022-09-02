import { useSugestions } from "../../hooks/useSugestions";
import './SugestionsList.Styles.css'
export default function SugestionsList({search, selectSugestion}) {
  const {sugestions} = useSugestions(search);
if(sugestions?.length){
    return (
        <div className="SugestionsContainer">
          <ul>{ sugestions.map(sugestion => <li onClick={()=> selectSugestion(sugestion.name, sugestion.category)} className="SugestionItem">{sugestion.name}</li>)}</ul>
        </div>
      );
}else{
    return null
}
  
}
