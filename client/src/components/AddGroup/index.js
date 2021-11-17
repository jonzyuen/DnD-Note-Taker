import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_GROUP } from '../../utils/mutations';

// import Auth from '../../utils/auth';

function AddGroup() {
  const [userFormData, setUserFormData] = useState({
    name: '',
  });

  const [addGroup] = useMutation(ADD_GROUP);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addGroup({
        variables: { ...userFormData },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      name: '',
    });
  };

  return (
    <main>
      <h1>Add Group</h1>
      <form noValidate onSubmit={handleFormSubmit}>

        <div>
          <div className='form'>
            <label>Enter a Group Name: </label>
            <input type='text'
              name='name'
              placeholder='Group Name'
              onChange={handleInputChange}
              value={userFormData.name}
              required
            />
          </div>
        </div>

        <button 
          type='submit'
        >
          Add Group!
        </button>
      </form>
    </main>
  )
}

export default AddGroup;