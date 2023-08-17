import React, { useState } from "react";

function Chat({ socket, username, room}) {
    const [newestMess, setNewestMess] = useState("")

    const send = () => {
        
    }

    return (
        <div>
            <div className="chat-head"></div>
            <div className="chat-sideBar"></div>
            <div className="chat-body"></div>
            <div className="chat-foot">
                <input type="text" onChange={(event) => {setNewestMess(event.target.value)}}></input>
                <button>&#10147;</button>
            </div>
        </div>
    )
}


export default Chat