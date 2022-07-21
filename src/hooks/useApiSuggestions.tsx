
import { useState, useEffect } from 'react';
import pokeApi from '../Api/getApi';
import { TopLevelSugge } from '../Interfaces/pokemon-Api-Sugge';

type Initial = any[]

export const useApiSuggestions = <T extends Object >(Object:T) => {
const [pokeSuggestion, setPokeSuggestion]=useState<Initial>([])

useEffect(() => {
 const sugesstionsTemp:any[]= [];    
 const  promises = new Array(150).fill(undefined).map((position,index)=>pokeApi.get<TopLevelSugge>(`pokemon-form/${index+1}`));

 
 Promise.all(promises).then(currentArray=>{
     return currentArray.map((vals)=>(sugesstionsTemp.push({name:vals.data.name, img:vals.data.sprites}))
     )
 })

 setPokeSuggestion(sugesstionsTemp)

}, [])

return { pokeSuggestion }

}
