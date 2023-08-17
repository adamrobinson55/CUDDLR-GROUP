import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { QUERY_SINGLE_USER } from '../utils/queries'
import { useQuery } from '@apollo/client'

export default function Chat ({ socket, username, room }) {
    const userId = ''
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const { loading, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { id: userId} //Might not be optimal not getting UserID
    })

    const sendMessage = async () => {
        if (message !=="") {
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
            <div>
                <div>
                    {messageList.map((content) => {
                        return (
                            <div>
                                <div>{content.message}</div>
                                <div>
                                    <p>{content.time}</p>
                                    <Link to={{ pathname: `/user/${content.writer.id}`}}>{content.writer}</Link>
                                </div>
                            </div>
                        )})}
                </div>
                <input
                className="w-max self-baseline" 
                placeholder="message"
                value={message}
                onChange={(event) => {
                    setMessage(event.target.value)
                }}
                onKeyDown={(event) => {event.key === "Enter" && sendMessage()}}/>
                <button onClick={sendMessage}> &#10559; </button>
            </div>

            <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>
            <script src="/chat.js"></script>
        </>
    )
}