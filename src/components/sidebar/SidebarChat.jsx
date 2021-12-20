import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from '../../firebase';
import "./Sidebar.css"

function SidebarChat({ id, name, addNewChat }) {

const [avatar, setAvatar] = useState("");
const [lastmessage, setLastMessage] = useState("");

useEffect(() => {
    //console.log(Math.floor (Math.random() *5000))
    setAvatar(Math.floor (Math.random() *5000))

    db.collection('rooms').doc(id).collection("message").orderBy("timestamp","desc").onSnapshot(snapshot => setLastMessage(snapshot.docs.map(doc => doc.data())) )
},[])

// console.log(lastmessage);

const createChat = () => {
    const roomName = prompt("Please enter name for Chat room");
    // alert (room)
    if (roomName) 
       {
            db.collection('rooms').add({
                 name:roomName
        })
    }
}

    return (
        
        !addNewChat ? (
            <Link to = {`/room/${id}`}>
            <div className="sidebar__chat">
                <Avatar src={`https://avatars.dicebear.com/api/miniavs/human/${avatar}.svg`}/>
                <div className="sidebar__chatInfo">
                    <h2>{name}</h2>
                    <p>{lastmessage[0]?.message}</p>
                </div>

            </div>
        </Link>

        ) : (
            <div className="sidebar__chat" onClick={createChat}>
                <h2>Add New Chat</h2>
            </div>

        )

    )
}

export default SidebarChat
