// import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import { ADD_NOTE } from '../utils/mutations';
import { QUERY_NOTES, QUERY_GROUP } from '../utils/queries';


const Notes = () => {
  // const [addNote, { error }] = useMutation(ADD_NOTE);
  const { loading, data } = useQuery(QUERY_NOTES);
  const { id: groupId } = useParams();
  // const { noteLoading, noteData } = useQuery(QUERY_NOTE);
  const { loading: groupLoading, data: groupData } = useQuery(QUERY_GROUP, {
    variables: { _id: groupId }
  })

  const dbRes = data?.note || {};
  const group = groupData?.group || [];
  // const dbNoteRes = noteData?.note || {};
  
  if (loading || groupLoading) {
    return <div>Loading...</div>;
  };

  // const handleAddNote = async event => {
  //   event.preventDefault();

  //   // await addNote({

  //   // })
  //   window.location.reload();
  // }

  return (
    <>
      <div className='container'>
        <main className='row'>
          <h2>Your Notes</h2>
          <div className='row'>
          <pre>{JSON.stringify(dbRes, null, 2)}</pre>
            <div className='col-md-3 my-2'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    <Link to={`/group/${group._id}/notes/addNote`}>
                      Add Note
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            {/* {dbRes && dbRes.map(group => {
              return (
                <div className='col-md-3 my-2'>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>
                        {note.name}
                      </h5>
                    </div>
                  </div>
                </div>
              )
            })} */}
          </div>
        </main>
      </div>
    </>
  )
}

export default Notes;