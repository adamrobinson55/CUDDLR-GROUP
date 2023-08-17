import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import io from "socket.io-client";
// import Chat from './pages/Chat';
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import NewLobbyForm from "./components/NewLobbyForm";
import Chat from "./pages/Chat";
//import { User } from '../../server/models';
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

const socket = io.connect("http://localhost:3001");


const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function formatName(user) {
  return user.userName
};

const user = {
  userName: 'Harry',
};

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
        {!showChat ? (
          <div>
            <div className="bg-blue-500 text-white p-4">
              <h1 className="text-2xl font-semibold">Welcome to Hydruh</h1>
              <p className="mt-1 text-sm">
                It'd be cool to generage unique lines here :^D
              </p>
            </div>
            <div className="w-screen">
              <NotFound />
              <input
                type="text"
                placeholder="John..."
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <button onClick={joinRoom}>Join A Room</button>
            </div>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </Router>
    </ApolloProvider>
  );
}
