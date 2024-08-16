import { Link } from 'react-router-dom';
import Loader from './Loader';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopPropertiesQuery } from '../slices/propertiesApiSlice';

const PropertyCarousel = () => {
  const { data: properties, isLoading, error } = useGetTopPropertiesQuery();

  return isLoading ? <Loader /> : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {properties.map((property) => (
        <Carousel.Item key={property._id}>
          <Link to={`/property/${property._id}`}>
            <Image 
              src={property.images[0]} 
              alt={property.title} 
              fluid 
              style={{ width: '75%', height: '75%' }} 
            />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {property.title} ({property.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PropertyCarousel;
