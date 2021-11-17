import React from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_GROUPS } from '../utils/queries';
import { JOIN_GROUP } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {

  const user = Auth.getProfile();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: user.data._id },
  });

  const dbRes = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <main className='row'>

        <pre>{JSON.stringify(dbRes, null, 2)}</pre>
        
        <h2>Your groups</h2>
        {dbRes && dbRes.groups.map(group => {
          return <p>{group.name} <button className="btn btn-success">JOIN</button></p>
        })}

        {/* make one for all groups, add button for joining */}
      </main>
    </div>

    // <div>
    //   <div className="flex-row mb-3">
    //     <h2 className="bg-dark text-secondary p-3 display-inline-block">
    //       {/* Viewing <usernames>'s profile. */}
    //     </h2>
    //   </div>

    //   <div className="flex-row justify-space-between mb-3">
    //     <div className="col-12 mb-3 col-lg-8">{/* PRINT THOUGHT LIST  */}</div>

    //     <div className="col-12 col-lg-3 mb-3">{/* PRINT FRIEND LIST */}</div>
    //   </div>
    // </div>
  );


};

export default Profile;
