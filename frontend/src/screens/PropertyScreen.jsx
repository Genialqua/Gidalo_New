import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Carousel, ListGroup, Card, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { useGetPropertyDetailsQuery } from "../slices/propertiesApiSlice.js";
import { addToFavourites } from "../slices/favouritesSlice.js";
import { useDispatch } from 'react-redux';
import '../index.css'; // Import the custom CSS file

const PropertyScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: propertyId } = useParams();

  const addToFavouriteHandler = () => {
    dispatch(addToFavourites(property));
    navigate('/favourites'); // Navigate to the favourites page after adding
  };

  const { 
    data: property, 
    isLoading, 
    error 
  } = useGetPropertyDetailsQuery(propertyId);

  return (
    <>
      <Link 
        className="btn btn-light my-3" 
        to={'/home'}
        // to={property ? `/${encodeURIComponent(property.category.toLowerCase())}` : "/"}
      >
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.response?.data?.message || error.message}
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            <Carousel interval={null}>
              {property.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 carousel-image"
                    src={image}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{property.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={property.rating}
                  text={`${property.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: {property.price}</ListGroup.Item>
              <ListGroup.Item>
                <strong>Description</strong>: {property.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Location</strong>: {property.location}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>No of Bedrooms</strong>: {property.bedrooms}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>No of Bathrooms</strong>: {property.bathrooms}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>No of Toilets</strong>: {property.toilets}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Parking Space</strong>: {property.parkingSpace}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Nearby Schools</strong>: {property.nearbySchools.join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Nearby Hospitals</strong>: {property.nearbyHospitals.join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Nearby Supermarkets</strong>: {property.nearbySuperMarkets.join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Swimming Pool</strong>: {property.swimmingPool ? 'Yes' : 'No'}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Property</Col>
                    <Col>
                      <strong>{property.title}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>{property.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {property.countInStock > 0 ? "Available" : "Not Available"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={property.countInStock === 0}
                    onClick={addToFavouriteHandler}
                  >
                    Save for Later
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    // Add an onClick handler if needed
                  >
                    Schedule Inspection Here
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PropertyScreen;
