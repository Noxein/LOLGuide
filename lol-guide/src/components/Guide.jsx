import NavBar from "./NavBar"
import ItemShop from "./itemShop"
import { useParams } from 'react-router-dom';
import Champions from "./Champions";
import ErrorpPage from "./errorpage";

const Guide = () => {
    const { name } = useParams();
    return(<>
        <NavBar />
        {name==="itemShop"?(
            <ItemShop />
        ):name==="champions"?(
        <Champions />):(
            <ErrorpPage />
        )}
        
    </>)
}
export default Guide