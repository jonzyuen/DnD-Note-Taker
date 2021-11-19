import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_GROUP } from '../../utils/mutations';

// import Auth from '../../utils/auth';

function AddGroup() {
  const [name, setName] = useState('');

  const [addGroup, { error }] = useMutation(ADD_GROUP);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value);

    switch(name) {
      case 'name':
        setName(value);
        break;
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addGroup({
        variables: { name },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setName('');
    window.location.reload();
  };

	return (
		<div className='container'>
			<main className='row'>
				<form onSubmit={handleFormSubmit}>
					<div className='form-group'>
						<label htmlFor='form'>Group Name</label>
						<input required onChange={handleInputChange} type='text' className='form-control' id='name' name='name' placeholder='Enter name' />
					</div>
					<button type='submit' className='btn btn-primary'>Submit</button>
				</form>
			</main>
		</div>
	);
}

export default AddGroup;