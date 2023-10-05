import { useEffect, useState } from 'react'
import './styles/popup.css'
export default function Popup({itemID,setItem}){
    const [itemsData,setItemsData] = useState({})
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        fetch('http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/item.json')
        .then(res =>(res.json()))
        .then(res =>setItemsData(res.data))
        .then(setTimeout(()=>{setLoading(false)},500))
    },[])
    function closePopup(){
        document.querySelector('.itemPopup').classList.add('invisible')
    }
    function extractSting(string){
        string = string.slice(string.indexOf("<stats>"),string.indexOf("</stats>"))
        string= string.replaceAll("<stats>","").replaceAll("attention>","b>")
        return string
    }
    function extractStingPassive(string){     
        string = string.replaceAll("<mainText>","").replaceAll("</mainText>","")
        if(string.includes("<li>")){
        string = string.slice(string.indexOf("<li>")+4,string.length-4)
        }
        string = string.replaceAll("passive>","b>").replaceAll("li>","br>").replaceAll("rarityMythic>","strong>").replaceAll('rarityLegendary>','i>').replaceAll('attention>','b>')
        
        return string
    }



    return(<div>
    {loading?(
        <p>Loading</p>
    ):(
        <div className="itemPopup invisible">
            <button onClick={()=>{closePopup()}} className='CloseButton'>X</button>
            <div className='BuildsInto'>
                {itemsData[itemID].into?(
                    itemsData[itemID].into.map((it)=>(
                        <div onClick={()=>setItem(it)} className='IntoSingle' key={it}>   
                            <img src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/item/${itemsData[it].image.full}`} alt="item" title={itemsData[it].name}/>
                        </div>
                    ))
                ):(<p>None</p>)}
            </div>
            <div className='Itemitself'>
                <div>
                    
                    <img src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/item/${itemsData[itemID].image.full}`} alt="item" />
                        <p className='itemName'>{itemsData[itemID].name}</p>
                        <p className='plainText'>{itemsData[itemID].plaintext}</p>
                        

                        <div className='StatsPassives'>
                            <p className='stats'>Stats <br/>
                            {loading?("Loading..."):(
                            setTimeout(()=>{ document.querySelector('.stats').innerHTML = "Stats <br> <br>" + extractSting(itemsData[itemID].description)},100)
                           )}
                            </p>
                            <p className='passives'>Passives <br/>
                            {loading?("Loading..."):(
                            setTimeout(()=>{ document.querySelector('.passives').innerHTML = "Passives <br> <br>" + extractStingPassive(itemsData[itemID].description)},100)
                           )}
                            
                            </p>
                        </div>
                    
                </div>
            </div>
            <div className='BuildsFrom'>
                {itemsData[itemID].from?(
                    itemsData[itemID].from.map((it)=>(
                        <div onClick={()=>setItem(it)} className='OtuofSingle' key={it}> 
                            <img src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/item/${itemsData[it].image.full}`} alt="item" title={itemsData[it].name}/>
                        </div>
                    ))
                ):(<p>None</p>)}  
            </div>
        </div>
    )}

    </div>)
}