import React from 'react';
import {Message} from './';

const Messages = (props) =>{
    console.log(props);
    return (
        <div className="messages-container">
            {
                props.messages.map((message,i)=>(
                    <div key={i}>
                        <Message message={message} username = {props.username} />
                    </div>
                ))
            }
        </div>
    )
}

export default Messages;