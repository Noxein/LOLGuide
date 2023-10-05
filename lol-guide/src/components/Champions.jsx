import { useState,useEffect } from "react"
import './styles/champions.css'
import ChampionsPopUp from "./ChampionsPopUp"
import ChampionsTags from "./championsTags"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import FilterMenu from "./filtermenu"

let championTypes = [{"Fighter":false},{"Tank":false},{"Mage":false},{"Assassin":false},{"Marksman":false},{"Support":false}]

const Champions = () =>{

    const [champions,setChampions] = useState({})
    const [filteredChampions,setFilteredChampions] = useState({})
    const [loading,setLoading] = useState(true)
    const [currentChampion,setCurrentChampion] = useState("Aatrox")
    const [search,setSeatch] = useState("")
    const [swich,setSwtich] = useState(false)

    useEffect(()=>{
        fetch("http://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json")
        .then(res => (res.json()))
        .then((res) => {setChampions(res.data);
            setFilteredChampions(res.data);
        })
        .then(setTimeout(()=>{setLoading(false)},400))
    },[])

    function showSingleChampion(champId){
        setCurrentChampion(champId)
        document.querySelector('.darkAround').classList.remove('invisible')
    }

    function toggleFilter(){
        if(swich===false){
            setSwtich(true)
            document.querySelector('.ChampsFilterMenu').classList.remove('invisible')
        }else{
            setSwtich(false)
            document.querySelector('.ChampsFilterMenu').classList.add('invisible')
        }
    }
    return(<div className="ChampionsMain">
        <div className="searchField">
            <input type="text" placeholder="Search Champion" onChange={(e)=>setSeatch((e.target.value).toLowerCase())}/>
            <button onClick={()=>toggleFilter()}><FontAwesomeIcon icon={faBars} className="Circle"/> Filters</button>
        </div>
        {loading?(<p>Loading...</p>):(
            Object.keys(filteredChampions).filter((champion)=>(filteredChampions[champion].name.toLowerCase().includes(search.toLowerCase()))).map((champion)=>(                
                <div key={filteredChampions[champion].key} className="singleChampion" onClick={()=>showSingleChampion(filteredChampions[champion].id)}>
                    
                        <img src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${(filteredChampions[champion].id)}.png`} alt="champion"/>
                        <p>{champions[champion].name}</p>
                    
                </div>
            ))
        )}
        <ChampionsPopUp crrChamp={currentChampion} champSet={currentChampion} />
        <FilterMenu array={championTypes} filterChampSetter={setFilteredChampions} chams={champions}/>
    </div>)
}

export default Champions
