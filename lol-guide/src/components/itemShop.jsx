import { useState,useEffect } from 'react';
import Popup from './ItemShopPopUp';
import './styles/itemShop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


let checkBoxesArr = {
  "Damage":false,
  "CriticalStrike":false,
  "AttackSpeed":false,
  "OnHit":false,
  "ArmorPenetration":false,
  "SpellDamage":false,
  "ManaRegen":false,
  "MagicPenetration":false,
  "Health":false,
  "Armor":false,
  "SpellBlock":false,
  "AbilityHaste":false,
  "NonbootsMovement":false,
  "LifeSteal":false}


export default function ItemShop(){
    const [itemsData,setItemsData] = useState({})
    const [loading,setLoading] = useState(true)
    const [item,setItem] = useState(3165)
    const [search,setSearch] = useState("")
    const [checkBoxes,setCheckBoxes] = useState(checkBoxesArr)
    const [arrHolder,setArrHolder] = useState([])
    const [click,setClicked] = useState(true)
    const [filteredItems,setFilteredItems] = useState(itemsData)
    const [swich,setSwich] = useState(true)
    const Params = [{name:"Attack Damage",fetchedName:"Damage"},{name:"Critical Strike",fetchedName:"CriticalStrike"},{name: "Attack Speed",fetchedName:"AttackSpeed"},{name:"On-Hit Effect",fetchedName:"OnHit"},
    {name:"Armor Penetration",fetchedName:"ArmorPenetration"},{name:"Ability Power",fetchedName:"SpellDamage"},{name:"Mana & Regeneration",fetchedName:"ManaRegen"},{name:"Magic Penetration",fetchedName:"MagicPenetration"},
    {name:"Health & Regeneration",fetchedName:"Health"}, {name:"Armor",fetchedName:"Armor"},{name:"Magic Resists",fetchedName:"SpellBlock"},{name:"Ability Haste",fetchedName:"AbilityHaste"},{name:"Movment",fetchedName:"NonbootsMovement"},{name:"Life Steal & Vamp",fetchedName:"LifeSteal"}]
    

 
    useEffect(()=>{
      fetch('http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/item.json')
      .then(res =>(res.json()))
      .then(res =>{setItemsData(res.data)
        setFilteredItems(res.data)
      })
      .then(setLoading(false))
      
    },[])
    
    function showItem(item){
      setItem(item)
      document.querySelector('.itemPopup').classList.remove('invisible')
    }
  useEffect(()=>{
    filterItems();
  },[click])

  function clicked(){
    if(click===true){
      setClicked(false)
    }else{
      setClicked(true)
    }
  }
    function filterItems(param,e){
      if(e===true){
        let checks = checkBoxes
        checks[param] = true
        setCheckBoxes(checks)
      }else{
        let checks = checkBoxes
        checks[param] = false
        setCheckBoxes(checks)
      }
      setFilteredItems(itemsData)
      let arrayOfTrue = []
      let anyTrue = false

      Object.values(checkBoxes).forEach((key,index)=>{
        
        if(key===true){
          arrayOfTrue.push(Object.keys(checkBoxes)[index])
          anyTrue = true
          setFilteredItems({})
        }
      })

      if(anyTrue){
        let x = []
        Object.keys(itemsData).forEach(key => x.push(key))

        for(let i = 0; i < arrayOfTrue.length; i++){ 
        x = x.filter(num =>{                 
              if(itemsData[num].tags.some(val=>val===arrayOfTrue[i])){
                return num
              }        
          }
        )}
        let arr ={}
        x.forEach((x)=>{arr[x] = itemsData[x]})

        setFilteredItems(arr)
      
      }else{
        
      }
    }

    function toggleItemsFilter(){
      if(swich===false){
        setSwich(true)
        document.querySelector('.itemFilters').classList.add('invisible')
      }else{
        setSwich(false)
        document.querySelector('.itemFilters').classList.remove('invisible')
      }
    }
    return(<>
     <div className="BGShop">
         <div className="itemShop">
          <div className='itemNav'>
              <input onChange={(e)=>setSearch(e.target.value)} value={search} className='searchField' placeholder='Search'></input>
              <button onClick={()=>toggleItemsFilter()}><FontAwesomeIcon icon={faBars} className="Circle"/> Filters</button>

          </div>
          <div className='Items'>
              {loading?(
                <p>Loading....</p>
              ):(
                <div className='ItemsDisplayed'>
                  {Object.keys(filteredItems).filter((item)=>
                  filteredItems[item].name.toLowerCase().includes(search.toLowerCase())&&filteredItems[item].gold.base>0&&filteredItems[item].maps[11]===true).map((item,index)=>(
                    <div key={item} id={item} onClick={()=>showItem(item)} className='singleItem'>
                      <img src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/item/${filteredItems[item].image.full}`} alt="item"/>
                      <div className="itemPrice">
                        {filteredItems[item].gold.total}
                      </div>
                    </div>
                  ))}
         
                </div>
         
              )}
          </div>
          {loading?(<p>Loading</p>):(<Popup itemID={item} setItem={setItem}/>)}
            </div>
             <div className='itemFilters invisible'>

              {Params.map((param)=>(
                <div key={param.name} onClick={()=>clicked()} className='dropdownmenu'>
                    <input type="checkbox" id={param.name} onChange={(e)=>filterItems(param.fetchedName,e.target.checked)}/>
                    <label htmlFor={param.name}>
                        {param.name}
                    </label>
                </div>
              ))}

            </div>
     </div>

    </>)
}
