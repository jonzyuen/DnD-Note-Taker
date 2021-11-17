import React, { useEffect, useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function Signup() {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [validated] = useState(false);

  // const [showAlert, setShowAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

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

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropegation();
    }

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
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant='danger'
        >
          Something went wrong with your signup.
        </Alert>

        {/* email */}
        <form>
          <div className='form'>
            <label for='email'>Email: </label>
            <input type='email'
              className='email'
              id='email'
              onChange={handleInputChange}
              // value={userFormData.email}
              required
            />
          </div>
        </form>

        {/* username */}
        <form>
          <div className='form'>
            <label for='username'>Username: </label>
            <input type='text'
              className='username'
              id='username'
              // value={userFormData.username}
              onChange={handleInputChange}
              // value={userFormData.username}
              required
            />
          </div>
        </form>

        {/* password */}
        <form>
          <div className='form'>
            <label for='password'>Password: </label>
            <input type='text'
              className='password'
              id='password'
              onChange={handleInputChange}
              // value={userFormData.password}
              required
            />
          </div>
        </form>

        {/* button */}
        <button 
        // disabled={
        //     !(
        //       userFormData.username &&
        //       userFormData.email &&
        //       userFormData.password
        //     )
        //   }
          type='submit'
          variant='success'
        >
          Signup!
        </button>
      </form>
    </main>
  )
}

export default Signup;