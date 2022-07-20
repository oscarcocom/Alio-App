
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <>
   
      <Navbar style={{backgroundColor:"#ec8d2073"}} variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/Alio.png"
              width="100"
              height="100"
              className="d-inline-block align-top"
            />
          
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link  href="#home">  <Link to="/">Main</Link></Nav.Link>
            <Nav.Link href="#features"><Link to="/details">More</Link></Nav.Link>
            {/* <Nav.Link href="#pricing">oscar</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
