import { Row, Col } from 'react-bootstrap';
import Property from '../components/property.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
//import { useGetPropertiesQuery } from '../slices/propertiesApiSlice.js';
import { useGetPropertiesByCategoryQuery } from '../slices/propertiesApiSlice.js';

const DistressSaleScreen = () => {
  const { data: properties, isLoading, error } = useGetPropertiesByCategoryQuery({
    category: 'distress sale',
  });

  // Convert properties to an array if it's not already
  const propertiesArray = Array.isArray(properties) ? properties : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.message || error.error}</Message>
      ) : (
        <>
          <h1>Distress Sales</h1>
          <Row>
            {propertiesArray.map((property) => (
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

export default DistressSaleScreen;

