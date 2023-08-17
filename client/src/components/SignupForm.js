import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../utils/mutations';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ 
      username: '', 
      email: '', 
      password: '' 
    });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error }] = useMutation(CREATE_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password
        }
      })
      const { token, user } = data.createUser
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
<div className="p-8 bg-primary rounded-lg">
  <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
      Something went wrong with your signup!
    </Alert>

    <div className='mb-3'>
      <h2 className='text-white'>Sign Up!</h2>
      <label htmlFor='username' className='block text-white'>Username</label>
      <input
        type='text'
        placeholder='Your username'
        name='username'
        onChange={handleInputChange}
        value={userFormData.username}
        required
        className='w-full px-3 py-2 rounded border bg-white text-gray-700'
      />
      <div className='invalid-feedback text-red-500'>Username is required!</div>
    </div>

    <div className='mb-3'>
      <label htmlFor='email' className='block text-white'>Email</label>
      <input
        type='email'
        placeholder='Your email address'
        name='email'
        onChange={handleInputChange}
        value={userFormData.email}
        required
        className='w-full px-3 py-2 rounded border bg-white text-gray-700'
      />
      <div className='invalid-feedback text-red-500'>Email is required!</div>
    </div>

    <div className='mb-3'>
      <label htmlFor='password' className='block text-white'>Password</label>
      <input
        type='password'
        placeholder='Your password'
        name='password'
        onChange={handleInputChange}
        value={userFormData.password}
        required
        className='w-full px-3 py-2 rounded border bg-white text-gray-700'
      />
      <div className='invalid-feedback text-red-500'>Password is required!</div>
    </div>

    <button
      disabled={!(userFormData.username && userFormData.email && userFormData.password)}
      type='submit'
      className='w-full py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600'
    >
      Submit
    </button>
  </Form>
</div>
  );
};

export default SignupForm;
