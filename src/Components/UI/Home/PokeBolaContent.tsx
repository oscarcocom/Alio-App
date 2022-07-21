import React,{FC} from "react";
import { SpritesSugge } from "../../../Interfaces";
import { PokeSlide } from "./PokeSlide";
import pokebolaImg from '../../../IMG/Pokebola.png'
import pokebolaImgOpen from '../../../IMG/PokebolaOpen.png'

interface props {
  data: [object] | null ;
  Pokebola: any;
  PokebolaOpen: any;
}

export const PokeBolaContent:FC<props> = (
  {data,
  Pokebola,
  PokebolaOpen}
) => {
  return (
    <>
      {
      !!data?.length ? (
        data.map((pokemonDetail: any, index) => {
          const { img, name, type, id } = pokemonDetail as {
            img: SpritesSugge;
            name: string;
            type: [{ slot: number; type: { name: string; url: string } }];
            id: number;
          };

         return( 
         <>
            <img
              
              ref={PokebolaOpen}
              src={pokebolaImgOpen}
              alt="PokebolaOpen"
              className="PokebolaOpen"
            />
            <PokeSlide key={index} img={img} id={id} name={name} type={type}  />
          </>
           )
         }
       )
    ) : (
        <img
          ref={Pokebola}
          src={pokebolaImg}
          alt="Pokebola"
          className="pokebolaClose"
        />
      )}
    </>
  );
};
