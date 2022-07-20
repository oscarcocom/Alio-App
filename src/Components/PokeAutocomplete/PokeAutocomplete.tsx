import { parse } from "path";
import { useEffect,useState,useMemo, FC } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useApiSuggestions } from "../../hooks/useApiSuggestions";
import { Pokemon } from '../../Interfaces/pokemon-Api-Sugge';

interface Props {
  FormInput: Object;
  setFormInput: (paramsPokeSearch: any) => void;
}
interface PropFormInput {
  input: string;
  loading: boolean;
  data?: [];
}
type ShowPokeList = boolean

export const PokeAutocomplete: FC<Props> = ({ FormInput, setFormInput }) => {
  const { input } = FormInput as PropFormInput;
  const { pokeSuggestion } = useApiSuggestions({});
  const [showPokeSugge, setshowPokeSugge] = useState<ShowPokeList>(true)
  

  useEffect(() => {
   setshowPokeSugge(true)
    return () => {
     setshowPokeSugge(false)
    }
  }, [])
  
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    if(!showPokeSugge)setshowPokeSugge(true);
    setFormInput({
      ...FormInput,
      input: e.currentTarget.value,
    });
  };

  const handleSelectPokeSugge = (pokemon:string)=>{
    setFormInput({...FormInput, input:pokemon})
    setshowPokeSugge(false)
  }

 

  const PokeColors: string[]= [
  "info",
  "success",
  "secondary",
  "danger",
  "light",
  "dark"
  
]

  return (
    <>
      <Form.Control
        id="input"
        type="search"
        placeholder="¿Qué pokemon deceas buscar?"
        className="me-2 FormCtrl"
        aria-label="¿Qué pokemon deceas buscar?"
        value={input}
        name="input"
        onChange={handleChange}
      />
      <div className="PokeSugge">
        <ListGroup>
          {
          showPokeSugge&&
          pokeSuggestion
            .filter(({ name }) => name.indexOf(input.toLowerCase()) > -1)
            .map((pokemon, index) =>{ 
              
          return(
              <ListGroup.Item 
              onClick={()=>handleSelectPokeSugge(pokemon.name)}
              className="ListItemSugge" action variant={`${PokeColors[index]}`}>
                {pokemon.name}
              </ListGroup.Item>
            )
          }
            )}
        </ListGroup>
      </div>
    </>
  );
};
