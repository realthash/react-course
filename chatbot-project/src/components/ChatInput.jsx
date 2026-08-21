import { useState } from 'react'
import { chatbot } from 'supersimpledev'
import './ChatInput.css'


export function ChatInput({ chatMessages, setChatMessages }) {
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