import ChampionsTags from "./championsTags"
const FilterMenu = ({array,filterChampSetter,chams}) =>{
    return(<div className="ChampsFilterMenu invisible">
        <ChampionsTags array={array} filterChampSetter={filterChampSetter} chams={chams}/>
    </div>)
}

export default FilterMenu