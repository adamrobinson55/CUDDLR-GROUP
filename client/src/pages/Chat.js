<<<<<<< HEAD
import React from 'react';




function Chat () {
=======
import { useEffect, useState } from 'react'
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")

export default function Chat () {
    const [message, setMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState("")
    const sendMessage = () => {
        socket.emit('send_message', {message: 'hello'})
    }

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setMessageReceived(data.message)
        })
    }, [socket])

>>>>>>> d2df4edc0bca73f0bdd84b1bde02054f15017720
    return (
        <>
            <div>
                {messageReceived}
                <input className="w-max self-baseline" placeholder="message" onChange={(event) => {
                    setMessage(event.target.value)
                }}/>
                <button onClick={sendMessage}> Send </button>
            </div>

            <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>
            <script src="/chat.js"></script>
        </>
    )
}