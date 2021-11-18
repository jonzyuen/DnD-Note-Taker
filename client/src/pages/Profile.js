import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_GROUPS } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const user = Auth.getProfile();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: user.data._id },
  });

  const { loading: groupsLoading, data: groupsData } = useQuery(QUERY_GROUPS);

  // const [joinGroup, { error }] = useMutation(JOIN_GROUP);

  const dbRes = data?.user || {};
  const dbGroupsRes = groupsData?.groups || {};

  // const handleOnClick = async event => {
  //   event.preventDefault();

  //   const groupId = event.target.getAttribute('data-group-id');

  //   await joinGroup({
  //     variables: {
  //       userId: user.data._id,
  //       groupId
  //     }
  //   });

  //   window.location.reload();
  // }

  if (loading || groupsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <main className='row'>
        <pre>{JSON.stringify(dbRes, null, 2)}</pre>

        <h2>Your Groups</h2>
        <div className="row">
          {dbRes && dbRes.groups.map(group => {
            return (
              <div className="col-md-3 my-2">
                <div className="card">
                  {/* <img className="card-img-top pt-3" src="http://placehold.it/600x400" alt="Card image cap" /> */}
                  <div className="card-body">
                    <h5 className="card-title"><Link to={`/group/${group._id}`} user={user}>{group.name}</Link></h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h2>All Groups</h2>
        <div className="row">
          {dbGroupsRes && dbGroupsRes.map(group => {
            return (
              <div className="col-md-3 my-2">
                <div className="card">
                  {/* <img className="card-img-top pt-3" src="http://placehold.it/600x400" alt="Card image cap" /> */}
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/group/${group._id}`}>
                        {group.name}
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Profile;
