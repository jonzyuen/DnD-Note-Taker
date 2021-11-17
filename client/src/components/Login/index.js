import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';

import Auth from '../../utils/auth';

function Login() {
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: ''
  });

  const [validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false)

  const [login, { error }] = useMutation(LOGIN);

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
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropegation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.login.token)
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
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
          Something went wrong with your login.
        </Alert>

        <form>
          <div className='form'>
            <label for='username'>Username: </label>
            <input type='text'
              name='username'
              id='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
          </div>
        </form>

        <form>
          <div className='form'>
          <label for='password'>Password: </label>
            <input type='text'
              name='password'
              id='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </div>
        </form>

        <button 
        disabled={
            !(
              userFormData.username &&
              userFormData.password
            )
          }
          type='submit'
          variant='success'
        >
          Login!
        </button>
      </form>
    </main>
  )
}

export default Login;

