import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
// import Footer from './components/Footer';
import Login from './components/Login';
import AddUser from './components/AddUser';
import AddGroup from './components/AddGroup';
import Profile from './pages/Profile';
import AddNote from './components/AddNote';
import AddNpc from './components/AddNpc';
import NoMatch from './pages/NoMatch';

import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />

        <Routes>
          <Route exact path='/addUser' element={<AddUser />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/addGroup' element={<AddGroup />} />
          <Route exact path='/profile/:username?' element={<Profile />} />


          {/* these will become '.../:groupId/(element)' */}
          <Route path='/addNote' element={<AddNote />} />
          <Route path='/addNpc' element={<AddNpc />} />

          {/* <Route exact path='/logout' element={Logout} /> */}
          <Route path='*' element={<NoMatch />} />
        </Routes>


        {/* <Footer /> */}
      </Router>
    </ApolloProvider>
  );
};

export default App;
