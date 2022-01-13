import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './screens/Home/Home'
import Lists from './screens/Lists/Lists'
import List from './screens/List/List'

// import your route components too
export default function Router(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/listas" element={<Lists />}/>
            <Route path="/lista" element={<List />} />
        </Routes>
    </BrowserRouter>
)
}
