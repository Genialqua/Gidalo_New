import { useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Carousel, ListGroup, Card, Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import Message from "../components/Message";
import { useGetPropertyDetailsQuery,
         useCreateReviewMutation,
 } from "../slices/propertiesApiSlice.js";
import { addToFavourites } from "../slices/favouritesSlice.js";
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../components/Meta';
import '../index.css'; // Import the custom CSS file

const PropertyScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: propertyId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToFavouriteHandler = () => {
    dispatch(addToFavourites(property));
    navigate('/favourites'); // Navigate to the favourites page after adding
  };

  const { 
    data: property, 
    isLoading,
    refetch, 
    error 
  } = useGetPropertyDetailsQuery(propertyId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingPropertyReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        propertyId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to={'/'}>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
      <>
      <Meta title={property.title} description={property.description} />
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
      <Card style={{ width: '100%', marginTop: '1rem' }}>
      <Row className='review'>
        <Col md={12}>
          <h2>Reviews</h2>
          {property.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
            {property.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.title}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Review About this Property.</h2>

              {loadingPropertyReview && <Loader />}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group className='my-2' controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className='my-2' controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows='3'
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingPropertyReview}
                    type='submit'
                    variant='primary'
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to='/login'>sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Card>
          </Col>
          <Card style={{ width: '30%'}}>
          <Col md={12}>
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
                <strong>State</strong>: {property.state}
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
                <strong>Nearby Schools</strong>: {property.nearbySchools}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Nearby Hospitals</strong>: {property.nearbyHospitals}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Nearby Supermarkets</strong>: {property.nearbySuperMarkets}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Swimming Pool</strong>: {property.swimmingPool ? 'Yes' : 'No'}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          </Card>
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
        
      </>
      )}
    </>
  );
};

export default PropertyScreen;


