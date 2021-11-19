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
import GroupPage from './pages/GroupPage';
import Notes from './pages/Notes';
import Home from './pages/Home';

import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />

        <Routes>
        <Route exact path='/' element={<Home />} />
          <Route exact path='/addUser' element={<AddUser />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/addGroup' element={<AddGroup />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/group/:id' element={<GroupPage />} />
          <Route exact path='/group/:id/notes' element={<Notes />} />

          {/* these will become '.../:groupId/(element)' */}
          {/* <Route exact path='/group/:id/notes/addNote' element={<AddNote />} /> */}
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
