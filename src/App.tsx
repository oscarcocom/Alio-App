import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { NavBar } from "./Components/UI/NavBar/NavBar";
import { useApi } from "./hooks/useApi";
import { useApiSuggestions } from './hooks/useApiSuggestions';


interface searchInput {
  input: string;
  loading:boolean,
  data:[{}] | null  
}

type SearchWord = string;

function App() {
  const [FormInput, setFormInput] = useState<searchInput>({
    input: "",
    loading:false,
    data:null
  });
  const {input}=FormInput;
   
 const [showMessage, setShow] = useState(false);

 //Customs Hooks
 const{ PokemonGet,dataApi, loading } = useApi<SearchWord>(input)
 const {pokeSuggestion}=useApiSuggestions({})

  useEffect(() => {
   console.log(dataApi)
  }, [dataApi]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(false)

    setFormInput((InitState:searchInput)=>({
      ...InitState,
      loading:true
    }))

    const Result = PokemonGet().then((elem)=>{
      setFormInput((InitState:searchInput)=>({
        ...InitState,
        data:[elem],
        loading:false

      }))
      

    }).catch(()=>setShow(true));
  
  
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...FormInput,
      input: e.currentTarget.value
    });
   
  };

  return (
    <Container>
      <NavBar />
      <div>
        <section>
          <Container>
            <Row className="justify-content-center p-5 mt-5"
             style={{display:"flex", alignContent:"column"}}
             >
              <Col xs={6}>
                <Form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", alignContent: "row" }}
                >
                  <Form.Control
                    type="search"
                    placeholder="¿Qué pokemon deceas buscar?"
                    className="me-2 "
                    aria-label="¿Qué pokemon deceas buscar?"
                    value={input}
                    name="input"
                    onChange={handleChange}
                  />
                  <Button
                    style={{ display: "inline-block" }}
                    variant="outline-success"
                    type="submit"
                  >
                    Buscar <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </Form>
              </Col>
             
            </Row>
            <Row className="justify-content-center">
          {
            showMessage&&(
              <Col xs={6}>
              <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>
                  Oh! Verifica el nombre del pokemon 
                  
                </Alert.Heading>
                <p>
                  Parece ser que se ingreso un nombre de pokemon incorrecto, de parte del 
                  equpipo Alio, te invitamos a verificarlo e intentarlo nuevamente.
                  
                </p>
                <FontAwesomeIcon icon={ faFaceSadCry} />
              </Alert>
              </Col>
            )
          }
          
         
            </Row>
          </Container>

          <Container>
            <Row></Row>
          </Container>
        </section>
      </div>
    </Container>
  );
}

export default App;
