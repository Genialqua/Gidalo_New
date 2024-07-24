import { Row, Col } from 'react-bootstrap';
import Property from '../components/property.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useGetPropertiesQuery } from '../slices/propertiesApiSlice.js';

const ShortLetsScreen = () => {
  const { data: properties, isLoading, error } = useGetPropertiesQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.message || error.error}</Message>
      ) : (
        <>
          <h1>Short-Let Apartments</h1>
          <Row>
            {properties
              .filter((property) => property.category.toLowerCase() === 'shortlet')
              .map((property) => (
                <Col key={property._id} sm={12} md={6} lg={4} xl={3}>
                  <Property property={property} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
};

export default ShortLetsScreen;
