const ChampionsTags = ({array,filterChampSetter,chams}) =>{

    function CheckChampionFilters(x,y){
        if(array[x][y]===true){
            array[x][y]=false
        }else{
            array[x][y]=true
        }
        FilterChampions()
    }
    function FilterChampions(){
        let arrayOfTrue = []
        array.forEach(item=>{
            if(Object.values(item)[0]===true){
                arrayOfTrue.push(Object.keys(item)[0])
            }      
        })
        console.log(arrayOfTrue)
        let champse = Object.keys(chams)
        if(arrayOfTrue.length>0){
            for(let i = 0 ; i<arrayOfTrue.length;i++){
                champse = champse.filter((name)=>(chams[name].tags.includes(arrayOfTrue[i])))
            }
            let newChamps = {}
            champse.forEach(item=>{
                newChamps[item] = chams[item]
            })
            filterChampSetter(newChamps)
        }
        else{
            filterChampSetter(chams)
        }
    }
    return(
        <div className="championFilters">
            {array.map((item,index)=>(
                <div key={index}>
                    <input type="checkbox" id={`${Object.keys(item)}`} onChange={()=>CheckChampionFilters(index,Object.keys(item))}/>
                    <label htmlFor={`${Object.keys(item)}`}>{Object.keys(item)}</label>
                </div>
            ))}
        </div>
    )
}

export default ChampionsTags