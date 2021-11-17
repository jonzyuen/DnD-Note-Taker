import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_NOTE } from '../../utils/mutations';

function AddNote() {
  const [userFormData, setUserFormData] = useState({
    title: '',
    noteText: '',
  });

  const [addNote] = useMutation(ADD_NOTE);

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
      const { data } = await addNote({
        variables: { ...userFormData },
      });
      console.log(data);
      // Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      title: '',
      noteText: '',
    });
  };

  return (
    <main>
      <h1>Add Note</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div className='form'>
            <input type='text'
              name='title'
              id='title'
              placeholder='Title'
              onChange={handleInputChange}
              value={userFormData.title}
              required
            />
          </div>
        </div>

        <div>
          <div className='form'>
            <textarea type='text'
              name='noteText'
              id='noteText'
              placeholder='Notes'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
          </div>
        </div>

        <button>
          Submit!
        </button>
      </form>
    </main>
  );
}

export default AddNote;