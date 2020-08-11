import React,{useState} from 'react';
import { Link } from 'react-router-dom';

const Join = ()=>{
    const [username, setUserName] = useState('');
    const [chatroom, setChatRoom] = useState('');

    return (
        <div className="j-container">
            <div className="join-container">
                <h1 className="header">SocioX CHAT APP</h1>
                <div>
                    <input type="text" placeholder="Username" className="joinInput" onChange={(e)=>setUserName(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="ChatRoom" className="joinInput" onChange={(e)=>setChatRoom(e.target.value)} />
                </div>

                {/* Now we're not sending props to chat, just simply sending the variables using router */}
                <Link onClick={(e)=>(!username || !chatroom)? e.preventDefault() : null} to={`/chatting?username=${username}&chatroom=${chatroom}`}>
                    <button className="join-btn" type="submit">Click To Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;