import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.jpeg';
import '../index.css'; // Make sure to import your CSS file

const statesInNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const Header = () => {
  const { favouriteItems } = useSelector((state) => state.favourite) || { favouriteItems: [] };
  
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="Gidalo logo" width="30" height="24" style={{ marginRight: '10px' }} />
              Gidalo
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/home">
                <Nav.Link><strong>Home</strong></Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forSale">
                <Nav.Link><strong>For Sale</strong></Nav.Link>
              </LinkContainer>
              <LinkContainer to="/forRent">
                <Nav.Link><strong>For Rent</strong></Nav.Link>
              </LinkContainer>
              <LinkContainer to="/distressSale">
                <Nav.Link><strong>Distress Sale</strong></Nav.Link>
              </LinkContainer>
              <LinkContainer to="/sharedApartment">
                <Nav.Link><strong>Shared Apartment</strong></Nav.Link>
              </LinkContainer>
              <LinkContainer to="/shortLets">
                <Nav.Link><strong>Short-Lets</strong></Nav.Link>
              </LinkContainer>
              <NavDropdown title="Select State" id="state-dropdown" className="scrollable-dropdown">
                <div className="scrollable-menu">
                  {statesInNigeria.map((state) => (
                    <LinkContainer key={state} to={`/state/${state}`}>
                      <NavDropdown.Item>{state}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
                </div>
              </NavDropdown>
              <LinkContainer to="/dubaiProperties">
                <Nav.Link><strong>Dubai Properties</strong></Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ms-auto">
              <LinkContainer to="/favourites">
                <Nav.Link>
                  <FaShoppingCart />
                  mySelectionsCart
                  {favouriteItems.length > 0 && (
                    <Badge bg="primary" style={{ marginLeft: '5px' }}>
                      {favouriteItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signin">
                <Nav.Link>
                  <FaUser />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
