import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Chat from './pages/Chat'
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Chat />
//     </ApolloProvider>
//   );
// }


function App() {
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif"
  };
  return (
    <>
    <header>
        <h1 style={{myStyle}} className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <p>This is our chat</p>
      </header>
      <div class="dropdown">
        <button onClick="myFunction()" class="dropbtn">Dropdown</button>
        <div id="myDropdown" class="dropdown-content">
          <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">

          </input>
        </div>
      </div>
      <style>

      </style>
    </>
  )
}

export default App;
