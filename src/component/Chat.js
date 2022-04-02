import io from 'socket.io-client';
import queryString from 'query-string';
import { useLocation,useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import style from '../CSS/Chat.module.css';
import Message from './Message';
import messageTone from './notification.mp3';
var socket;
const Chat=()=>{
    const ENDPOINT='https://chat-applicationserver.herokuapp.com';
    const location=useLocation();
    const navigate=useNavigate();
    const [messages,setMessages]=useState([]);
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [onlineUsers,setOnlineUsers]=useState([]);
    useEffect(()=>{

        socket=io(ENDPOINT);

        const {name,room}=queryString.parse(location.search);

        setName(name);
        setRoom(room);

        socket.emit('join',{name,room},(error)=>{
            navigate('/',{state:{error}});
        });

        socket.on('message',(message)=>{
              const audio=new Audio(messageTone);
              audio.play();
              setMessages(messages=>[...messages,message]);
            //   setPlay(true);
        })
        socket.on('roomData',(users)=>{
            setOnlineUsers(users);
        })
        return ()=>{
            socket.emit('back');
            socket.off();
        }

    },[ENDPOINT,location.search]);

    const sendMessage=()=>{
        if(message.length===0) return;
        socket.emit('sendMessage',{message,name,room});
        setMessage('');
    }
    return   <div className={style.wrapper}>
        <div className={style.innerWrapper}>
        <div className={style.container}>
           <div className={style.info_bar}>
               <p className={style.webname}>Domino</p>
               <p className={style.room_name}>{room}</p>
           </div>
           <ScrollToBottom className={style.scroll_messages}>
           <div className={style.messagesContainer}>
               {messages.map((message,id)=>{
                   return <Message room={room} user={name} message={message} key={id}/>
               })}
           </div>
            </ScrollToBottom>
           <div className={style.input_container}>
              <input type='text' placeholder='Type your message...' value={message} className={style.input} 
              onKeyPress={ (e)=>{if(e.key==='Enter') sendMessage()}} onChange={(e)=>{
                  setMessage(e.target.value);
              }}/>
              <button className={style.btn} onClick={()=>{
                  sendMessage();
                  setMessage('')
              }}>SEND</button>
           </div>
        </div>
    <div className={style.onlineUsers} >
      <p className={style.title}>Online Users</p>
      <ul className={style.users_container}>
        {onlineUsers.map((user)=><li>{user.name}</li>)}
      </ul>
    </div>
    </div>
    </div>
}

export default Chat;
