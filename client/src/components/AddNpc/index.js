import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_NPC } from '../../utils/mutations';

function AddNpc() {
  const [userFormData, setUserFormData] = useState({
    name: '',
    npcDescription: ''
  });

  const [addNpc] = useMutation(ADD_NPC);

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
      const { data } = await addNpc({
        variables: { ...userFormData },
      });
      console.log(data);
      // Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      name: '',
      description: '',
    });
  };

  return (
    <main>
      <h1>Add Npc</h1>
      <form onSubmit={handleFormSubmit}>

        <div>
          <div className='form'>
            <input type='text'
              name='name'
              id='title'
              placeholder='Npc Name'
              onChange={handleInputChange}
              value={userFormData.name}
              required
            />
          </div>
        </div>

        <div>
          <div className='form'>
            <textarea type='text'
              name='npcDescription'
              id='npcDescription'
              placeholder='Description'
              onChange={handleInputChange}
              value={userFormData.npcDescription}
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

export default AddNpc;