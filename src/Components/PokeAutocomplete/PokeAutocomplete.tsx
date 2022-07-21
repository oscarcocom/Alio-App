
import { useEffect,useState, FC } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useApiSuggestions } from "../../hooks/useApiSuggestions";


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
        placeholder="¿Qué pokemon deseas buscar?"
        className="me-2 FormCtrl"
        aria-label="¿Qué pokemon deseas buscar?"
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
              key={index}
              onClick={()=>handleSelectPokeSugge(pokemon.name)}
              className="ListItemSugge" action variant={`${PokeColors[index]}`}>
                <div className="ContendSugge">
                <span>{pokemon.name}</span>
                <span><img style={{width:"4rem"}} src={pokemon.img.back_default}/></span>
                </div>
                
              </ListGroup.Item>
            )
          }
            )}
        </ListGroup>
      </div>
    </>
  );
};
