import React from 'react';




function Chat () {
    return (
        <>
            <body>
                <ul>

                </ul>
                <input placeholder="message"/>
                <button> Send </button>
            </body>

            <script src="https://cdn.socket.io/socket.io-3.0.0.js"></script>
            <script defer src="/chat.js"></script>
        </>
    )
}