import { useState, useEffect, useRef } from 'react'
import { chatbot } from 'supersimpledev'
import './App.css'
import RobotProfileImage from './robot.png'
import UserProfileImage from './user.png'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function saveInputText(event) {
    setInputText(event.target.value)
  }

  async function sendMessage() {
    if (!inputText.trim() || isLoading) {
      return
    }

    setIsLoading(true)
    setInputText('')
    const loadingId = crypto.randomUUID()
    const newMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }, {
        message: 'Loading...',
        sender: 'robot',
        id: loadingId
      }
    ]
    setChatMessages(newMessages)

    const response = await chatbot.getResponseAsync(inputText)

    setChatMessages(
      (prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingId ? { ...msg, message: response } : msg
        )
    )
    // setChatMessages([
    //     ...newMessages,
    //     {
    //         message: response,
    //         sender: 'robot',
    //         id: crypto.randomUUID()
    //     }
    // ])
    setIsLoading(false)


  }

  function sendMessageOnKey(event) {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }
  return (
    <div className="input-container">
      <input
        placeholder="send a message to the chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={sendMessageOnKey}
        value={inputText}
        className="input-box"
      ></input>
      <button
        onClick={sendMessage}
        disabled={isLoading || inputText.trim() === ''}
        className="send-button"
      >{isLoading ? 'Sending...' : 'Send'}
      </button>

    </div>
  )
}

function ChatMessage({ message, sender }) {
  return (
    <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
      {sender === 'robot' && (<>
        <img src={RobotProfileImage} className="profileImage" alt="Robot" />
      </>)}
      <div className='display-message'>
        {message}
      </div>

      {sender === 'user' && (<>
        <img src={UserProfileImage} className="profileImage" alt="User" />
      </>)}
    </div>
  )
}

function ChatMessages({ chatMessages }) {
  const chatMessageRef = useRef(null)
  useEffect(() => {
    console.log('updated')
    const containerElem = chatMessageRef.current
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight
    }
  }, [chatMessages])

  return (
    <div className="chat-container"
      ref={chatMessageRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            key={chatMessage.id}
            sender={chatMessage.sender}
            message={chatMessage.message}
          />
        )
      })}
    </div>
  )
}

function App() {
  const [chatMessages, setChatMessages] = useState([{
    message: 'Welcome to the chatbot',
    sender: 'robot',
    id: 'sadfadfafdadfa'
  }])

  return (
    <div className="app-container">

      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages} />
    </div>
  )
}

export default App;