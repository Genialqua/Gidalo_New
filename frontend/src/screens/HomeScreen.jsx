import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useGetPropertiesQuery } from '../slices/propertiesApiSlice.js';
import Property from '../components/property.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate';
import PropertyCarousel from '../components/PropertyCarousel.jsx';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber = 1, keyword = '' } = useParams(); // Default values

  const { data, isLoading, error } = useGetPropertiesQuery({ keyword, pageNumber });

  return (
    <>
      {!keyword ? (
        <PropertyCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Properties</h1>
          <Row>
            {data.properties.map((property) => (
              <Col key={property._id} sm={12} md={6} lg={4} xl={3}>
                <Property property={property} />
              </Col>
            ))}
          </Row>
          { <Paginate 
            pages={data.pages} 
            page={data.page} 
            keyword={keyword} 
          /> }
        </>
      )}
    </>
  );
};

export default HomeScreen;

