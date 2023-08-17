import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import io from "socket.io-client";
// import Chat from './pages/Chat';
import Chat from './pages/Chat';
import NavBar from './components/NavBar'
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import NewLobbyForm from "./components/NewLobbyForm";
import AuthService from './utils/auth'
//import { User } from '../../server/models';
import Home from "./pages/Home";

const socket = io.connect("http://localhost:3001", {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false
});

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <div className="flex flex-col justify-center items-center bg-blue-500">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<ProfilePage />} />
            <Route path="/lobby/:id" element={<Chat />} />
          </Routes>
        </div>
        <NewLobbyForm/>
      </Router>
    </ApolloProvider>
  );
}
