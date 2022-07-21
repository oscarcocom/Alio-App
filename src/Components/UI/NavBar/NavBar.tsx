
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../../IMG/Alio.png'
export const NavBar = () => {
  return (
    <>
   
      <Navbar  className='NavBar' variant="dark">
        <Container >
          <Navbar.Brand  href="#home">
            <img
              alt=""
              src={logo}
              width="100"
              height="100"
              className="d-inline-block align-top"
            />
          
          </Navbar.Brand>
          <Nav className="me-auto">
             {/* <Nav.Link  href="#home">  <Link to="/">Main</Link></Nav.Link>  */}
            <Nav.Link className='links' style={{color:"rgb(101 48 22 / 55%)"}} href="https://www.linkedin.com/in/oscar-cocom/">OSCARCOCOM</Nav.Link>
            {/* <Nav.Link href="#pricing">oscar</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
