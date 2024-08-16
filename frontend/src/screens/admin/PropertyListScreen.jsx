import React from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetPropertiesQuery,
  useDeletePropertyMutation,
  useCreatePropertyMutation,
} from '../../slices/propertiesApiSlice';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PropertyListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetPropertiesQuery({
    pageNumber,
  });

  const [deleteProperty, { isLoading: loadingDelete }] =
    useDeletePropertyMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id).unwrap();
        refetch();
        toast.success('Property deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProperty, { isLoading: loadingCreate }] =
    useCreatePropertyMutation();

  const createPropertyHandler = async () => {
    if (window.confirm('Are you sure you want to create a new property?')) {
      try {
        await createProperty().unwrap();
        refetch();
        toast.success('Property created successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Properties</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createPropertyHandler}>
            <FaPlus /> Create New Property
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Count In Stock</th>
                <th>Reviews</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Swimming Pool</th>
                <th>Images</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.properties.map((property) => (
                <tr key={property._id}>
                  <td>{property._id}</td>
                  <td>{property.title}</td>
                  <td>{property.location}</td>
                  <td>{property.price}</td>
                  <td>{property.category}</td>
                  <td>{property.description}</td>
                  <td>{property.countInStock}</td>
                  <td>{property.reviews.length}</td>
                  <td>{property.bedrooms}</td>
                  <td>{property.bathrooms}</td>
                  <td>{property.swimmingPool ? 'Yes' : 'No'}</td>
                  <td>
                    {property.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={property.title}
                        style={{ height: '50px', width: '50px' }}
                      />
                    ))}
                  </td>
                  <td>{property.state}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/property/${property._id}/edit`}
                      variant='light'
                      className='btn-sm mx-2 my-2'
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      variant='danger'
                      className='btn-sm mx-2'
                      onClick={() => deleteHandler(property._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default PropertyListScreen;
