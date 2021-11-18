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
    <div className='container'>
      <main className='row'>
        <form onSubmit={handleFormSubmit}>
          <div class="form-group">
            <label htmlFor="title" class="form-label">Title</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>



        {/* <h1>Add Note</h1>
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
      </form> */}
      </main>
    </div>
  );
}

export default AddNote;