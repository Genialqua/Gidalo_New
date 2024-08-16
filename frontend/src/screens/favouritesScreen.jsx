import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, ListGroup, Carousel } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { removeFromFavourites } from '../slices/favouritesSlice.js';

const FavouriteScreen = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const favourite = useSelector((state) => state.favourite);
  const { favouriteItems } = favourite;

  const removeFromFavouritesHandler = (id) => {
    dispatch(removeFromFavourites(id));
  };

  // const scheduleInspectionHandler = () => {
  //   navigate('/login?redirect=/signin');
  // };

  return (
    <Row>
      <Col md={12}>
        <h1 style={{ marginBottom: '20px' }}>My Favourite Properties</h1>
        {favouriteItems.length === 0 ? (
          <Message>
            No favourite properties
            <br />
            Add properties to your favourites by clicking on the 'Save for Later' button in the property details page.
            <br />
            <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <Row>
            {favouriteItems.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Card className="my-3 p-3">
                  <Link to={`/property/${item._id}`}>
                    <Carousel interval={null}>
                      {item.images.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100 carousel-image"
                            src={image}
                            alt={`Slide ${index + 1}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </Link>
                  <Card.Body>
                    <Link to={`/property/${item._id}`}>
                      <Card.Title>{item.title}</Card.Title>
                    </Link>
                    <Card.Text>
                      Price: {item.price}
                    </Card.Text>
                    
                   <ListGroup.Item>
                    <Button
                      type="button"
                      variant="dark"
                      className='btn-m mx-2 my-2'
                      onClick={() => removeFromFavouritesHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      // onClick={() => scheduleInspectionHandler(item)}
                    >
                      Schedule Inspection Here
                    </Button>
                    </ListGroup.Item>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default FavouriteScreen;
