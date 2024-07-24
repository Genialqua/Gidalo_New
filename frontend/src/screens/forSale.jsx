import { Row, Col } from 'react-bootstrap';
import Property from '../components/property.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useGetPropertiesQuery } from '../slices/propertiesApiSlice.js';

const ForSaleScreen = () => {
  const { data: properties, isLoading, error } = useGetPropertiesQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.message || error.error}</Message>
      ) : (
        <>
          <h1>Properties Sale</h1>
          <Row>
            {properties
              .filter((property) => property.category.toLowerCase() === 'for sale')
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

export default ForSaleScreen;
