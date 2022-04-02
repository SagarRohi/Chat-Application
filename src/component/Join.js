import {useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import  style from '../CSS/Join.module.css';
const Join=()=>{
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const location=useLocation();
    return <div className={style.wrapper}>
        <div className={style.container}>
         <p className={style.webname}>DOMINO</p>
         <input type='text'  placeholder="Username" onChange={(e)=>setName(e.target.value)} className={style.input} />
         <p className={style.error}>{location.state?.error}</p>
         <input type='text' placeholder="Room" onChange={(e)=>setRoom(e.target.value)} className={style.input}/>
         <Link onClick={(e)=>name&&room?null:e.preventDefault()} to={`/chat?name=${name}&room=${room}`} style={{width:'100%'}}>
             <button className={style.btn}>JOIN</button>
         </Link>
    </div>
    </div>
}

export default Join;