import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_NOTE } from '../../utils/mutations';

function AddNote() {
  const [title, setTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  const [addNote, { error }] = useMutation(ADD_NOTE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // setUserFormData({ ...userFormData, [name]: value });
    switch(name) {
      case 'title':
        setTitle(value);
        break;
      case 'noteText':
        setNoteText(value);
        break;
    }
    console.log(value)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNote({
        variables: { title, noteText },
      });
      console.log(data);
      // Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setTitle('');
    setNoteText('');
  };

  return (
    <div className='container'>
      <main className='row'>
        <form onSubmit={handleFormSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input required onChange={handleInputChange} type='text' className='form-control' id='title' placeholder='Title' />
          </div>
          
          <div className='form-group mb-3'>
            <label htmlFor='text'>Note</label>
            <textarea required onChange={handleInputChange} type='text' className='form-control' id='noteText' placeholder='Notes' rows='3'></textarea>
          </div>

          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </main>
    </div>
  );
}

export default AddNote;