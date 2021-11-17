import React, { 
  // useEffect, 
  useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

function AddUser() {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // const [validated] = useState(false);

  // const [showAlert, setShowAlert] = useState(false);

  const [addUser, 
    // { error }
  ] = useMutation(ADD_USER);

  // useEffect(() => {
  //   if (error) {
  //     setShowAlert(true);
  //   } else {
  //     setShowAlert(false);
  //   }
  // }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // const form = event.currentTarget;

    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropegation();
    // }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <form noValidate onSubmit={handleFormSubmit}>
        {/* <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant='danger'
        >
          Something went wrong with your signup.
        </Alert> */}

        {/* email */}
        <div>
          <div className='form'>
            <label>Enter your Email: </label>
            <input type='email'
              name='email'
              id='email'
              placeholder='Email'
              aria-describedby='emailHelp'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
          </div>
        </div>

        {/* username */}
        <div>
          <div className='form'>
            <label>Enter your Username: </label>
            <input type='text'
              name='username'
              id='username'
              placeholder='Username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
          </div>
        </div>

        {/* password */}
        <div>
          <div className='form'>
            <label>Enter your Password: </label>
            <input type='text'
              name='password'
              id='password'
              placeholder='Password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </div>
        </div>

        {/* button */}
        <button 
        disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type='submit'
        >
          Signup!
        </button>
      </form>
    </main>
  )
}

export default AddUser;