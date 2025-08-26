import React, { useState } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useGetPropertiesByCategoryQuery } from '../slices/propertiesApiSlice.js';
import Property from '../components/property.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate';
import PropertyCarousel from '../components/PropertyCarousel.jsx';
import Meta from '../components/Meta';

const Estimator = () => {
  const [dimensions, setDimensions] = useState({ height: '', width: '' });
  const [material, setMaterial] = useState('aluminum');
  const [design, setDesign] = useState('default');
  const [estimate, setEstimate] = useState(null);

  const calculateEstimate = () => {
    const baseCost = 5000;
    const area = (parseFloat(dimensions.height) || 0) * (parseFloat(dimensions.width) || 0);
    const materialMultiplier = material === 'wood' ? 1.3 : material === 'steel' ? 1.5 : 1;
    const total = baseCost * area * materialMultiplier;
    setEstimate(total.toFixed(2));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Construction Estimator</h2>

      <div className="mb-2">
        <label>Height (meters):</label>
        <input
          type="number"
          value={dimensions.height}
          onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
          className="w-full border p-1"
        />
      </div>

      <div className="mb-2">
        <label>Width (meters):</label>
        <input
          type="number"
          value={dimensions.width}
          onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
          className="w-full border p-1"
        />
      </div>

      <div className="mb-2">
        <label>Material:</label>
        <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full border p-1">
          <option value="aluminum">Aluminum</option>
          <option value="wood">Wood</option>
          <option value="steel">Steel</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Design:</label>
        <select value={design} onChange={(e) => setDesign(e.target.value)} className="w-full border p-1">
          <option value="default">Default</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <button onClick={calculateEstimate} className="bg-blue-500 text-white px-4 py-2 rounded">
        Estimate Cost
      </button>

      {estimate && (
        <div className="mt-4 p-2 bg-green-100 text-green-800">Estimated Cost: ₦{estimate}</div>
      )}
    </div>
  );
};

const KitchenScreen = () => {
  const { category = 'kitchen', pageNumber = 1, keyword = '' } = useParams();
  const { data, isLoading, error } = useGetPropertiesByCategoryQuery({
    category,
    keyword,
    pageNumber,
  });

  const menuItems = [
    'Bathroom',
    'Doors',
    'Gates',
    'Kitchen',
    'Lights and Switch',
    'Tiles and Marble',
    'Wardrobes and Cabinets',
    'Windows',
    'Glass and Mirror',
    'Others',
  ];

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
          <h1>Kitchen and Accessories</h1>
          <Row>
            {/* Left-side vertical menu */}
            <Col md={3}>
              <ListGroup>
                {menuItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                   <Link to={`/buildersmart/${item.toLowerCase().replace(/[\s-]+/g, '')}`} className="text-decoration-none">

                      {item}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            {/* Properties display */}
            <Col md={9}>
              <Row>
                {data?.properties?.length > 0 ? (
                  data.properties.map((property) => (
                    <Col key={property._id} sm={12} md={6} lg={4}>
                      <Link to={`/property/${property._id}`}>
                        <Property property={property} />
                      </Link>
                    </Col>
                  ))
                ) : (
                  <>
                    <Message variant='info'>Order your kitchen accessories here.</Message>
                    <Estimator />
                  </>
                )}
              </Row>

              <Paginate pages={data?.pages || 1} page={data?.page || 1} keyword={keyword} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default KitchenScreen;
