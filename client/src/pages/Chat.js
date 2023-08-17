import { useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client"
import AuthService from '../utils/auth';
import { Link, useParams } from "react-router-dom"
import { QUERY_SINGLE_USER } from '../utils/queries'
import { useQuery } from '@apollo/client'

const socket = io('http://localhost:3001')

export default function Chat () {
    const { id } = useParams()
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const [roomId, setRoomId] = useState(null)
    const user = AuthService.getProfile()
    console.log(user)

    const sendMessage = async () => {
        if (message !== "") {
            const payload = {
                room: id,
                writer: user.data.username,
                writerId: user.data._id,
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

        socket.on('room_joined', (room) => {
            setRoomId(room)
        })

        return () => {
            socket.off('recieve_message')
            socket.off('room_joined')
        }
    }, [])

    return (
        <>
            <div className='flex justify-center grid grid-rows-2'>
                <div>
                    {messageList.map((content) => {
                        return (
                            <div>
                                <div>{content.message}</div>
                                <div className='grid grid-cols-2'>
                                    <p className='w-14'>{content.time}</p>
                                    <Link to={{ pathname: `/user/${content.writerId}`}}
                                    className='w-14 text-white'>{content.writer}</Link>
                                </div>
                            </div>
                        )})}
                </div>
                <div>
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
            </div>

            <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>
        </>
    )
}