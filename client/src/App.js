import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// const Home = () => <span>Home</span>;
// const Login = () => <span>Login</span>;
// const Signup = () => <span>Signup</span>;
// const Joingroup = () => <span>Joingroup</span>;
// const Addnote = () => <span>Addnote</span>;
// const Addnpc = () => <span>Addnpc</span>;
// const Addlocation = () => 

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />

        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/logout" component={Logout} /> */}
        </Routes>

      </Router>
    </ApolloProvider>
  );
}

export default App;
