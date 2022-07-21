import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFaceSadCry,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Form, Row, Alert, Carousel } from "react-bootstrap";
import { NavBar } from "./Components/UI/NavBar/NavBar";
import { useApi } from "./hooks/useApi";

import { PokeAutocomplete } from "./Components/PokeAutocomplete/PokeAutocomplete";
import { SpritesSugge, TopLevelSugge } from './Interfaces/pokemon-Api-Sugge';
import { PokeBolaContent } from "./Components/UI/Home/PokeBolaContent";


interface searchInput {
  input: string;
  loading: boolean;
  data: [{}] | null;
}

type SearchWord = string;

function App() {
  const [FormInput, setFormInput] = useState<searchInput>({
    input: "",
    loading: false,
    data: null,
  });
  const { input, data } = FormInput;

  const [showMessage, setShow] = useState(false);

  //Customs Hooks
  const { PokemonGet, dataApi } = useApi<SearchWord>(input);

  const Pokebola = useRef<HTMLImageElement>(null);
    const PokebolaOpen = useRef<HTMLImageElement>(null);

  useEffect(() => {
    console.log(dataApi);
  }, [dataApi]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(false);


    Pokebola.current?.style.setProperty('--animate-duration', '0.5s');
    Pokebola.current?.classList.add(
      "animate__animated",
      "animate__flip",
      

    );
    
    Pokebola.current?.addEventListener("animationend", async() => {
     await Pokebola.current?.style.setProperty("display", "none");
     await PokebolaOpen.current?.style.setProperty("visibility", "visible")
     
    });

    setFormInput((InitState: searchInput) => ({
      ...InitState,
      loading: true,
    }));

    const Result = PokemonGet()
      .then((elem) => {
        setFormInput((InitState: searchInput) => ({
          ...InitState,
          data: [elem],
          loading: false,
        }));
      })
      .catch(() => setShow(true));
  };

  return (
    <>
    <NavBar />
    <Container>
     
      <div>
        <section>
          <Container className="pb-0  mb-0">
            <Row
              className="justify-content-center pt-5 mt-5 "
              style={{ display: "flex", alignContent: "column" }}
            >
              <Col xs={6}>
                <Form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", alignContent: "row" }}
                >
                  <PokeAutocomplete
                    FormInput={FormInput}
                    setFormInput={setFormInput}
                    
                  />

                  <Button
                    id="buttonSearch"
                    style={{ display: "inline-block" }}
                    variant="success"
                    type="submit"
                  >
                   Lanzar pokebola 
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row className="justify-content-center">
              {showMessage && (
                <Col xs={6}>
                  <Alert
                    variant="danger"
                    onClose={() => setShow(false)}
                    dismissible
                  >
                    <Alert.Heading>
                      Oh! Verifica el nombre del pokemon
                    </Alert.Heading>
                    <p>
                      Parece ser que se ingreso un nombre de pokemon incorrecto,
                      de parte del equpipo Alio, te invitamos a verificarlo e
                      intentarlo nuevamente.
                    </p>
                    <FontAwesomeIcon icon={faFaceSadCry} />
                  </Alert>
                </Col>
              )}
            </Row>
          </Container>

          <Container>
            <Row className="mt-0 pt-0 justify-content-center">

             <PokeBolaContent
             data={data}
             Pokebola={Pokebola}
             PokebolaOpen={PokebolaOpen}
             />
            

            </Row>
          </Container>
        </section>
      </div>
    </Container>
    </>
  );
}

export default App;
