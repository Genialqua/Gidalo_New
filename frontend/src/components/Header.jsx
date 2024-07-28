import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.jpeg';
import '../index.css'; // Make sure to import your CSS file
import { logout } from '../slices/authSlice.js';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
// import { SearchBox } from './SearchBox';

const statesInNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const Header = () => {
  const { favouriteItems } = useSelector((state) => state.favourite) || { favouriteItems: [] };
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // dispatch(resetFavorites());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  }

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
              <NavDropdown title="Property Listings" id="property-listings-dropdown">
                <LinkContainer to="/forSale">
                  <NavDropdown.Item><strong>For Sale</strong></NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/forRent">
                  <NavDropdown.Item><strong>For Rent</strong></NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/distressSale">
                  <NavDropdown.Item><strong>Distress Sale</strong></NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/sharedApartment">
                  <NavDropdown.Item><strong>Shared Apartment</strong></NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/shortLets">
                  <NavDropdown.Item><strong>Short Lets</strong></NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/favourites'>
                    <NavDropdown.Item>
                      <FaShoppingCart />
                      mySelectionsCart
                      {favouriteItems.length > 0 && (
                        <Badge bg="primary" style={{ marginLeft: '5px' }}>
                          {favouriteItems.length}
                        </Badge>
                      )}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
