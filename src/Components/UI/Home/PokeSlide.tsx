import React, { FC } from "react";
import { Carousel } from "react-bootstrap";
import { SpritesSugge } from "../../../Interfaces/pokemon-Api-Sugge";

type typeProp = [{slot:number, type:{name:string,url:string}}];
interface Props {
  img:SpritesSugge;
  name: string;
  id: number;
  type: typeProp;
  
}
export const PokeSlide: FC<Props> = ({img,type,name,id}) => {
  return (
  
  
      <Carousel key={id}  className="CarouselPoke" interval={1500} pause="hover">
      <Carousel.Item className=" pt-5 mt-5">
        <img
          className="imgPoke d-block w-100"
          src={img.front_default}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5 className="namePoke" style={{ color: "white", fontWeight: "900" }}>
            {name.toUpperCase()}
          </h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className=" pt-5 mt-5">
        <img
          className="imgPoke d-block w-100"
          src={img.back_default}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5  className="namePoke"  style={{ color: "white", fontWeight: "900" }}>
            POKEMON ID: {id}
          </h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className=" pt-5 mt-5">
        <img
          className="imgPoke d-block w-100 pokemonImg"
          src={img.front_shiny}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5  className="namePoke"  style={{ color: "white", fontWeight: "900" }}>
            SLOT: #{type.map((rs) => rs.slot)}
          </h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className=" pt-5 mt-5">
        <img className="imgPoke d-block w-100" src={img.back_shiny} alt="Third slide" />
        <Carousel.Caption>
          <h5  className="namePoke"  style={{ color: "white", fontWeight: "900" }}>
            TIPO DE POKEMON: {type.map((rs) => rs.type.name.toUpperCase())}
          </h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
 
    
  
  );
};
