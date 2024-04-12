import { useEffect, useState } from 'react'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [latestMessage, setLatestMessage] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const socket = new WebSocket('ws:localhost:8080')
    socket.onopen = () => {
      console.log('Connected')
      setSocket(socket)
    }
    socket.onmessage = (message) => {
      console.log('Recieved message : ', message.data)
      setLatestMessage(message.data)
    }
    setSocket(socket)
  }, [])

  if (!socket) {
    return (
      <>
        Connecting to socket server ...
      </>
    )
  }
  return (
    <>
      <input
      onChange={(e) => {
        setMessage(e.target.value)
      }}
      >
      
      </input>
      <button
      onClick={() => {
        socket.send(message)
      }}
      >
        Send
      </button>
      {latestMessage}
    </>
  )
}

export default App
