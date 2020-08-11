import React from 'react';


const Message = (props) =>{
    let isCurrentUser = false;

    let un = props.username.trim().toLowerCase();

    if(props.message.user === un){
        isCurrentUser = true;
    }

    return(
        <div className="main-message-container">
             {isCurrentUser ? 
                (
                <div className="message-container flex-end">
                    <p className="sent-message">{un}</p>
                    <div className="message blue-bg">
                        <p className="message-text white">
                            {props.message.text}
                        </p>
                    </div>
                </div>
                ) : (
                    <div className="message-container flex-start">
                        <div className="message grey-bg">
                            <p className="message-text white">
                                {props.message.text}
                            </p>
                        </div>
                        <p className="sent-message ml">{props.message.user}</p>
                    </div>
                )}
        </div>
    )
}

export default Message;