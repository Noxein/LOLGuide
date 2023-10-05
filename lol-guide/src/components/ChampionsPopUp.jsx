import { useState,useEffect } from "react"
import './styles/champions.css'
import uuid from "react-uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faCoffee,faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core"


library.add( faCheckSquare, faCoffee,faCircle )

const ChampionsPopUp = ({crrChamp}) =>{

    const [champions,setChampions] = useState()
    const [loading,setLoading] = useState(true)
    const [currentChampion,setCurrentChampion] = useState("DrMundo")
    const [loadingSingleChampDataFetch,setLoadingSingleChampDataFetch] = useState(true)
    const [singleChampSkillInfo,setSingleChampSkillInfo] = useState("DrMundo")
    const [singleSkillInfo,setSingleSkillInfo] = useState([])
    const [singleSkillInfoLodaing,setSingleSkillInfoLoading] = useState(true)

    useEffect(()=>{
        fetch("http://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json")
        .then(res => (res.json()))
        .then(res => (setChampions(res.data)))
        .then(setTimeout(()=>{setLoading(false)},400))
        .then(setCurrentChampion(crrChamp))
        
    },[])

    useEffect(()=>{
        if(loading){
        }else{
            setCurrentChampion(crrChamp)
            setBackgroundImage()
        }  
    })

    useEffect(()=>{
        setLoadingSingleChampDataFetch(true)
        fetchSingleChampSkillInfo(crrChamp)
    },[currentChampion])

    function fetchSingleChampSkillInfo(name){
        fetch(`https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion/${name}.json`)
        .then(res => (res.json()))
        .then((res) => setSingleChampSkillInfo(res.data[name]))
        .then(setLoadingSingleChampDataFetch(false))
    }

    function setBackgroundImage(){
            document.querySelector('.ChampionsPopUp').style = `background-image: url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${(champions[currentChampion].image.full).slice(0,-4)}_0.jpg')`
    }
    function SkillImageClickHandler(item,id){
        setSingleSkillInfo(item)
        console.log(item)
        setSingleSkillInfoLoading(false)
    }
    function setPassive(x){
        setSingleSkillInfoLoading(true)
        setSingleSkillInfo(x)
    }
    return(
    <div className="darkAround invisible">
        <div className="ChampionsPopUp">
            {loading?(<p>Loading...</p>):(
                <div className="darkenMe">
                    <div className="ChampionInfo">
                        <div className="Champion">
                            <p style={{fontWeight:"bold",fontSize:"2rem"}}>{champions[currentChampion].name}</p>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${(champions[currentChampion].id)}_0.jpg`} alt="champion" style={{width:"100%"}}/>
                            <p style={{fontSize:"1.125rem"}}>{champions[currentChampion].title}</p>
                        </div>

                        <div className="line"></div>
                        {loadingSingleChampDataFetch?(<p>Loading...</p>):(
                            <div className="ChampionSkills">   
                                    <div className="SkillsDisplay">
                                        <button onClick={()=>{console.log(singleSkillInfo)}}>Log Skill</button>
                                        <button onClick={()=>{console.log(singleChampSkillInfo)}}>Log Skills</button>
                                        <p className="Skillname">{singleSkillInfo.name}</p>
                                        <p className="SkillDescription">{singleSkillInfo.description}</p>
                                        <div className="SpellsLevels">
                                            {singleSkillInfoLodaing?(<p></p>):(
                                                singleSkillInfo.cooldown.map((cooldown,index)=>(
                                                    <div key={uuid()} className="skillCosts">
                                                        
                                                        <div className="skillpointsIcons">
                                                            {(()=>{
                                                                let level = []
                                                                for(let i=0;i<index+1;i++){
                                                                    level.push(<FontAwesomeIcon icon={faCircle} className="Circle" />)
                                                                }
                                                                for(let i=0;i<singleSkillInfo.cooldown.length-index-1;i++){
                                                                    level.push(<FontAwesomeIcon icon={faCircle} className="Circle2"/>)
                                                                }
                                                                return level
                                                            })()}
                                                        </div>
                                                        <img src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/${singleSkillInfo.image.full}`} alt="skill"/>
                                                        <p>{cooldown}</p>
                                                        <p>{singleSkillInfo.cost[index]}</p>
                                                    </div>
                                                ))
                                            )}

                                        </div>
                                    </div>
                                    <div className="SkillsClickable">
                                        <div>
                                            <img src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/passive/${singleChampSkillInfo.passive.image.full}` } alt="passive" onClick={()=>setPassive(singleChampSkillInfo.passive)}/>
                                        </div>
                                        {singleChampSkillInfo.spells.map((item)=>(
                                        <div key={item.id}>
                                            <img src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/${item.image.full}`} alt="skill" onClick={()=>SkillImageClickHandler(item)}/>
                                        </div>                                                             
                            ))}
                            </div>   
                            </div>
                        )}
                        </div>
                </div>
            )}
        
        </div>
        <div className="closePopUp" onClick={()=>{document.querySelector('.darkAround').classList.add('invisible')}}>VV</div>
    </div>)
}
export default ChampionsPopUp