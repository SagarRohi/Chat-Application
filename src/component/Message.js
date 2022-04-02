import style from '../CSS/Chat.module.css';
const Message=({user,room,message})=>{
     const sender=message.user;
     const text=message.text;
    return <>
      {sender===user?(
        <div className={`${style.message_container} ${style.justify_right}`}>
            <p>You</p>
            <div className={style.inner_container}>
                <p className={style.message}>{text}</p>
            </div>
        </div>
      ):(
        <div className={`${style.message_container} ${style.justify_left}`}>
            <p>{sender}</p>
            <div className={style.inner_container}>
                <p className={style.message}>{text}</p>
            </div>
        </div>
      )}
    </>
}
export default Message;