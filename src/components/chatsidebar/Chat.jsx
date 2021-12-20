import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Chat.css'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase/compat';
import { useStateValue } from '../context/StateProvider';

function Chat() {
    //  destructuring roomId ----->
    const { roomId } = useParams();
    // console.log(roomId);
    const [avatar, setAvatar] = useState("");
    const [roomName, setRoomName] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    
    useEffect(() => {
        //console.log(Math.floor (Math.random() *5000))
        setAvatar(Math.floor (Math.random() *5000))
    },[])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });
            db.collection('rooms').doc(roomId).collection("message").orderBy("timestamp", "asc").onSnapshot(snapshot => {
                //    console.log(snapshot.docs)
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [roomId])
   // console.log(messages)

    const sendMessage = (e) => {
        e.preventDefault();
        //    alert(input)
        if (input === "") {
            return alert("Please Enter your Message")
        }
        // alert("Message found");
        db.collection('rooms').doc(roomId).collection("message").add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
    }

    return (
        <div className='chat'>

            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/miniavs/human/${avatar}.svg`}/>

                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>
                        {
                            new Date(messages[messages.length-1]?.timestamp?.seconds*1000).toLocaleTimeString()
                        }
                    </p>
                </div>

                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            {/* -------> section of chatting body <-------- */}
            <div className='chat__body'>
                {
                    messages.map(message => (

                        <p className={`chat__message ${user.displayName==message.name && "chat__receiver" }`}>

                            <span className='chat__name'>
                                {message.name}
                            </span>
                            {message.message}
                            <span className='chat__time'>
                                {
                                    new Date(message.timestamp?.seconds*1000).toLocaleTimeString()
                                }
                            </span>
                        </p>
                    ))
                }

            
            </div>

            {/* --------> Chat Footer Div <--------- */}

            <div className='chat__footer'>
                <EmojiEmotionsIcon />
                <AttachFileIcon />
                <form onSubmit={sendMessage}>
                    <input type="text" value={input} placeholder='Type your message' onChange={e => setInput(e.target.value)} />
                    <input type="submit" />
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat
