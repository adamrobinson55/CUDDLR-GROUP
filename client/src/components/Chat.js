const socket = io('ws://localhost:3001')


//Super basic implementation of Socket io, just adds
socket.on('message', text => {
    const el = document.createElement('li')
    el.innerHTML = text
    document.querySelector('ul').appendChild(el)
})

document.querySelector('button').onclick = () => {
    const text = documument.querySelector('input').value
    socket.emit('message', text)
}