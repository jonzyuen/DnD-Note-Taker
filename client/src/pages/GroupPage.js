import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'

import Auth from '../utils/auth';

import { useQuery, useMutation } from '@apollo/client';

import { JOIN_GROUP, ADD_NOTE } from '../utils/mutations';
import { QUERY_USER, QUERY_GROUP } from '../utils/queries';

const GroupPage = () => {
  useEffect(async () => {
    const checkMembership = await users.some(u => u._id === user.data._id);
    setIsMember(checkMembership);
  });

  const [isMember, setIsMember] = useState(true);
  const { id: groupId } = useParams();

  const user = Auth.getProfile();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: user.data._id },
  });

  const { loading: usersLoading, data: usersData } = useQuery(QUERY_GROUP, {
    variables: { _id: groupId },
  });

  const users = usersData?.group.users || [];
  const group = usersData?.group || [];

  // console.log(group);

  const [joinGroup, { error }] = useMutation(JOIN_GROUP);

  const handleJoinGroup = async event => {
    event.preventDefault();

    const groupId = event.target.getAttribute('data-group-id');

    await joinGroup({
      variables: {
        userId: user.data._id,
        groupId
      }
    });

    window.location.reload();
  }

  const [title, setTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  const [addNote] = useMutation(ADD_NOTE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'noteText':
        setNoteText(value);
        break;
    }
    // console.log(value)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addNote({
        variables: { title, noteText, groupId }
      })
      // console.log(data)
    } catch (err) {
      console.error(err);
    }

    setTitle('');
    setNoteText('');

    window.location.reload();
  }

  if (loading || usersLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='container'>
      <main className='row'>
        <h1>Welcome to {group.name}'s Portal</h1>

        <h2>Group Members</h2>
        {users.map(user => {
          return (
            <li>{user.name}</li>
          );
        })}

        {!isMember && (
          <button data-group-id={groupId} onClick={handleJoinGroup} className='btn btn-success'>Join</button>
        )}

        {isMember && (
          <>
            <div className='col-md-6 my-2'>
              <h2>Notes</h2>
              <form onSubmit={handleFormSubmit} data-group-id={groupId}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input required onChange={handleInputChange} type="text" className="form-control" name='title' id="title" placeholder="Title" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="text">Note</label>
                  <textarea required onChange={handleInputChange} type='text' className="form-control" name='noteText' id="noteText" placeholder='Notes' rows="3"></textarea>
                </div>

                <button data-group-id={groupId} className='btn btn-primary'>Add Note</button>
              </form>
              {/* <div className='card'> */}

              {/* <Link to={`/group/${group._id}/notes`}> */}
              <div className='card-body'>
                <h5 className='card-title'>
                </h5>

                {group.notes.map(note => {
                  return (
                    <>
                      <div className='card'>
                        <div className='card-body'>
                          <h5>{note.title}</h5>
                          <p>{note.noteText}</p>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })}
                {/* </div> */}
                {/* </Link> */}
              </div>
            </div>

            {/* <div className='col-md-3 my-2'>
              <div className='card'>
                <Link to={``}>
                  <div className='card-body'>
                    <h5 className='card-title'>
                      Locations
                    </h5>
                  </div>
                </Link>
              </div>
            </div>

            <div className='col-md-3 my-2'>
              <div className='card'>
                <Link to={``}>
                  <div className='card-body'>
                    <h5 className='card-title'>
                      Npcs
                    </h5>
                  </div>
                </Link>
              </div>
            </div>

            <div className='col-md-3 my-2'>
              <div className='card'>
                <Link to={``}>
                  <div className='card-body'>
                    <h5 className='card-title'>
                      Pcs
                    </h5>
                  </div>
                </Link>
              </div>
            </div> */}
          </>
        )}
      </main>
    </div>
  )
}

export default GroupPage;