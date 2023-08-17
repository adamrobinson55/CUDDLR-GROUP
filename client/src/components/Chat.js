import React, { useState } from "react";

function Chat({ socket, username, room}) {
    const [newestMess, setNewestMess] = useState("")

    const send = () => {
        
    }

    return (
        <div className="border border-blue-500 rounded-lg w-96">
          <div className="chat-head bg-blue-500 h-12"></div>
          <div className="chat-sideBar bg-blue-500 h-64"></div>
          <div className="chat-body bg-blue-500 h-96"></div>
          <div className="chat-foot bg-blue-500 flex items-center p-2">
            <input
              type="text"
              onChange={(event) => { setNewestMess(event.target.value) }}
              className="border border-blue-500 rounded px-2 py-1 flex-grow"
            />
            <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">&#10147;</button>
          </div>
        </div>
    )
}


export default Chat