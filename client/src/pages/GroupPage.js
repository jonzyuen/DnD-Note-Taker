import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Auth from '../utils/auth';

import { useQuery, useMutation } from '@apollo/client';

import { JOIN_GROUP } from '../utils/mutations';
import { QUERY_USER, QUERY_GROUP } from '../utils/queries';

// import { ADD_NOTE, ADD_LOCATION, ADD_PC, ADD_NPC } from '../../utils/mutations';
// import {  } from '../utils/queries';

const GroupPage = () => {
	useEffect(async () => {
		const checkMembership = await users.some(u => u._id === user.data._id);
		setIsMember(checkMembership);
	});

	const [ isMember, setIsMember ] = useState(true);
	const { id: groupId } = useParams();

	const user = Auth.getProfile();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: user.data._id },
  });

	const { loading: usersLoading, data: usersData } = useQuery(QUERY_GROUP, {
		variables: { _id: groupId },
	});

	const dbRes = data?.user || {};
	const users = usersData?.group.users || [];
	const group = usersData?.group || [];

  // const {} = useQuery()
  // const [addNote, { error }] = useMutation(ADD_NOTE);
  
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

	if (loading || usersLoading) {
		return <div>Loading...</div>
	}

  return (
    <div className='container'>
      <main className='row'>
			<h1>Welcome to {group.name}'s Portal</h1>
        {/* add note */}
        {/* view notes */}

				<h2>Group Members</h2>
				{users.map(user => {
					return (
						<li>{user.name}</li>
					);
				})}

        {/* use opposite logic (without !) to show notes, etc when they are members */}
				{!isMember && (<button data-group-id={groupId} onClick={handleJoinGroup} className='btn btn-success'>Join</button>)}
      </main>
    </div>
  )
}

export default GroupPage;