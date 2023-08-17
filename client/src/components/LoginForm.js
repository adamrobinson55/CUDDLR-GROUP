import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false)

  const [login, { error }] = useMutation(LOGIN_USER)

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
      const { data } = await login({
        variables: {
          ...userFormData
        },
      });



      console.log(data)
      const { token, user } = data.login
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
          Something went wrong with your login credentials!
        </Alert>
        <div className="mb-3">
          <label htmlFor='email' className="block text-white">Email</label>
          <input
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
            className="w-full px-3 py-2 rounded border bg-white text-gray-700"
          />
          <div className="invalid-feedback text-red-500">Email is required!</div>
        </div>

        <div className="mb-3">
          <label htmlFor='password' className="block text-white">Password</label>
          <input
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
            className="w-full px-3 py-2 rounded border bg-white text-gray-700"
          />
          <div className="invalid-feedback text-red-500">Password is required!</div>
        </div>
        <button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          className="w-full py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600"
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default LoginForm;
