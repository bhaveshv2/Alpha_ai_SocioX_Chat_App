import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';         //library for getting the params from url
import {Messages} from './';

let socket;

const Chat = ({location})=>{
    const [username, setUserName] = useState('');
    const [chatroom, setChatRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const server = 'localhost:8000';

    //useEffect for initial render
    useEffect(()=>{
        const data = queryString.parse(location.search);
        console.log(data.username,data.chatroom)

        socket = io.connect(server);
        
        setChatRoom(data.chatroom);
        setUserName(data.username);
        
        socket.emit('join',{ 
            username:data.username, 
            chatroom:data.chatroom 
        },(err)=>{
            alert(err);
        });

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[server,location.search]);       //we are using array here because of re-render happening 2 times, so whenever the server and params change only that time will rerender for the user

    //useEffect for handling the messages
    useEffect(()=>{
        socket.on('message',message=>{
            setMessages(messages => [ ...messages,message ]);
        })
    },[])

    //send message function
    const sendMessage=(e)=>{
        e.preventDefault();

        if(message){
            socket.emit('sendMessage', message, ()=>setMessage(''));
        }
    }

    return (
        <div className="c-container">
            <div className="chat-container">
                <div className="navigation-bar">
                    <div className="left-navigation">
                        <img src="https://image.flaticon.com/icons/svg/1783/1783356.svg" alt="online-logo"/>
                        <h4>{chatroom}</h4>
                    </div>
                    <div className="right-navigation">
                        <a href="/">X</a>
                    </div>
                </div>
                <Messages messages={messages} username={username} />
                <div className="input-container">
                    <input className="input-message" type="text" placeholder="Type your message..." value={message} onChange={e=>setMessage(e.target.value)} onKeyPress={e=>e.key==='Enter'?sendMessage(e):null} />
                    <button className="send-btn" onClick={e=>sendMessage(e)}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat;