import { Card, Button, Carousel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import '../index.css';

const Property = ({ property, onBook }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/bookinglist/${property._id}`);
  };

  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/property/${property._id}`}>
          <Carousel interval={null}>
            {property.images.map((image, index) => (
              <Carousel.Item key={index} className="carousel-item-container">
                <div className="image-container">
                  <Card.Img 
                    className='d-block w-100 carousel-image' 
                    src={image}
                    alt={`Slide ${index + 1} showing ${property.title}`}
                    loading="lazy" 
                    variant="top" 
                  />
                  <div 
                  className="watermark" 
                  style={{
                    position: 'center',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '5px 10px',
                    fontSize: '12px',
                    borderRadius: '5px',
                    zIndex: 10,
                    }}
                    >
                    Gidalo
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Link>

        <Card.Body>
          <Link to={`/property/${property._id}`}>
            <Card.Title as="div" className="property-title">
              <strong>{property.title}</strong>
            
            </Card.Title>
          </Link>

          <Card.Text>
          {property.location}
          </Card.Text>

          <Card.Text as="div">
            <Rating value={property.rating} text={`${property.numReviews} reviews`} />
          </Card.Text>

          <Card.Text as="h3">{property.price}</Card.Text>

          {property.category.toLowerCase() === 'shortlet' && (
            <Button variant="primary" onClick={handleBooking}>
              Book Now
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Property;











// import { Card, Carousel } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Rating from './Rating';

// const Property = ({ property }) => {
//   return (
//     <>
//       <Card className="my-3 p-3 rounded">
//         <Link to={`/property/${property._id}`}>
//           <Carousel style={{ width: '100%', height: '70px' }}>
//             {property.images.map((image, index) => (
//               <Carousel.Item key={index}>
//                 <img
//                   className="d-block w-100 carousel-image"
//                   src={image}
//                   alt={`Slide ${index + 1}`}
//                 />
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         </Link>

//         <Card.Body>
//           <Link to={`/property/${property._id}`}>
//             <Card.Title as="div" className="property-title">
//               <strong>{property.title}</strong>
//             </Card.Title>
//           </Link>

//           <Card.Text as="div">
//             <Rating value={property.rating} text={`${property.numReviews} reviews`} />
//           </Card.Text>

//           <Card.Text as="h3">{property.price}</Card.Text>
//         </Card.Body>
//       </Card>
//     </>
//   );
// };

// export default Property;






// import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Rating from './Rating';

// const Property = ({ property }) => {
//   return (
//     <>
//       <Card className="my-3 p-3 rounded">
//         <Link to={`/property/${property._id}`}>
//           <Card.Img src={property.images} variant="top" />
//         </Link>

//         <Card.Body>
//           <Link to={`/property/${property._id}`}>
//             <Card.Title as="div" className='property-title'>
//               <strong>{property.title}</strong>
//             </Card.Title>
//           </Link>
          
//           <Card.Text as="div">
//             <Rating value={property.rating} text={`${property.numReviews} reviews`} />
//           </Card.Text>

//           <Card.Text as="h3">{property.price}</Card.Text>
//         </Card.Body>
//       </Card>
//     </>
//   );
// };

// export default Property;
