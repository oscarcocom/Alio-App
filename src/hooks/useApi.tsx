import { useState } from "react";
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
    const { data } = await pokeApi.get<TopLevel>(`pokemon/${input}`);

  return ({
          img: data.sprites,
          name: data.name,
          type: data.types,
          id: data.id,
        })
     
  };

 
  
  return { PokemonGet, dataApi, loading };
};
