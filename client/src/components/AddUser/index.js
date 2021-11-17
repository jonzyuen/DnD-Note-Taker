import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

function AddUser() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [addUser, { error }] = useMutation(ADD_USER);

	const handleInputChange = event => {
		const { name, value } = event.target;

		console.log(name, value);

		switch (name) {
			case 'name':
				setName(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
		}
	}

	const handleFormSubmit = async event => {
		event.preventDefault();

		try {
			const { data } = await addUser({
				variables: { name, email, password },
			});
			console.log(data);
			Auth.login(data.addUser.token);
		} catch (err) {
			console.error(err);
		}

		setName('');
		setEmail('');
		setPassword('');
	};

	return (
		<div className="container">
			<main className="row">
				<form onSubmit={handleFormSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input required onChange={handleInputChange} type="text" className="form-control" id="name" name="name" placeholder="Enter name" />
					</div>

					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input required onChange={handleInputChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
					</div>

					<div className="form-group mb-3">
						<label htmlFor="password">Password</label>
						<input required onChange={handleInputChange} type="password" className="form-control" id="password" name="password" placeholder="Password" />
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</main>
		</div>

	);
}

export default AddUser;