import './Brand.Styles.css'
import Logo from '../../assets/image1.png'
import { useNavigate } from 'react-router-dom'
export default function Brand(){
    const navigate = useNavigate()

    return(
       <div onClick={()=> navigate('/')} className='BrandContainer'><img src={Logo} alt=''/> <span>Lista SemFirula</span></div>
    )
}