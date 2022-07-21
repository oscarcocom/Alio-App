import React,{FC} from "react";
import { SpritesSugge } from "../../../Interfaces";
import { PokeSlide } from "./PokeSlide";

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
        data.map((pokemonDetail: any) => {
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
              src="./PokeImg/PokebolaOpen.png"
              alt="PokebolaOpen"
              className="PokebolaOpen"
            />
            <PokeSlide img={img} id={id} name={name} type={type} />
          </>
           )
         }
       )
    ) : (
        <img
          ref={Pokebola}
          src="./PokeImg/Pokebola.png"
          alt="Pokebola"
          className="pokebolaClose"
        />
      )}
    </>
  );
};
