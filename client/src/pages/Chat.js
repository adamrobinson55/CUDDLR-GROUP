import { useEffect, useState } from 'react'
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")

export default function Chat ({ socket, username, room }) {
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const [messageReceived, setMessageReceived] = useState("")
    const sendMessage = async () => {
        if (message !=="") {
            const payload = {
                room: room,
                writer: username,
                message: message,
                time: new Date(Date.now).getHours() + ':' + new Date(Date.now).getMinutes()
            }

            await socket.emit('message', payload)
        }
    }

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setMessageList((list) => [...list, data])
            setMessageReceived(data.message)
        })
    }, [socket])

    return (
        <>
            <div>
                {messageList.map((content) => {
                    return <h1>{content.message}</h1>
                })}
                <input className="w-max self-baseline" placeholder="message" onChange={(event) => {
                    setMessage(event.target.value)
                }}/>
                <button onClick={sendMessage}> &#10559; </button>
            </div>

            <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>
            <script src="/chat.js"></script>
        </>
    )
}