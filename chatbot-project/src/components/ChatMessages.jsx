import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import './ChatMessages.css'


export function ChatMessages({ chatMessages }) {
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

export default ChatMessages