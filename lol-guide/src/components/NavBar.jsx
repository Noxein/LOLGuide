import { Link } from 'react-router-dom';
import './styles/nav.css';

const NavBar = () => {
    return(<>
        <nav>
            <Link to='../itemShop'>
                <div>
                    Items
                </div>
             </Link>
             <Link to='../champions'>
                <div>
                    Champions
                </div>
             </Link>
             <Link to='../itemShop'>
                <div>
                    Map
                </div>
             </Link>
        </nav>
    </>)
}
export default  NavBar