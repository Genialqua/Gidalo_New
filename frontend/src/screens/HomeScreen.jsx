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

  const { data, isLoading, error } = useGetPropertiesQuery({ 
    keyword, 
    pageNumber,
  });

  const canonicalUrl = `https://www.gidalo.com${keyword ? `/search/${keyword}/page/${pageNumber}` : ''}`;

  return (
    <>
      <Meta 
        title="Properties List - Gidalo" 
        description="Find the best properties that fit your budget." 
        keywords="properties, buy properties, real estate, apartments, flats, duplex, bedrooms" 
        canonical={canonicalUrl}
      />
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
        <Message variant='danger'>
          Error loading properties. Please check your internet connection
        </Message>
      ) : (
        <>
          <h1>Properties List</h1>
          <Row>
            {data.properties.map((property) => (
              <Col key={property._id} sm={12} md={6} lg={4} xl={3}>
                <Link to={`/property/${property._id}`}>
                  <Property property={property} />
                </Link>
              </Col>
            ))}
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

export default HomeScreen;
