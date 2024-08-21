import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetPropertyDetailsQuery,
  useUpdatePropertyMutation,
  useUploadPropertyImageMutation
} from '../../slices/propertiesApiSlice';

const PropertyEditScreen = () => {
  const { id: propertyId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [reviews, setReviews] = useState('');
  const [state, setState] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [swimmingPool, setSwimmingPool] = useState(false);
  const [parkingSpace, setParkingSpace] = useState(0);
  const [toilets, setToilets] = useState(0);
  const [nearbySchools, setNearbySchools] = useState('');
  const [nearbyHospitals, setNearbyHospitals] = useState('');
  const [nearbySuperMarkets, setNearbySuperMarkets] = useState('');
  const [description, setDescription] = useState('');

  const {
    data: property,
    isLoading,
    refetch,
    error,
  } = useGetPropertyDetailsQuery(propertyId);

  const [updateProperty, { isLoading: loadingUpdate }] =
    useUpdatePropertyMutation();

  const [uploadPropertyImage, { isLoading: loadingUpload }] =
  useUploadPropertyImageMutation();



  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setPrice(property.price);
      setImages(property.images);
      setState(property.state);
      setCategory(property.category);
      setCountInStock(property.countInStock);
      setDescription(property.description);
      setLocation(property.location);
      setNumReviews(property.numReviews);
      setReviews(property.reviews);
      setBedrooms(property.bedrooms);
      setBathrooms(property.bathrooms);
      setSwimmingPool(property.swimmingPool);
      setParkingSpace(property.parkingSpace);
      setToilets(property.toilets);
      setNearbySuperMarkets(property.nearbySuperMarkets);
      setNearbySchools(property.nearbySchools);
      setNearbyHospitals(property.nearbyHospitals);
    }
  }, [property]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProperty = {
      propertyId,
      title,
      price,
      images,
      category,
      state,
      description,
      countInStock,
      location,
      numReviews,
      reviews,
      bedrooms,
      bathrooms,
      swimmingPool,
      parkingSpace,
      toilets,
      nearbySchools,
      nearbyHospitals,
      nearbySuperMarkets,
    };

    try {
      await updateProperty(updatedProperty).unwrap();
      toast.success('Property updated successfully');
      refetch();
      navigate('/admin/propertylist');
    } catch (error) {
      toast.error(error?.data?.message || 'An error occurred');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    const files = Array.from(e.target.files);
    files.forEach(file => formData.append('images', file));

    try {
      const res = await uploadPropertyImage(formData).unwrap();
      toast.success(res.message);

      const updatedImages = [...images, ...res.images.split(',')];
      setImages(updatedImages);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/propertylist' className='btn btn-light my-3'>
        Go Back
      </Link>

      

      <FormContainer>

        <h1>Edit Property</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || 'An error occurred'} </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
            <Form.Group controlId='title' className='my-2'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='For sale, rent, distress sale'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='state' className='my-2'>
              <Form.Label>State</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter state'
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>No Available</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count available'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='reviews' className='my-2'>
              <Form.Label>Reviews</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter reviews'
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='location' className='my-2'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='numReviews' className='my-2'>
              <Form.Label>Number of Reviews</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter number of reviews'
                value={numReviews}
                onChange={(e) => setNumReviews(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='bedrooms' className='my-2'>
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter number of bedrooms'
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='bathrooms' className='my-2'>
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter number of bathrooms'
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='swimmingPool' className='my-2'>
              <Form.Check
                type='checkbox'
                label='Has Swimming Pool'
                checked={swimmingPool}
                onChange={(e) => setSwimmingPool(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='parkingSpace' className='my-2'>
              <Form.Label>Parking Space</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter number of parking spaces'
                value={parkingSpace}
                onChange={(e) => setParkingSpace(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='toilets' className='my-2'>
              <Form.Label>Toilets</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter number of toilets'
                value={toilets}
                onChange={(e) => setToilets(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='nearbySchools' className='my-2'>
              <Form.Label>Nearby Schools</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter nearby school'
                value={nearbySchools}
                onChange={(e) => setNearbySchools(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='nearbyHospitals' className='my-2'>
              <Form.Label>Nearby Hospitals</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter nearby hospital'
                value={nearbyHospitals}
                onChange={(e) => setNearbyHospitals(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='nearbySuperMarkets' className='my-2'>
              <Form.Label>Nearby Supermarkets</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter nearby supermarkets'
                value={nearbySuperMarkets}
                onChange={(e) => setNearbySuperMarkets(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='images'>
              <Form.Label>Images</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URLs'
                value={images.join(', ')}
                //onChange={(e) => setImages}
               onChange={(e) => setImages(e.target.value.split(', '))}
              ></Form.Control>
              <Form.Control
                label='Choose Files'
                onChange={uploadFileHandler}
                type='file'
                multiple
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>
            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PropertyEditScreen;