import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useGetPropertiesByCategoryQuery } from '../slices/propertiesApiSlice.js';
import Property from '../components/property.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate';
import PropertyCarousel from '../components/PropertyCarousel.jsx';
import Meta from '../components/Meta';

const DubaiPropertiesScreen = () => {
  const { pageNumber = 1, keyword = '' } = useParams(); // Extract parameters from URL

  // Fetch properties by category with keyword and pagination
  const { data, isLoading, error } = useGetPropertiesByCategoryQuery({ 
    category: 'dubai properties',
    keyword, 
    pageNumber,
  });

  return (
    <>
      {!keyword && <PropertyCarousel />}
      
      {keyword && (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || 'Error loading properties. Please check your internet connection'}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Dubai Properties</h1>
          <Row>
            {data.properties.length > 0 ? (
              data.properties.map((property) => (
                <Col key={property._id} sm={12} md={6} lg={4} xl={3}>
                  <Link to={`/property/${property._id}`}>
                    <Property property={property} />
                  </Link>
                </Col>
              ))
            ) : (
              <Message variant='info'>
                No properties found for Dubai properties.
              </Message>
            )}
          </Row>
          <Paginate 
            pages={data.pages} 
            page={data.page} 
            keyword={keyword} 
          /> 
        </>
      )}
    </>
  );
};

export default DubaiPropertiesScreen;
