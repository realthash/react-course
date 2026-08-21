import UserProfileImage from '../assets/user.png'
import RobotProfileImage from '../assets/robot.png'
import './ChatMessage.css'


export function ChatMessage({ message, sender }) {
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