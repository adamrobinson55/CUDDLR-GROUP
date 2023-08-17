import { useEffect, useState } from 'react'
//import io from "socket.io-client"
//const socket = io.connect("http://localhost:3001")

export default function Chat({ socket, username, room }) {
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (message !== "") {
            const payload = {
                room: room,
                writer: username,
                message: message,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }

            // console.log(payload)
            await socket.emit('message', payload)
            // console.log(messageList)
            setMessageList((list) => [...list, payload])
            // console.log(messageList)
            setMessage("")
        }
    }

    useEffect(() => {
        socket.on("recieve_message", (message) => {
            setMessageList((list) => [...list, message])
        })
    }, [socket])

    return (
        <>
            <div className="border border-blue-500 rounded-lg p-4 w-96">
                {messageList.map((content, index) => {
                    return <h1 key={index}>{content.message}</h1>;
                })}
                <input
                    className="w-full border border-blue-500 rounded px-2 py-1"
                    placeholder="message"
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        event.key === 'Enter' && sendMessage();
                    }}
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                    &#10559;
                </button>
            </div>

            <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>
            <script src="/chat.js"></script>
        </>
    )
}