import React from 'react';
import { useQuery } from '@apollo/client';

const Home = () => {
  const { loading, data } = useQuery(adf);
  const 

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
        {loading ? (
          <div>Loading...</div>
        ) : (

        )}
      </div>
    </main>
  )
}

export default Home;