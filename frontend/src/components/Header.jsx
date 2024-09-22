import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import '../index.css';
import { logout } from '../slices/authSlice.js';
import { useLogoutMutation } from '../slices/usersApiSlice';
import SearchBox from './SearchBox.jsx';

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
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Gidalo logo" width="30" height="24" style={{ marginRight: '10px' }} />
            Gidalo
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className='nav-link mx-3'>
                <strong>Home</strong>
              </Link>

              <NavDropdown title="Property Listings" id="property-listings-dropdown">
                <Link to="/forSale" className="dropdown-item">
                  <strong>For Sale</strong>
                </Link>
                <Link to="/forRent" className="dropdown-item">
                  <strong>For Rent</strong>
                </Link>
                <Link to="/distressSale" className="dropdown-item">
                  <strong>Distress Sales</strong>
                </Link>
                <Link to="/sharedApartment" className="dropdown-item">
                  <strong>Shared Apartments</strong>
                </Link>
                <Link to="/shortLets" className="dropdown-item">
                  <strong>Short Lets</strong>
                </Link>
                <Link to="/lands" className="dropdown-item">
                  <strong>Lands</strong>
                </Link>
                <Link to="/boysquarters" className="dropdown-item">
                  <strong>Boys Quarters</strong>
                </Link>
                <Link to="/warehouses" className="dropdown-item">
                  <strong>Warehouses</strong>
                </Link>
                <Link to="/dubaiProperties" className='dropdown-item'>
                <strong>Dubai Properties</strong>
              </Link>
              </NavDropdown>

              <NavDropdown title="Select State" id="state-dropdown" className="scrollable-dropdown">
                <div className="scrollable-menu">
                  {statesInNigeria.map((state) => (
                    <Link key={state} to={`/state/${state}`} className="dropdown-item">
                      {state}
                    </Link>
                  ))}
                </div>
              </NavDropdown>

            </Nav>

            <Nav className="ms-auto">
              <SearchBox />
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <Link to='/profile' className="dropdown-item">
                      Profile
                    </Link>
                    <Link to='/favourites' className="dropdown-item">
                      <FaShoppingCart />
                      My Selections
                      {favouriteItems.length > 0 && (
                        <Badge bg="primary" style={{ marginLeft: '5px' }}>
                          {favouriteItems.length}
                        </Badge>
                      )}
                    </Link>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  {userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenu'>
                      <Link to='/admin/bookinglist' className="dropdown-item">
                        Bookings
                      </Link>
                      <Link to='/admin/propertylist' className="dropdown-item">
                        List of Properties
                      </Link>
                      <Link to='/admin/userlist' className="dropdown-item">
                        Users
                      </Link>
                    </NavDropdown>
                  )}

                  {userInfo.isAgent && (
                    <NavDropdown title='Agent' id='agentmenu'>
                      
                      <Link to='/agent/propertylist' className="dropdown-item">
                        List of Properties
                      </Link>
                    </NavDropdown>
                  )}

                </>
              ) : (
                <Link to="/login" className='nav-link'>
                  <FaUser />
                  Sign In
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Nav>
              <Link to="/homemovers" className='nav-link mx-3'>
                <strong>Home Movers</strong>
              </Link>
            </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
