import './App.css';
import { Link } from 'react-router-dom';
import ItemsBg from './assets/lol-Items-Bg.jpg'
import ChampionsBg from './assets/lol-ChampionsBg.jpg'
import Map from './assets/map.webp'


function setItemsWallpaper(){
  document.querySelector('body').style = "background-image: url('./ShopPageBg.png')"
}

function App() {
  return (
    <div className="App">
      <Link to='itemShop' onClick={()=>setItemsWallpaper()}>
        <img src={ItemsBg} alt='items'/>
      </Link>
      <Link to='champions'>
        <img src={ChampionsBg} alt='items'/>
      </Link>
      <Link to='guide'>
        <img src={Map} alt='items'/>
      </Link>
    </div>
  );
}

export default App;
