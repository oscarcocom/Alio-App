import { useState, useEffect } from "react";
import pokeApi from "../Api/getApi";
import { TopLevel, Sprites } from "../Interfaces/pokemon-Api";

interface dataPokemons {
  loading: Boolean;
  dataApi: [];
}

export const useApi = <T extends String>(input: T) => {
  const [{ dataApi, loading }, setdataPokemons] = useState<dataPokemons>({
    loading: false,
    dataApi: [],
  });

  const PokemonGet = async () => {
    const { data } = await pokeApi.get<TopLevel>(`${input}`);

  return ({
          img: data.sprites,
          name: data.name,
          type: data.types,
          id: data.id,
        })
     
  };

  //   useEffect(() => {

  //     console.log("ESTOY AQUI")
  //     setdataPokemons({
  //         data:null,
  //         loading: true
  //       });

  //       const res = async() => {
  //         const res = await pokeApi.get<TopLevel>(`${text}`).catch(function(error){
  //          console.warn(error)
  //          return null || Object;
  //         })
  //         console.log(res)
  //         console.log(!!Object.entries(res))
  //           if (!Object.entries(res)) {
  //       return  setdataPokemons({
  //           loading: false,
  //           data: res
  //         })

  //       } else {
  //         return setdataPokemons({
  //           loading: false,
  //           data: null,
  //         });

  //       }

  //     }

  //     res();
  //   }, [text]);

  return { PokemonGet, dataApi, loading };
};
