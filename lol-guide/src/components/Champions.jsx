import { useState,useEffect } from "react"
import './styles/champions.css'
import ChampionsPopUp from "./ChampionsPopUp"
const Champions = () =>{

    const [champions,setChampions] = useState()
    const [loading,setLoading] = useState(true)
    const [currentChampion,setCurrentChampion] = useState("Aatrox")

    useEffect(()=>{
        fetch("http://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json")
        .then(res => (res.json()))
        .then(res => (setChampions(res.data)))
        .then(setTimeout(()=>{setLoading(false)},400))
    },[])

    function showSingleChampion(champId){
        setCurrentChampion(champId)
        document.querySelector('.darkAround').classList.remove('invisible')
    }
    return(<div className="ChampionsMain">
        {loading?(<p>Loading...</p>):(
            Object.keys(champions).map((champion)=>(                
                <div key={champions[champion].key} className="singleChampion" onClick={()=>showSingleChampion(champions[champion].id)}>
                    
                        <img src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${(champions[champion].id)}.png`} alt="champion"/>
                        <p>{champions[champion].name}</p>
                    
                </div>
            ))
        )}
        <ChampionsPopUp crrChamp={currentChampion} champSet={currentChampion}/>
    </div>)
}

export default Champions