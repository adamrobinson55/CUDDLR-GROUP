import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import Chat from './pages/Chat';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import NewLobbyForm from './components/NewLobbyForm';
import Chat from './pages/Chat';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

export default function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-semibold">Welcome to Hydruh</h1>
          <p className="mt-1 text-sm">It'd be cool to generage unique lines here :^D</p>
        </div>
        <div className="w-screen">
          <NotFound />
        </div>
      </Router>
    </ApolloProvider>
  );
}

