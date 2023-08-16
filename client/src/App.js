import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client';
import ProfileIcon from './components/ProfileIcon';
// import Chat from './pages/Chat';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import NewLobbyForm from './components/NewLobbyForm';
import Chat from './pages/Chat';
import { FaFontAwesome } from 'react-icons/fa';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function formatName(user) {
  return user.userName
};

const user = {
  userName: 'Harry',
};

export default function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="bg-blue-500 text-white p-4 justify-between">
          <header>
            <h1 className="text-2xl font-semibold">Welcome to Hydruh</h1>
            <p className="mt-1 text-sm">It'd be cool to generate unique lines here :^D</p>
            <nav>
              {/* login/sign-up */}
              <a href="loginSignUp">
                <button>
                  <h4>Login/Sign Up</h4>
                </button>
              </a>
              {/* <a href="profileIcon">
                <h2 className='profileIcon'>
                  <p className='text-white textDecoration-none'>Welcome, {formatName(user)}!</p>
                  <ProfileIcon icon="fa-regular fa-user" className='stroke-white' />
                </h2>
              </a> */}
            </nav>
          </header>
        </div>
        <div className="w-screen">
          <NotFound />
        </div>
      </Router>
    </ApolloProvider>
  );
}

