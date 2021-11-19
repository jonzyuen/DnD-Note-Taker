import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';

import Auth from '../../utils/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { error }] = useMutation(LOGIN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value);

    switch(name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });
      console.log(data);
      Auth.login(data.login.token)
    } catch (err) {
      console.error(err);
    }

    setEmail('');
    setPassword('');
  };

  // const handleAddUser = async (event) => {
  //   event.preventDefault();

  //   try {

  //   }
  // }

	return (
		<div className='container'>
			<main className='row'>
				<form onSubmit={handleFormSubmit}>
					<div className='form-group'>
						<label htmlFor='email'>Email address</label>
						<input required onChange={handleInputChange} type='email' className='form-control' id='email' name='email' aria-describedby='emailHelp' placeholder='Enter email' />
					</div>

					<div className='form-group mb-3'>
						<label htmlFor='password'>Password</label>
						<input required onChange={handleInputChange} type='password' className='form-control' id='password' name='password' placeholder='Password' />
					</div>

					<button type='submit' className='btn btn-primary'>Log In</button>
          {/* <button className='btn btn-secondary'>Signup</button> */}
				</form>
			</main>
		</div>
	);
}

export default Login;