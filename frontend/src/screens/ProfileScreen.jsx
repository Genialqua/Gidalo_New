import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
//import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyFavouritesQuery, useRemoveFavouriteMutation } from '../slices/favouritesApiSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [employee, setEmployee] = useState('');
  const [accountStatement, setAccountStatement] = useState(null);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: favourites, isLoading, error } = useGetMyFavouritesQuery();
  const [removeFavourite] = useRemoveFavouriteMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhoneNumber(userInfo.phoneNumber || '');
      setAge(userInfo.age || '');
      setSex(userInfo.sex || '');
      setProfession(userInfo.profession || '');
      setLocation(userInfo.location || '');
      setLinkedin(userInfo.linkedin || '');
      setEmploymentStatus(userInfo.employmentStatus || '');
      setEmployee(userInfo.employee || '');
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const formData = new FormData();
        formData.append('_id', userInfo._id);
        formData.append('name', name);
        formData.append('email', email);
        if (password) formData.append('password', password); // Only append password if it's provided
        formData.append('phoneNumber', phoneNumber);
        formData.append('age', age);
        formData.append('sex', sex);
        formData.append('profession', profession);
        formData.append('location', location);
        formData.append('linkedin', linkedin);
        formData.append('employmentStatus', employmentStatus);
        formData.append('employee', employee);
        if (accountStatement) {
          formData.append('accountStatement', accountStatement);
        }

        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleFileChange = (e) => {
    setAccountStatement(e.target.files[0]);
  };

  const handleRemoveFavourite = async (favouriteId) => {
    if (window.confirm('Are you sure you want to remove this favourite?')) {
      try {
        await removeFavourite(favouriteId).unwrap();
        toast.success('Favourite removed successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler} encType="multipart/form-data">
          <Row>
            <Col md={10}>
              <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email" className="my-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password" className="my-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="my-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="phoneNumber" className="my-2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="age" className="my-2">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="sex" className="my-2">
                <Form.Label>Sex</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="profession" className="my-2">
                <Form.Label>Profession</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="location" className="my-2">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="linkedin" className="my-2">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter LinkedIn profile"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="employmentStatus" className="my-2">
                <Form.Label>Employment Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employment status"
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="employee" className="my-2">
                <Form.Label>Employee</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employee"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="accountStatement" className="my-2">
                <Form.Label>Account Statement</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary" className="my-2">
          {loadingUpdateProfile ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Update'
                )}
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Favourites</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error?.data?.message || error.error}</p>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {favourites?.map((favourite) => (
                <tr key={favourite._id}>
                  <td>{favourite._id}</td>
                  <td>{favourite.title}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFavourite(favourite._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
