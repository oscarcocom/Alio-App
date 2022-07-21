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
    <Container>
      <NavBar />
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

              <>
              <img
                ref={Pokebola}
                src="./PokeImg/Pokebola.png"
                alt="Pokebola"
                className="pokebolaClose"
              />

              {
              !!data?.length&& data.map((pokemonDetail,index)=>{
                
                const {img, name, type, id}=pokemonDetail as {img:SpritesSugge, name:string, type:[], id:number}

              return(
              <>
              <img
                ref={PokebolaOpen}
                src="./PokeImg/PokebolaOpen.png"
                alt="PokebolaOpen"
                className="PokebolaOpen"
              />
              <Carousel className="CarouselPoke" pause={false} >
             
                    <Carousel.Item className=" pt-5 mt-5">
                      <img
                        className="d-block w-100"
                        src={img.front_default}
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className=" pt-5 mt-5">
                      <img
                        className="d-block w-100"
                        src={img.back_default}
                        alt="Second slide"
                      />
                      <Carousel.Caption>
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className=" pt-5 mt-5" >
                      <img
                        className="d-block w-100 pokemonImg"
                        src={img.front_shiny}
                        alt="Third slide"
                      />
                      <Carousel.Caption>
                        <h5>Third slide label</h5>
                        <p>
                          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className=" pt-5 mt-5">
                      <img
                        className="d-block w-100"
                        src={img.back_shiny}
                        alt="Third slide"
                      />
                      <Carousel.Caption >
                        <h5 style={{color:"primary"}} >Third slide label</h5>
                        <p>
                          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  
              </Carousel>
              </>
              )})

              
              }
             

              
              </>
            

            </Row>
          </Container>
        </section>
      </div>
    </Container>
  );
}

export default App;
